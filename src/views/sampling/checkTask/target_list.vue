<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="待处理" name="待处理">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-form-item label="批量录入检测时间:">
              <el-input placeholder="请先勾选要录入的指标" disabled v-if="multipleSelection.length === 0"></el-input>
              <el-date-picker
                v-else
                v-model="checkTimeBatchData"
                type="daterange"
                :clearable="false"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getChangeCheckTime"
                style="width: 300px">
              </el-date-picker>
            </el-form-item>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="params.contStatus === '07'">批量保存</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-bangzhu" @click="handleBatchEquipment()" :disabled="params.contStatus === '07'">仪器分配</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-top" @click="handleBatchSubmit()" :disabled="params.contStatus === '07'">批量提交审核</el-button>
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
      <el-tab-pane label="审核中" name="审核中">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :button="button"
        :loading="loading"
        :isSelection="isSelection"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="已通过">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :dataSum='fromValiData.dataSum'
        :button="button"
        :loading="loading"
        :isSelection="isSelection"
        @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import machineAllot from './machine_allot.vue'
import targetEdit from './target_edit.vue'
import {getSamplingTaskQuerySampTargetPage, getTargetResultSaveLrlx1} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    isScene: String,
    layerid: ''
  },
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        targetStatus: '0,3' // 0初始 1审核中 2审核通过 3退回
      },
      fromData: [
        {type: 'input', prop: 'targetName', label: '指标名称'}
      ],
      tableData: [

      ],
      tableHeader: [],
      tableHeader_A: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 180
        }, {
          prop: 'targetName',
          label: '指标名称',
          width: 180
        }, {
          prop: 'targetStatusName',
          label: '指标状态',
          width: 110,
          condition: function (row) {
            if (row.targetStatus === '3') {
              return '#FF798D'
            }
          }
        }, {
          prop: 'checkTime',
          label: '检测时间',
          type: 'daterange',
          width: 300
        }, {
          prop: 'resultNum',
          label: '检测结果',
          type: 'input',
          placeholder: '检测结果',
          width: 110
        }, {
          prop: 'resultDw',
          label: '检测结果单位',
          type: 'input',
          placeholder: '检测结果单位',
          width: 120
        }, {
          prop: 'bjValue',
          label: '背景值',
          type: 'input',
          placeholder: '背景值',
          width: 110
        },
        // {
        //   prop: 'zsnd',
        //   label: '折算浓度(mg/m³)',
        //   type: 'input',
        //   placeholder: '折算浓度',
        //   number: true,
        //   width: 150
        // }, {
        //   prop: 'pfl',
        //   label: '排放量(kg/h)',
        //   type: 'input',
        //   placeholder: '排放量',
        //   number: true,
        //   width: 140
        // }, {
        //   prop: 'xdpc',
        //   label: ' 相对偏差',
        //   type: 'input',
        //   placeholder: ' 相对偏差',
        //   width: 110
        // }, {
        //   prop: 'jbl',
        //   label: '加标量',
        //   type: 'input',
        //   placeholder: '加标量',
        //   width: 110
        // }, {
        //   prop: 'hsl',
        //   label: '回收率',
        //   type: 'input',
        //   placeholder: '回收率',
        //   width: 110
        // }, {
        //   prop: 'pxResult',
        //   label: '平行结果',
        //   type: 'input',
        //   placeholder: '平行结果',
        //   width: 110
        // }, {
        //   prop: 'xdwc',
        //   label: '相对误差',
        //   type: 'input',
        //   placeholder: '相对误差',
        //   width: 110
        // },
        {
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
        }
      ],
      tableHeader_B: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 180
        }, {
          prop: 'targetName',
          label: '指标名称',
          width: 180
        }, {
          prop: 'targetStatusName',
          label: '指标状态',
          width: 110
        }, {
          prop: 'checkTime',
          label: '检测时间',
          width: 300
        }, {
          prop: 'resultNum',
          label: '检测结果',
          width: 110
        }, {
          prop: 'resultDw',
          label: '检测结果单位',
          width: 120
        }, {
          prop: 'bjValue',
          label: '背景值',
          width: 110
        },
        // {
        //       prop: 'zsnd',
        //       label: '折算浓度(mg/m³)',
        //       width: 150
        //     }, {
        //       prop: 'pfl',
        //       label: '排放量(kg/h)',
        //       width: 140
        //     }, {
        //       prop: 'xdpc',
        //       label: ' 相对偏差',
        //       width: 110
        //     }, {
        //       prop: 'jbl',
        //       label: '加标量',
        //       width: 110
        //     }, {
        //       prop: 'hsl',
        //       label: '回收率',
        //       width: 110
        //     }, {
        //       prop: 'pxResult',
        //       label: '平行结果',
        //       width: 110
        //     }, {
        //       prop: 'xdwc',
        //       label: '相对误差',
        //       width: 110
        //     },
        {
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
        }
      ],
      button: {
        width: 120,
        buttonList: [
          // {name: '编辑',
          //   type: 'primary',
          //   click: 'handleEdit'
          // }
        ]
      },
      multipleSelection: [],
      checkTimeBatchData: [], // 检测时间 批量录入
      activeName: '待处理',
      isSelection: true
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.isScene = this.isScene // 是否现场1是0否
      this.fromValiData.lrlx = this.params.lrlx
      this.fromValiData.sampNo = this.params.sampNo
      this.fromValiData.reportNo = this.params.reportNo ? this.params.reportNo : null
      getSamplingTaskQuerySampTargetPage(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
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
          xdd.isSceneName = xdd.isScene === '1' ? '是' : '否'
          if (xdd.checkTime !== null) {
            if (this.fromValiData.targetStatus === '0') {
              let time = xdd.checkTime.split(',')
              if (time.length === 1) {
                xdd.checkTime = [time[0], time[0]]
              } else {
                xdd.checkTime = time
              }
            } else {
              xdd.checkTime = xdd.checkTime.split(',').join('~')
            }
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
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: targetEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchEdit () {
      let ids = []
      this.tableData.forEach(xdd => {
        let params = JSON.parse(JSON.stringify(xdd))
        if (params.checkTime !== null && params.checkTime.length > 0) {
          if (params.checkTime[0] === params.checkTime[1]) {
            params.checkTime = params.checkTime[0]
          } else {
            params.checkTime = params.checkTime.join(',')
          }
        }
        ids.push(params)
      })
      getTargetResultSaveLrlx1(ids).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    handleBatchSubmit () {
      let that = this
      this.$share.confirm({
        message: '此操作将把选择的数据提交审核, 是否继续?',
        type: 'success',
        confirm: function () {
          let ids = []
          that.multipleSelection.forEach(xdd => {
            let params = JSON.parse(JSON.stringify(xdd))
            if (params.checkTime !== null && params.checkTime.length > 0) {
              if (params.checkTime[0] === params.checkTime[1]) {
                params.checkTime = params.checkTime[0]
              } else {
                params.checkTime = params.checkTime.join(',')
              }
            }
            params.returnReason = ''
            params.targetStatus = 1
            ids.push(params)
          })
          getTargetResultSaveLrlx1(ids).then(res => {
            that.getListData()
            that.$parent.getListData()
            that.$share.message('提交成功', 'success')
          })
        }
      })
    },
    handleBatchEquipment () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需要分配的指标', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: machineAllot, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNo: this.multipleSelection[0].reportNo
          }// props
        },
        area: this.$layer_Size.Max,
        title: '仪器列表',
        maxmin: true,
        shadeClose: false
      })
    },
    // 检测时间 批量录入
    getChangeCheckTime (e) {
      this.multipleSelection.forEach(xdd => {
        xdd.checkTime = e
      })
      this.checkTimeBatchData = []
    },
    getMachineData (data) {
      let machineName = '' // 仪器名称+型号
      let machineNo = '' // 仪器编号
      data.forEach(xdd => {
        machineName += xdd.name + '-' + xdd.machineXh + ','
        machineNo += xdd.machineNo + ','
      })
      this.multipleSelection.forEach(xdd => {
        xdd.machineName = machineName.substring(0, machineName.length - 1)
        xdd.machineNo = machineNo.substring(0, machineNo.length - 1)
      })
      this.handleBatchEdit()
    },
    tabClick (e) {
      if (e.name === '待处理') {
        this.fromValiData.targetStatus = '0,3'
        this.tableHeader = this.tableHeader_A
        this.isSelection = true
      } else if (e.name === '已通过') {
        this.fromValiData.targetStatus = '2'
        this.tableHeader = this.tableHeader_B
        this.button.buttonList = []
        this.isSelection = false
      } else if (e.name === '审核中') {
        this.fromValiData.targetStatus = '1'
        this.tableHeader = this.tableHeader_B
        this.button.buttonList = []
        this.isSelection = false
      }
      this.doReset()
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
    this.tableHeader = this.tableHeader_A
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
