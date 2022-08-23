<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="待校对" name="待校对">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="handleBatchPass()">一键通过</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-close" @click="handleBatchBack()">一键退回</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :loading="loading"
        :isSelection="isSelection"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="已通过" lazy>
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :loading="loading"
        :isSelection="isSelection"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="原始记录" name="原始记录" lazy>
        <original :params="params"></original>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import original from '../targetVerity/original.vue'
import {
  getSamplingTaskQuerySampTargetPage,
  getTargetResultSaveLrlx1
} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    isScene: String,
    layerid: ''
  },
  components: {
    original
  },
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 50,
        pageNow: 1,
        sampNo: '',
        targetStatus: '4'
      },
      fromData: [{ type: 'input', prop: 'sampNo', label: '样品编号' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 200
        },
        {
          prop: 'targetName',
          label: '指标名称',
          width: 180
        },
        {
          prop: 'checkTime',
          label: '检测时间',
          width: 200
        },
        {
          prop: 'resultNum',
          label: '检测结果',
          width: 100
        },
        {
          prop: 'jcx',
          label: '检出限',
          width: 100
        },
        {
          prop: 'operName',
          label: '检测人员',
          width: 100
        },
        {
          prop: 'jdOperName',
          label: '校对人员',
          width: 100
        },
        {
          prop: 'resultDw',
          label: '检测结果单位',
          width: 120
        },
        {
          prop: 'targetStatusName',
          label: '指标状态',
          width: 100
        },
        {
          prop: 'bjValue',
          label: '背景值',
          width: 100
        },
        {
          prop: 'zsnd',
          label: '折算浓度(mg/m³)',
          width: 150
        },
        {
          prop: 'pfl',
          label: '排放量(kg/h)',
          width: 130
        },
        {
          prop: 'xdpc',
          label: ' 相对偏差',
          width: 100
        },
        {
          prop: 'jbl',
          label: '加标量',
          width: 100
        },
        {
          prop: 'hsl',
          label: '回收率',
          width: 100
        },
        {
          prop: 'pxResult',
          label: '平行结果',
          width: 100
        },
        {
          prop: 'xdwc',
          label: '相对误差',
          width: 100
        },
        {
          prop: 'machineName',
          label: '仪器名称+型号',
          width: 140
        },
        {
          prop: 'machineNo',
          label: '仪器编号',
          width: 90
        },
        {
          prop: 'isSceneName',
          label: '是否现场',
          width: 90
        }
      ],
      multipleSelection: [],
      activeName: '待校对',
      isSelection: true
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.reportNo = this.params.reportNo
      getSamplingTaskQuerySampTargetPage(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.isSceneName = xdd.isScene === '1' ? '是' : '否'
          if (xdd.checkTime !== null) {
            xdd.checkTime = xdd.checkTime.split(',').join('~')
          }
          switch (xdd.targetStatus) {
            case '0':
              xdd.targetStatusName = '初始'
              break
            case '1':
              xdd.targetStatusName = '审核中'
              break
            case '2':
              xdd.targetStatusName = '审核通过'
              break
            case '3':
              xdd.targetStatusName = '退回'
              break
            case '4':
              xdd.targetStatusName = '校对中'
              break
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleBatchPass() {
      this.$share.confirm({
        message: '此操作将一键校对通过选择的数据, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = []
          this.multipleSelection.forEach(xdd => {
            let params = JSON.parse(JSON.stringify(xdd))
            params.targetStatus = '1'
            ids.push(params)
          })
          getTargetResultSaveLrlx1(ids).then(res => {
            if (this.fromValiData.dataSum === this.multipleSelection.length) {
              this.$layer.close(this.layerid)
            } else {
              this.getListData()
            }
            this.$share.message('校对通过成功', 'success')
            this.$parent.getListData()
          })
        }
      })
    },
    handleBatchBack() {
      this.$prompt('请输入退回原因', '一键退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = []
        this.multipleSelection.forEach(xdd => {
          let params = JSON.parse(JSON.stringify(xdd))
          params.targetStatus = '3'
          params.returnReason = value
          ids.push(params)
        })
        getTargetResultSaveLrlx1(ids).then(res => {
          if (this.fromValiData.dataSum === this.multipleSelection.length) {
            this.$layer.close(this.layerid)
          } else {
            this.getListData()
          }
          this.$share.message('退回成功', 'success')
          this.$parent.getListData()
        })
      })
    },
    tabClick(e) {
      if (e.name === '待校对') {
        this.fromValiData.targetStatus = '4'
        this.isSelection = true
      } else {
        this.fromValiData.targetStatus = '2'
        this.isSelection = false
      }
      this.doReset()
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
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
    if (this.isScene) {
      this.fromValiData.isScene = this.isScene
      // this.isScene = this.fromValiData.isScene
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
