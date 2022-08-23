<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="已通过" name="已通过">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            icon="el-icon-search"
            @click="doSearch()">查询</el-button>
          <el-button type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            icon="el-icon-refresh"
            @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            icon="el-icon-close"
            @click="handleBatchBack()"
            :disabled="params.contStatus === '07'">一键退回</el-button>
          <el-button type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            icon="el-icon-s-custom"
            @click="doInputPerson(false)"
            :disabled="params.contStatus === '07'">转发</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :button="button"
        :loading="loading"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="原始记录" name="原始记录" lazy>
        <original :params="params"></original>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import inputPerson from '../../common/input_person.vue'
import original from '../../check/targetVerity/original.vue'
import {getSamplingTaskQuerySampTargetPage, getTargetResultSaveLrlx1} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    isScene: String,
    targetStatus: {
      type: String,
      default: '2' // 0初始 1审核中 2审核通过 3退回
    },
    layerid: ''
  },
  components: {
    original
  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        targetName: '',
        targetStatus: '' // 0初始 1审核中 2审核通过 3退回
      },
      tableData: [

      ],
      fromData: [
        {type: 'input', prop: 'targetName', label: '指标名称'}
      ],
      tableHeader: [{
        prop: 'sampNo',
        label: '样品编号',
        width: 200
      }, {
        prop: 'targetName',
        label: '指标名称',
        width: 180
      }, {
        prop: 'checkTime',
        label: '检测时间',
        width: 200
      }, {
        prop: 'resultNum',
        label: '检测结果',
        width: 100
      }, {
        prop: 'resultDw',
        label: '检测结果单位',
        width: 120
      }, {
        prop: 'targetStatusName',
        label: '指标状态',
        width: 100
      }, {
        prop: 'operName',
        label: '转发人员',
        width: 90
      }, {
        prop: 'bjValue',
        label: '背景值',
        width: 100
      }, {
        prop: 'zsnd',
        label: '折算浓度(mg/m³)',
        width: 150
      }, {
        prop: 'pfl',
        label: '排放量(kg/h)',
        width: 130
      }, {
        prop: 'xdpc',
        label: ' 相对偏差',
        width: 100
      }, {
        prop: 'jbl',
        label: '加标量',
        width: 100
      }, {
        prop: 'hsl',
        label: '回收率',
        width: 100
      }, {
        prop: 'pxResult',
        label: '平行结果',
        width: 100
      }, {
        prop: 'xdwc',
        label: '相对误差',
        width: 100
      }, {
        prop: 'machineName',
        label: '仪器名称+型号',
        width: 140
      }, {
        prop: 'machineNo',
        label: '仪器编号',
        width: 90
      }, {
        prop: 'isSceneName',
        label: '是否现场',
        width: 90
      }],
      button: {
        width: 120,
        buttonList: [

        ]
      },
      multipleSelection: [],
      checkTimeBatchData: [], // 检测时间 批量录入
      activeName: '已通过'
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.isScene = this.isScene // 是否现场1是0否
      this.fromValiData.lrlx = this.params.lrlx
      this.fromValiData.reportNo = this.params.reportNo
      getSamplingTaskQuerySampTargetPage(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.isSceneName = xdd.isScene === '1' ? '是' : '否'
          if (this.activeName === '待处理') {
            if (xdd.checkTime !== null) {
              let time = xdd.checkTime.split(',')
              if (time.length === 1) {
                xdd.checkTime = [time[0], time[0]]
              } else {
                xdd.checkTime = time
              }
            }
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

          if (xdd.returnReason !== null && xdd.returnReason !== '') {
            xdd.targetStatusName = xdd.targetStatusName + '(' + xdd.returnReason + ')'
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
    handleBatchEdit(value) {
      let ids = []
      this.tableData.forEach(xdd => {
        let params = JSON.parse(JSON.stringify(xdd))
        ids.push(params)
      })
      getTargetResultSaveLrlx1(ids).then(res => {
        this.getListData()
        if (!value) {
          this.$share.message()
        }
      })
    },
    tabClick (e) {
      if (e.name === '审核中') {
        this.fromValiData.targetStatus = '1'
      } else if (e.name === '已通过') {
        this.fromValiData.targetStatus = '2'
      }
      this.doReset()
    },
    handleBatchBack () { 
      this.$prompt('请输入退回原因', '一键退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValue: this.params.returnDetail
      }).then(({ value }) => {
        let ids = []
        this.multipleSelection.forEach(xdd => {
          let params = JSON.parse(JSON.stringify(xdd))
          params.targetStatus = '3'
          params.returnReason = value
          ids.push(params)
        })
        getTargetResultSaveLrlx1(ids).then(res => {
          this.getListData()
          this.$share.message('退回成功', 'success')
        })
      })
    },
    doInputPerson(data) {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选指标', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1' // 只能看到自己组及以下的人
          } // props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson(params) {
      return new Promise((resolve, reject) => {
        this.multipleSelection.forEach(xdd => {
          xdd.operName = params.name
          xdd.oper = params.mobile
        })
        this.handleBatchEdit(true)
        resolve(true)
      })
    },
    handleBatchPass () {
      let that = this
      this.$share.confirm({
        message: '此操作将一键审核通过选择的数据, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = []
          that.multipleSelection.forEach(xdd => {
            let params = JSON.parse(JSON.stringify(xdd))
            params.targetStatus = '2'
            ids.push(params)
          })
          getTargetResultSaveLrlx1(ids).then(res => {
            that.getListData()
            that.$share.message('审核通过成功', 'success')
          })
        }
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {
    this.fromValiData.targetStatus = this.targetStatus
  }
}
</script>

<style scoped lang="scss">

</style>
