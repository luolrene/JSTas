<template>
  <homeRecord
    ref="homeRecord"
    :obj="this"
    :fromValiData="fromValiData"
    :pointListData="pointListData"
    @handleAdd="handleAdd"
    @handleSave="handleSave"
    @getPointValue="getPointValue">
    <fromRecord
      ref="fromRecord"
      :obj="this"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"></fromRecord>
    <tableRecord
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    :isPage="false"
    @getCellClick="getCellClick"></tableRecord>
  </homeRecord>
</template>

<script>
import projectList from '@/views/common/project_list.vue'
import machineAllot from '@/views/sampling/checkTask/machine_allot.vue'
import {getSamplingTaskQuerySampPointPage, getSamplingTaskQuerySampNoPage} from '@/api/sampling/sampTask.js'
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData} from '@/api/sampling/original.js'
export default {
  inject: [
    'reload'
  ],
  data () {
    return {
      btnLoading: false,
      loading: false,
      fromValiData: {
        fileName: ''
        // type:'' 1通用 2列表
      },
      pointListData: [], // 报告任务下的点位数据
      pointValue: '', // 选中的点位
      presentMachine: '', // 当要选择不同类型仪器的时候使用
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '分析项目', prop: 'zd49', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '环境条件温度(℃)(初)', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '环境条件温度(℃)(终)', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '环境条件湿度(%RH)(初)', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '环境条件湿度(%RH)(终)', prop: 'zd5', value: '', type: 'input', isRqd: true},

        {label: '仪器名称', prop: 'zd6', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '仪器型号', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '仪器编号', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '天平名称', prop: 'zd10', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '天平型号', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '天平编号', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '样品处理方式', prop: 'zd14', value: '', type: 'textarea', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '报告日期', prop: 'zd15', value: '', type: 'date', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd50',
        label: '滤膜编号',
        fixed: 'left',
        type: 'input',
        width: 200
      }, {
        prop: 'zd2',
        label: '称量日期',
        type: 'date',
        width: 190
      }, {
        label: '初重（g）',
        data: [
          {
            prop: 'zd3',
            label: '1',
            type: 'input',
            width: 80
          }, {
            prop: 'zd4',
            label: '2',
            type: 'input',
            width: 80
          }, {
            prop: 'zd5',
            label: 'm1',
            type: 'input',
            width: 80
          }
        ]
      }, {
        prop: 'zd6',
        label: '称量日期',
        type: 'date',
        width: 170
      }, {
        label: '终重（g）',
        data: [
          {
            prop: 'zd7',
            label: '1',
            type: 'input',
            width: 80
          }, {
            prop: 'zd8',
            label: '2',
            type: 'input',
            width: 80
          }, {
            prop: 'zd9',
            label: 'm²',
            type: 'input',
            width: 80
          }
        ]
      }, {
        prop: 'zd10',
        label: '增重Δm（g）',
        type: 'input',
        width: 120
      }],
      button: {
        width: 170,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              return params.edit
            }
          },
          {name: '复制',
            type: 'primary',
            click: 'handleCopy',
            condition: (params) => {
              return params.id !== null
            }
          },
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      }
    }
  },
  methods: {
    getListData() {
      let ids = {}
      ids.type = '2'
      ids.reportNo = this.fromValiData.reportNo
      ids.father = this.fromValiData.id
      getOxcQueryList(ids).then(res => {
        this.tableData = res.result
      })
    },
    // 获取报告任务下的点位数据
    getPointListData() {
      let ids = {pageSize: 10, pageNow: 1}
      ids.samplingTaskId = this.fromValiData.sampTaskId
      getSamplingTaskQuerySampPointPage(ids).then(res => {
        this.pointListData = res.result.pageList
      })
    },
    // 获取选中的点位
    getPointValue(params) {
      this.pointValue = params
    },
    handleProject(params) {
      this.$layer.iframe({
        content: {
          content: projectList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNo: this.fromValiData.reportNo
          }// props
        },
        area: this.$layer_Size.Max,
        title: '检查项目选择',
        maxmin: true,
        shadeClose: false
      })
    },
    // 获取勾选的检测项目
    getProjectListParams(params) {
      // 检测项目
      this.$set(this.fromValiData, 'zd49', params.targetName)
    },
    handleMachine(params) {
      this.presentMachine = params.prop
      this.$layer.iframe({
        content: {
          content: machineAllot, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            // reportNo: this.fromValiData.reportNo
          }// props
        },
        area: this.$layer_Size.Max,
        title: '仪器选择',
        maxmin: true,
        shadeClose: false
      })
    },
    // 获取勾选的仪器
    getMachineData(data) {
      if (this.presentMachine === 'zd6') {
        let zd6 = ''
        let zd7 = ''
        let zd8 = ''
        let zd9 = ''
        data.forEach(xdd => {
          // 仪器名称
          zd6 += xdd.name + ';'
          // 仪器型号
          zd7 += xdd.machineXh + ';'
          // 仪器编号
          zd8 += xdd.machineNo + ';'
          // 有效期
          zd9 += xdd.yxrq + ';'
        })
        this.$set(this.fromValiData, 'zd6', zd6.substring(0, zd6.length - 1))
        this.$set(this.fromValiData, 'zd7', zd7.substring(0, zd7.length - 1))
        this.$set(this.fromValiData, 'zd8', zd8.substring(0, zd8.length - 1))
        this.$set(this.fromValiData, 'zd9', zd9.substring(0, zd9.length - 1))
      } else if (this.presentMachine === 'zd10') {
        let zd10 = ''
        let zd11 = ''
        let zd12 = ''
        let zd13 = ''
        data.forEach(xdd => {
          // 天平名称
          zd10 += xdd.name + ';'
          // 天平型号
          zd11 += xdd.machineXh + ';'
          // 天平编号
          zd12 += xdd.machineNo + ';'
          // 有效期
          zd13 += xdd.yxrq + ';'
        })
        this.$set(this.fromValiData, 'zd10', zd10.substring(0, zd10.length - 1))
        this.$set(this.fromValiData, 'zd11', zd11.substring(0, zd11.length - 1))
        this.$set(this.fromValiData, 'zd12', zd12.substring(0, zd12.length - 1))
        this.$set(this.fromValiData, 'zd13', zd13.substring(0, zd13.length - 1))
      }
    },
    // 新建副表
    handleAdd() {
      // 如果未选择点位
      if (this.pointValue === '') {
        this.tableData.push({id: null, zd50: '', edit: true})
      } else {
        let ids = {pageNow: 1, pageSize: 9999}
        ids.sampPoint = this.pointValue
        this.pointListData.forEach(xdd => {
          if (xdd.id === this.pointValue) {
            this.fromValiData.fileName += ',' + xdd.pointName
          }
        })
        getSamplingTaskQuerySampNoPage(ids).then(res => {
          res.result.pageList.forEach(xdd => {
            this.tableData.push({id: null, zd50: xdd.sampNo, edit: false})
          })
        })
      }
    },
    handleSave() {
      this.$refs.homeRecord.loading_save = true
      let ids = {...this.fromValiData}
      getOxcAddOrModifyData(ids).then(res => {
        this.$share.message()
        this.$refs.homeRecord.loading_save = false
        this.reload()
        this.fromValiData.id = res.result
        // 表头保存成功后 跳转到当前保存的路由 不然还是在新建页面
        this.$router.push({name: this.fromValiData.fileNo, params: this.fromValiData})
      })
    },
    getCellClick(params) {
      this.$set(params, 'edit', true)
    },
    handleEdit(params) {
      let ids = {...params}
      ids.father = this.fromValiData.id
      ids.type = '2'
      ids.reportNo = this.fromValiData.reportNo
      getOxcAddOrModifyData(ids).then(res => {
        this.$set(params, 'edit', false)
        this.$set(params, 'id', res.result)
        this.$share.message()
      })
    },
    handleCopy(params) {
      this.$prompt('请填入要复制的数量', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$|^\d+[.]?\d+$/,
        inputErrorMessage: '请填入数字'
      }).then(({ value }) => {
        let ids = {...params}
        ids.copyNum = value
        ids.father = this.fromValiData.id
        ids.type = '2'
        ids.reportNo = this.fromValiData.reportNo
        getOxcCopyData(ids).then(res => {
          this.$share.message('成功复制' + value + '条')
          this.getListData()
        })
      })
    },
    handleDelete(params, index) {
      let ids = {}
      ids.ids = params.id
      if (ids.ids === null) {
        this.tableData.splice(index, 1)
      } else {
        getOxcDelData({ids: params.id}).then(res => {
          this.$share.message('删除成功')
          this.tableData.splice(index, 1)
        })
      }
    },
    // 相同路由和不同路由进入时候的交集
    commonContent() {
      if (this.fromValiData.id === null) {
        this.fromValiData.zd1 = this.fromValiData.custName
        this.$set(this.fromValiData, 'zd14', '105℃在烘箱中烘1h后，在15-30℃、±50%湿度下恒温恒湿箱中恒24h后用天平称重，再恒1h后，再称重。')
      }
    }
  },
  watch: {
    // 同路径路由跳转
    '$route': function (to, from) {
      this.fromValiData = {...this.$route.params}
      this.commonContent()
      this.tableData = []
      this.getPointListData()
      if (this.fromValiData.id !== null) {
        this.getListData()
      }
    }
  },
  mounted () {
    this.fromValiData = {...this.$route.params}
    this.commonContent()

    this.getPointListData()
    if (this.fromValiData.id !== null) {
      this.getListData()
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
