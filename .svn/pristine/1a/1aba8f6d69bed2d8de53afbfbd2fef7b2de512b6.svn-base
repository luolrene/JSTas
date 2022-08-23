<template>
 <div class="operate-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-transfer
          v-model="fromValiData.sampleValue"
          :props="transferProps"
          :data="transferData"
          @left-check-change="getLeftCheckChange"
          filterable
          :titles="['待提交样品', '当前选中样品']"
          filter-placeholder="请输入样品拼音"
          style="width: 100%;">
          <el-tooltip class="item" effect="light" :content="option.targetName" placement="top" slot-scope="{ option }">
            <span >{{ option.sampNo }}</span>
          </el-tooltip>
          <el-button
            @click="handleBatchDel()"
            :disabled="params.contStatus === '07'"
            type="danger"
            class="default-btn"
            slot="left-footer"
            :size="$layer_Size.buttonSize"
            style="float: right;margin:4px 4px 0 0;height: 32px;">删除</el-button>
          <el-button
            @click="handleAdd_sample"
            :disabled="params.contStatus === '07'"
            class="transfer-footer"
            type="primary"
            slot="left-footer"
            :size="$layer_Size.buttonSize"
            style="float: right;margin:4px 4px 0 0;height: 32px;">样品指控</el-button>
          <el-button
            @click="handleAdd_point"
            :disabled="params.contStatus === '07'"
            class="transfer-footer"
            type="primary"
            slot="left-footer"
            :size="$layer_Size.buttonSize"
            style="float: right;margin:4px 4px 0 0;height: 32px;">点位指控</el-button>
          <el-button
            v-if="fromValiData.tableStatus ==='0' || fromValiData.tableStatus==='3'"
            @click="onSubmit"
            :loading="buttonLoading"
            class="transfer-footer"
            type="success"
            slot="right-footer"
            :size="$layer_Size.buttonSize"
            style="float: right;margin:4px 4px 0 0">保存</el-button>
        </el-transfer>
        <loading :loading="loading"></loading>
      </el-col>
      <el-col :span="8">
        <!-- 标题 -->
        <el-card class="box-card" :body-style="{height:'450px',overflowY:'auto'}">
          <div slot="header" class="clearfix" style="display: flex;align-items: center;justify-content: space-between">
            <span>交样记录</span>
            <el-select
              v-model="fromValiData.tableStatus"
              @change="changeStatus"
              placeholder="请选择"
              style="width: 150px;">
              <el-option
                v-for="(item,index) in statusData"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button
              @click="doReset"
              size="mini"
              class="default-btn"
              type="primary"
              plain>重置</el-button>
          </div>
          <!-- 内容 -->
          <el-radio-group v-model="fromValiData.tableValue" style="display: flex;flex-direction: column;" v-if="tableData.length > 0">
            <el-radio
              style="margin-bottom: 6px;"
              v-for="(item,index) in tableData"
              :label="item.id"
              :key="index"
              @change="changeTableValue">
                <el-tooltip class="item" effect="dark" :content="item.returnReason" placement="top" v-if="item.status === '3'">
                  <span class="tableSpan">{{item.operName}}</span>
                </el-tooltip>
                <span class="tableSpan" v-else-if="item.status === '1'">{{item.operName}}<span style="margin-left: 10px;"></span>{{item.operDate}}</span>
                <span class="tableSpan" v-else-if="item.status === '2'">{{item.operName}}<span style="margin-left: 10px;"></span>{{item.finishDate}}</span>

                <span class="tableSpan" v-else>{{item.operName}}</span>
                <el-button
                  v-if="item.status !== '2'"
                  @click="handleDelete(item)"
                  type="danger"
                  size="mini"
                  plain
                  style="float: right;margin-left: 5px;margin-top: 1px;">
                  <span><i class="el-icon-delete"></i></span>
                </el-button>
                <el-button
                  v-if="item.status === '0' || item.status === '3'"
                  @click="handleRecord(item)"
                  type="primary"
                  size="mini"
                  plain
                  style="float: right;margin-left: 5px;margin-top: 1px;">记录填写</el-button>
                <el-button
                  v-if="(item.status === '0' || item.status === '3') && item.recordFlag === '1'"
                  @click="handleSubmit(item)"
                  type="primary"
                  size="mini"
                  plain
                  style="float: right;margin-left: 0;margin-top: 1px;">提交</el-button>
              </el-radio>
          </el-radio-group>
          <div v-else style="text-align: center;font-size: 14px;color: #999999">
            暂无数据
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getSamplingTaskQuerySampNoPageListByTaskId, getSamplingTaskDelSampNo} from '@/api/sampling/sampTask.js'
import recordList from './record_list.vue'
import {getSubSampAddOrModifyTask, getSubSampQueryTaskPage, getSubSampDelTask, getSubSampQuerySampPage} from '@/api/contract/task.js'
import controlAdd from './controlAdd'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      loading: false,
      buttonLoading: false,

      fixedTransferData: [],
      fromValiData: {
        id: null,
        sampleValue: [], // 当前选中的样品
        leftDefaultCheckedData: [], // 初始状态下左侧列表的已勾选项的 key 数组
        tableValue: '', // 选中的交样记录
        tableStatus: '0', // 交样记录状态 0草稿 1收样中 2收样完成 3退回
        tableType: '1' // 交样记录类型 1采样 2送样
      },
      transferData: [],
      transferProps: {
        label: 'sampNo',
        key: 'sampNo'
      },
      statusData: [
        {name: '草稿', id: '0'},
        {name: '收样中', id: '1'},
        {name: '收样完成', id: '2'},
        {name: '退回', id: '3'}
      ],

      tableData: []
    }
  },
  methods: {
    onSubmit() {
      if (this.fromValiData.sampleValue.length === 0) {
        this.$share.message('请选择样品', 'warning')
        return
      }
      let ids = {}
      ids.id = this.fromValiData.id
      ids.reportNo = this.params.reportNo
      ids.sampNoList = this.fromValiData.sampleValue.join(',')
      this.buttonLoading = true
      getSubSampAddOrModifyTask(ids).then(res => {
        this.$share.message()
        this.doReset()
        this.buttonLoading = false
      })
    },
    // 获取穿梭框 样品数据
    getTransferData() {
      let ids = {}
      ids.pageSize = 99999
      ids.pageNow = 1
      ids.status = '0'
      ids.reportNo = this.params.reportNo
      this.loading = true
      getSamplingTaskQuerySampNoPageListByTaskId(ids).then(res => {
        this.transferData = res.result.pageList
        this.fixedTransferData = res.result.pageList
        this.loading = false
      })
    },
    // 获取交样记录 列表数据
    getListData() {
      let ids = {}
      ids.pageSize = 99999
      ids.pageNow = 1
      ids.reportNo = this.params.reportNo
      ids.status = this.fromValiData.tableStatus
      ids.type = this.fromValiData.tableType
      getSubSampQueryTaskPage(ids).then(res => {
        this.tableData = res.result.pageList
      })
    },
    handleAdd_point() {
      this.$layer.iframe({
        content: {
          content: controlAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params,
            type: '1'
          } // props
        },
        area: this.$layer_Size.Min,
        title: '添加点位质控',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd_sample() {
      if (this.fromValiData.leftDefaultCheckedData.length === 0) {
        this.$share.message('请勾选一个样品', 'warning')
        return
      } else if (this.fromValiData.leftDefaultCheckedData.length > 1) {
        this.$share.message('勾选的样品数量不能大于1', 'warning')
        return
      }
      let params = this.transferData.find(xdd => {
        return xdd.sampNo === this.fromValiData.leftDefaultCheckedData[0]
      })
      this.$layer.iframe({
        content: {
          content: controlAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: '2'
          } // props
        },
        area: this.$layer_Size.Min,
        title: '添加样品质控',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchDel() {
      if (this.fromValiData.leftDefaultCheckedData.length === 0) {
        this.$share.message('请先勾选要删除的样品数据', 'warning')
        return
      }
      console.log(this.fromValiData.leftDefaultCheckedData)
      let ids = { sampNo: '' }
      this.fromValiData.leftDefaultCheckedData.forEach(xdd => {
        ids.sampNo += xdd + ','
      })
      ids.sampNo = ids.sampNo.substring(0, ids.sampNo.length - 1)

      this.$share.confirm({
        confirm: () => {
          getSamplingTaskDelSampNo({ ids: ids.sampNo }).then(res => {
            this.$share.message('删除成功')
            this.getTransferData()
          })
        }
      })
    },
    getLeftCheckChange(e) {
      this.fromValiData.leftDefaultCheckedData = e
    },
    // 切换收样任务状态
    changeStatus(e) {
      if (this.fromValiData.id !== null) {
        this.fromValiData.id = null
        this.fromValiData.sampleValue = []
      }
      this.fromValiData.tableStatus = e
      this.fromValiData.tableValue = ''
      this.transferData = [...this.fixedTransferData]
      this.getListData()
    },
    // 切换选中项
    changeTableValue(e) {
      let ids = {}
      ids.pageSize = 99999
      ids.pageNow = 1
      ids.subSampTaskId = e
      this.fromValiData.id = e
      this.fromValiData.sampleValue = []
      this.transferData = [...this.fixedTransferData]
      getSubSampQuerySampPage(ids).then(res => {
        let disabled = false // 控制选中的样品是否可选
        if (this.fromValiData.tableStatus === '2') {
          disabled = true
        }
        res.result.pageList.forEach(xdd => {
          this.fromValiData.sampleValue.push(xdd.sampNo)
          this.transferData.push({
            sampPoint: xdd.sampPoint,
            sampNo: xdd.sampNo,
            targetName: xdd.targetName,
            disabled: disabled
          })
        })
      })
    },
    handleSubmit(row) {
      let that = this
      this.$share.confirm({
        message: '此操作讲提交收样任务，是否继续？',
        confirm: function () {
          let ids = {...row}
          ids.status = '1'
          getSubSampAddOrModifyTask(ids).then(res => {
            that.$share.message('提交成功')
            that.fromValiData.sampleValue = []
            that.getListData()
          })
        }
      })
    },
    handleRecord(params) {
      this.$layer.iframe({
        content: {
          content: recordList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '记录填写',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      this.$share.confirm({
        confirm: () => {
          getSubSampDelTask({ids: row.id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            if (this.fromValiData.id !== null) {
              this.fromValiData.id = null
            }
            this.fromValiData.sampleValue = []
            this.fromValiData.tableValue = ''
            this.getRequest()
          })
        }
      })
    },
    // 重置页面数据
    doReset() {
      if (this.fromValiData.id !== null) {
        this.fromValiData.id = null
      }
      this.fromValiData.sampleValue = []
      this.fromValiData.tableValue = ''
      this.fromValiData.tableStatus = '0'
      this.getRequest()
    },
    getRequest() {
      this.getTransferData()
      this.getListData()
    }
  },
  mounted () {
    this.getRequest()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  >>> .el-transfer-panel{
    width: 38%;
  }
  >>> .el-button--primary{
    height: 40px;
  }
  >>> .el-transfer-panel__list.is-filterable{
    height: 430px;
  }
  >>> .el-transfer-panel__body{
    height: 470px;
  }
  >>> .el-input__icon{
    line-height: 34px;
  }
  >>> .el-radio{
    margin-right: 0;
  }
  >>> .el-button--mini, .el-button--mini.is-round{
    padding: 7px 9px;
  }
  >>> .el-input__inner{
    height: 34px;
  }
  .tableSpan{
    font-size: 13px;height: 26px;line-height: 26px;
  }

</style>
