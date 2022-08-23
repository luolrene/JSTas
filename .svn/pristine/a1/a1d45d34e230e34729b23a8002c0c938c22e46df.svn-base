<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
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
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()">批量保存</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-bangzhu" @click="handleBatchEquipment()">仪器分配</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
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
        pageNow: 1
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'sampNo',
        label: '样品编号',
        width: 180
      }, {
        prop: 'targetName',
        label: '指标名称',
        width: 180
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
        prop: 'jcx',
        label: '检出限',
        type: 'input',
        placeholder: '检出限',
        width: 120
      }, {
        prop: 'bjValue',
        label: '背景值',
        type: 'input',
        placeholder: '背景值',
        width: 110
      },
        // {
        //      prop: 'zsnd',
        //      label: '折算浓度(mg/m³)',
        //      type: 'input',
        //      placeholder: '折算浓度',
        //      number: true,
        //      width: 150
        //    }, {
        //      prop: 'pfl',
        //      label: '排放量(kg/h)',
        //      type: 'input',
        //      placeholder: '排放量',
        //      number: true,
        //      width: 140
        //    }, {
        //      prop: 'xdpc',
        //      label: ' 相对偏差',
        //      type: 'input',
        //      placeholder: ' 相对偏差',
        //      width: 110
        //    }, {
        //      prop: 'jbl',
        //      label: '加标量',
        //      type: 'input',
        //      placeholder: '加标量',
        //      width: 110
        //    }, {
        //      prop: 'hsl',
        //      label: '回收率',
        //      type: 'input',
        //      placeholder: '回收率',
        //      width: 110
        //    }, {
        //      prop: 'pxResult',
        //      label: '平行结果',
        //      type: 'input',
        //      placeholder: '平行结果',
        //      width: 110
        //    }, {
        //      prop: 'xdwc',
        //      label: '相对误差',
        //      type: 'input',
        //      placeholder: '相对误差',
        //      width: 110
        //    },
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
      }],
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
      checkTimeBatchData: [] // 检测时间 批量录入
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
          xdd.isSceneName = xdd.isScene === '1' ? '是' : '否'
          if (xdd.checkTime !== null) {
            let time = xdd.checkTime.split(',')
            if (time.length === 1) {
              xdd.checkTime = [time[0], time[0]]
            } else {
              xdd.checkTime = time
            }
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

  }
}
</script>

<style scoped lang="scss">

</style>
