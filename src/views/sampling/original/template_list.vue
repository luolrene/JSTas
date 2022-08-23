<template>
  <div class="operate-container" style="position: relative;">
    <el-tabs v-model="activeName" type="card">
      <!-- 记录模板-->
      <el-tab-pane label="记录模板" name="记录模板">
        <div style="margin-bottom: 10px;">
          <el-input
            placeholder="请输入记录名称进行搜索"
            v-model="fromValiData.fileName"
            class="input-with-select"
            @input="handleSearch('1')">
          </el-input>
        </div>
        <el-scrollbar class="page-component__scroll" :native="false" style="height: 424px;">
          <el-radio-group v-model="radioValue" style="display: flex;flex-direction: column;">
            <el-radio
              v-for="(item,index) in listData"
              :key="index"
              :label="item"
              style="margin-bottom: 10px;">{{item.fileName}}</el-radio>
          </el-radio-group>
        </el-scrollbar>
      </el-tab-pane>
      <!-- 历史记录 -->
      <el-tab-pane label="历史记录" name="历史记录" lazy>
        <el-input
          placeholder="请输入报告编号进行搜索查询"
          v-model="fromValiData.reportNo"
          class="input-with-select">
          <el-button
            @click="handleSearch('2')"
            slot="append"
            icon="el-icon-search"></el-button>
        </el-input>
        <el-scrollbar
          v-if="recordDataList.length > 0"
          class="page-component__scroll"
          :native="false"
          style="height: 430px;">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="isCheckAll"
            @change="handleCheckAllChange">全部选中</el-checkbox>
          <el-checkbox-group v-model="checkRecordList" size="small">
            <el-checkbox
              v-showTips
              @change="handleCheckedRecordChange"
              v-for="(item,index) in recordDataList"
              :key="index"
              :label="item.id"
              style="line-height: 26px;">{{item.reportNo}} <span style="margin: 0 2px;"></span> {{item.fileName}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
        <div v-else class="noData">
          暂无数据
          <loading :loading="loading"></loading>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-button
      @click="handleSubmit"
      :loading="btnLoading"
      type="primary"
      :size="$layer_Size.buttonSize"
      style="float: right;margin: 5px 10px 0 0;">添加</el-button>
  </div>
</template>

<script>
import {
  getOxcQueryList,
  getOriginalCyCopyOldFile
} from '@/api/sampling/original.js'
export default {
  props: {
    layerid: '',
    templateList: Array,
    reportNo: String
  },
  data() {
    return {
      btnLoading: false,
      loading: false,
      activeName: '记录模板',
      radioValue: {},

      fromValiData: {
        type: '1',
        father: '0',
        reportNo: ''
      },
      listData: [],
      recordDataList: [], // 搜索查询的历史原始记录数据
      recordIdList: [], // 搜索查询的历史原始记录id
      checkRecordList: [], // 选中的历史原始记录
      isIndeterminate: true, // 默认情况下checkbox的状态-为一根横线
      isCheckAll: false // true为全部被选中  false反之
    }
  },
  methods: {
    getReportNoData() {

    },
    handleSubmit() {
      if (this.activeName === '记录模板') {
        if (this.radioValue.id === undefined) {
          this.$share.message('请先勾选记录模板', 'warning')
          return
        }
        this.$parent.getRadioValue(this.radioValue)
        this.$layer.close(this.layerid)
      } else if (this.activeName === '历史记录') {
        if (this.checkRecordList.length === 0) {
          this.$share.message('请先勾选记录', 'warning')
          return
        }
        let ids = {}
        ids.ids = this.checkRecordList.join(',')
        ids.reportNo = this.reportNo
        this.btnLoading = true
        getOriginalCyCopyOldFile(ids).then(res => {
          this.$share.message('添加成功')
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.btnLoading = false
        })
      }
    },
    handleSearch(e) {
      if (e === '1') {
        this.listData = this.templateList.filter(data =>
          data.fileName.toLowerCase().includes(this.fromValiData.fileName.toLowerCase())
        )
      } else {
        if (this.fromValiData.reportNo === '') {
          this.$share.message('请输入报告编号', 'warning')
          return
        }
        this.checkRecordList = []
        this.recordIdList = []
        this.loading = true
        getOxcQueryList(this.fromValiData).then(res => {
          res.result.forEach(xdd => {
            this.recordIdList.push(xdd.id)
          })
          this.recordDataList = res.result
          this.loading = false
        })
      }
    },
    handleCheckAllChange(val) {
      // val为true表示当前为全选  this.recordIdList为所有的原始记录id
      this.checkRecordList = val ? this.recordIdList : []
      this.isIndeterminate = false
    },
    handleCheckedRecordChange(value) {
      let checkedCount = value.length
      this.isCheckAll = checkedCount === this.recordIdList.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.recordIdList.length
    }
  },
  mounted() {
    this.listData = this.templateList
  },
  created() {}
}
</script>

<style scoped lang="scss">
.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #999999;
}
</style>
