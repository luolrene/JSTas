<!-- 采样任务列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" v-if="manage">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>

      </fromSearch>
    </el-form>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getCrmAchievementSumQuerySampTargetPage } from '../../../api/performance/manage.js'
export default {
  props: {
    params: Object,
    layerid: '',
    manage: Boolean
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageNow: 1,
        pageSize: 10
      },
      fromData: [
        {
          type: 'input',
          prop: 'targetName',
          label: '指标名称'
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'targetName',
          label: '指标名称',
          width: 150
        },
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 110
        },
        {
          prop: 'operName',
          label: '检测人员',
          width: 90
        }
      ],
      button: {
        width: 380,
        buttonList: []
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCrmAchievementSumQuerySampTargetPage(this.fromValiData)
        .then(res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.targetName = ''
      delete this.fromValiData.targetName
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData.reportNo = this.params.reportNo
      this.fromValiData.userMobile = this.params.userMobile
      this.fromValiData.totalTime = this.params.totalTime
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
