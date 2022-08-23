<!-- 指标列表 -->
<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="待处理" name="待处理">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="params.contStatus === '07'">批量保存</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-bangzhu" @click="handleBatchEquipment()" :disabled="params.contStatus === '07'">仪器分配</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-custom" @click="doInputPerson(false)" :disabled="params.contStatus === '07'">转发</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-top" @click="doInputPerson(true)" :disabled="params.contStatus === '07'">批量提交校对</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="" @click="handleConfirm" :disabled="params.contStatus === '07'">方法修改</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" :pageSize="50" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="校对中" name="校对中" lazy>
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="isSelection" :pageSize="50" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="审核中" lazy>
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="isSelection" :pageSize="50" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="已通过" lazy>
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="isSelection" :pageSize="50" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="原始记录" name="原始记录" lazy>
        <original :params="params" ref="targetList"></original>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import inputPerson from '../../common/input_person.vue'
import targetEdit from '../../sampling/checkTask/target_edit.vue'
import machineAllot from '../../sampling/sampTask/machine_edit.vue'
import original from './original.vue'
import planEdit from './plan_edit.vue'
import {getSamplingTaskQuerySampTargetPage, getTargetResultSaveLrlx1} from '../../../api/sampling/sampTask.js'
import {getTargetQueryFuns} from '@/api/jcxxgl/targetDefend.js'
export default {
  props: {
    params: Object,
    isScene: String,
    targetStatus: {
      type: String,
      default: '0,3' // 0初始 1审核中 2审核通过 3退回 4校对中
    },
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
        targetName: '',
        targetStatus: '' // 0初始 1审核中 2审核通过 3退回 4校对中
      },
      tableData: [],
      fromData: [
        { type: 'input', prop: 'targetName', label: '指标名称' },
        { type: 'input', prop: 'funName', label: '检测方法' },
      ],
      tableHeader: [],
      isPersonToCheck: false,
      tableHeader_A: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 180
        },
        {
          prop: 'targetName',
          label: '指标名称',
          width: 140
        },
        {
          prop: 'funName',
          label: '检测方法',
          width: 240
        },
        {
          prop: 'operName',
          label: '检测人员',
          width: 90
        },
        {
          prop: 'checkTime',
          label: '检测时间',
          type: 'input',
          width: 300
        },
        {
          prop: 'resultNum',
          label: '检测结果',
          type: 'input',
          placeholder: '检测结果',
          width: 110
        },
        {
          prop: 'resultDw',
          label: '检测结果单位',
          type: 'input',
          placeholder: '检测结果单位',
          width: 120
        },
        {
          prop: 'jcx',
          label: '检出限',
          type: 'input',
          placeholder: '检出限',
          width: 120
        },
        {
          prop: 'targetStatusName',
          label: '指标状态',
          width: 140,
          condition: function(row) {
            if (row.targetStatus === '3') {
              return '#FF798D'
            }
          }
        },
        {
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
      tableHeader_B: [
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
          prop: 'funName',
          label: '检测方法',
          width: 240
        },
        {
          prop: 'jdOperName',
          label: '校对人',
          width: 120
        },
        {
          prop: 'operName',
          label: '检测人员',
          width: 90
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
      button: {
        width: 120,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          }
        ]
      },
      multipleSelection: [],
      activeName: '待处理',
      isSelection: true
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.isScene = this.isScene // 是否现场1是0否
      this.fromValiData.lrlx = this.params.lrlx
      this.fromValiData.reportNo = this.params.reportNo
      getSamplingTaskQuerySampTargetPage(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.isSceneName = xdd.isScene === '1' ? '是' : '否'
            switch (xdd.targetStatus) {
              case '0':
                xdd.targetStatusName = '草稿'
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
              xdd.targetStatusName =
                xdd.targetStatusName + '(' + xdd.returnReason + ')'
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: targetEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
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
    handleBatchEquipment() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需要分配的指标', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: machineAllot, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            type: '1' // 1实验室 2现场
          } // props
        },
        area: this.$layer_Size.Max,
        title: '仪器列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleConfirm() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需要分配的指标', 'warning')
        return
      }
      let isPass = true
      let ary = this.multipleSelection
      ary.forEach((xdd, index) => {
        if (index < ary.length - 1) {
          if (xdd.targetName !== ary[index + 1].targetName) {
            isPass = false
          }
        }
      })
      if (!isPass) {
        this.$share.message('勾选的数据必须是同一种指标', 'warning')
        return
      }
      let ids = {}
      ids.pageSize = 999
      ids.pageNow = 1
      ids.targetId = this.multipleSelection[0].targetId
      getTargetQueryFuns(ids).then(res => {
        this.$layer.iframe({
          content: {
            content: planEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              multipleSelection: this.multipleSelection,
              targetData: res.result.pageList
            }// props
          },
          area: this.$layer_Size.Max,
          title: '方法修改',
          maxmin: true,
          shadeClose: false
        })
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getPlanEdit(params) {
      return new Promise((resolve, reject) => {
        let ids = []
        let ary = [...this.multipleSelection]
        ary.forEach(xdd => {
          let a = {...xdd}
          a.fun = params.funId
          a.funName = params.funName
          a.oper = params.oper
          a.operName = params.operName
          a.changeFun = '1'
          xdd.funName = params.funName
          ids.push(a)
        })
        getTargetResultSaveLrlx1(ids).then(res => {
          resolve(true)
        })
      })
    },
    getMachineData(data) {
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
      this.handleBatchEdit(false)
    },
    tabClick(e) {
      if (e.name === '待处理') {
        this.fromValiData.targetStatus = this.targetStatus
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
      } else if (e.name === '原始记录') {
        this.$refs.targetList.getListData_A()
        this.$refs.targetList.getListData_B()
      } else if (e.name === '校对中') {
        this.fromValiData.targetStatus = '4'
        this.tableHeader = this.tableHeader_B
        this.button.buttonList = []
        this.isSelection = false
      }

      this.doReset()
    },
    doInputPerson(data) {
      this.isPersonToCheck = data
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
        if (!this.isPersonToCheck) {
          this.multipleSelection.forEach(xdd => {
            xdd.operName = params.name
            xdd.oper = params.mobile
          })
          this.handleBatchEdit(true)
        } else {
          let ids = []
          this.multipleSelection.forEach(xdd => {
            let arc = JSON.parse(JSON.stringify(xdd))
            arc.returnReason = ''
            arc.targetStatus = '4'
            arc.jdOper = params.mobile
            arc.jdOperName = params.name
            ids.push(arc)
          })
          getTargetResultSaveLrlx1(ids).then(res => {
            this.getListData()
          })
        }
        resolve(true)
      })
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
    this.getListData()
  },
  created() {
    this.tableHeader = this.tableHeader_A
    this.fromValiData.targetStatus = this.targetStatus

    if (this.params.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '编辑') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
