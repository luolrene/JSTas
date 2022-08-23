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
    :tableData="tableData_B"
    :tableHeader="tableHeader_B"
    :button="button_B"
    :dataSum='fromValiData_B.dataSum'
    :loading="loading_B"
    :isSelection="false"
    :isPage="false"
    @getCellClick="getCellClick"></tableRecord>
    <div style="margin: 10px;"></div>
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
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData, getOxcSaveDatas} from '@/api/sampling/original.js'
export default {
  inject: [
    'reload'
  ],
  data () {
    return {
      btnLoading: false,
      loading: false,
      loading_B: false,
      fromValiData: {
        fileName: ''
        // type:'' 1通用 2列表
      },
      fromValiData_B: {
        fileName: ''
        // type:'' 1通用 2列表  3 记录里拥有的第二个表格数据
      },
      pointListData: [], // 报告任务下的点位数据
      pointValue: '', // 选中的点位
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '分析项目', prop: 'zd49', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '仪器名称', prop: 'zd2', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '仪器型号', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '仪器编号', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '样品处理方式', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '天平室条件-温度', prop: 'zd7', value: '', type: 'input', isRqd: true, append: '℃'},
        {label: '天平室条件-湿度', prop: 'zd8', value: '', type: 'input', isRqd: true, append: '%RH'},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '报告日期', prop: 'zd9', value: '', type: 'date', isRqd: true}
      ],

      tableData: [],
      tableData_B: [],

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
            width: 60
          }, {
            prop: 'zd4',
            label: '2',
            type: 'input',
            width: 60
          }, {
            prop: 'zd5',
            label: 'm1',
            type: 'input',
            width: 60
          }
        ]
      }, {
        prop: 'zd6',
        label: '称量日期',
        type: 'date',
        width: 190
      }, {
        label: '终重（g）',
        data: [
          {
            prop: 'zd7',
            label: '1',
            type: 'input',
            width: 60
          }, {
            prop: 'zd8',
            label: '2',
            type: 'input',
            width: 60
          }, {
            prop: 'zd9',
            label: 'm²',
            type: 'input',
            width: 60
          }
        ]
      }, {
        prop: 'zd10',
        label: '增重Δm（g）',
        type: 'input',
        width: 110
      }],
      tableHeader_B: [
        {
          prop: 'zd1',
          label: '标准滤膜检查',
          fixed: 'left',
          type: 'input',
          width: 150
        }, {
          prop: 'zd2',
          label: '滤膜编号',
          type: 'input',
          width: 200
        }, {
          prop: 'zd3',
          label: '标准滤膜原始质量(g)',
          type: 'input',
          width: 190
        }, {
          label: '标准滤膜原始质量(g)',
          data: [
            {
              prop: 'zd4',
              label: 'm1',
              type: 'input',
              width: 60
            }, {
              prop: 'zd5',
              label: 'm²',
              type: 'input',
              width: 60
            }, {
              prop: 'zd6',
              label: 'm均',
              type: 'input',
              width: 60
            }
          ]
        }, {
          prop: 'zd7',
          label: '检查结论',
          type: 'input',
          width: 190
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
      },
      button_B: {
        width: 170,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit_B',
            condition: (params) => {
              return params.edit
            }
          }
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
    getListData_B() {
      let ids = {}
      ids.type = '3'
      ids.reportNo = this.fromValiData.reportNo
      ids.father = this.fromValiData.id
      getOxcQueryList(ids).then(res => {
        this.tableData_B = res.result
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
      let zd2 = ''
      let zd3 = ''
      let zd4 = ''
      let zd5 = ''
      data.forEach(xdd => {
        // 仪器名称
        zd2 += xdd.name + ';'
        // 仪器型号
        zd3 += xdd.machineXh + ';'
        // 仪器编号
        zd4 += xdd.machineNo + ';'
        // 有效期
        zd5 += xdd.yxrq + ';'
      })
      this.$set(this.fromValiData, 'zd2', zd2.substring(0, zd2.length - 1))
      this.$set(this.fromValiData, 'zd3', zd3.substring(0, zd3.length - 1))
      this.$set(this.fromValiData, 'zd4', zd4.substring(0, zd4.length - 1))
      this.$set(this.fromValiData, 'zd5', zd5.substring(0, zd5.length - 1))
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

        if (this.tableData_B.length === 0) {
          let ids = [
            {zd1: '第一次称量', type: '3', father: res.result, reportNo: this.fromValiData.reportNo, order: 1},
            {zd1: '第一次称量', type: '3', father: res.result, reportNo: this.fromValiData.reportNo, order: 2},
            {zd1: '第二次称量', type: '3', father: res.result, reportNo: this.fromValiData.reportNo, order: 3},
            {zd1: '第二次称量', type: '3', father: res.result, reportNo: this.fromValiData.reportNo, order: 4}
          ]
          getOxcSaveDatas(ids).then(res => {}).then(res => {
            this.getListData_B()
          })
        }
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
    handleEdit_B(params) {
      let ids = {...params}
      ids.father = this.fromValiData.id
      ids.type = '3'
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
      }
    }
  },
  watch: {
    // 同路径路由跳转
    '$route': function (to, from) {
      this.fromValiData = {...this.$route.params}
      this.commonContent()
      this.tableData = []
      this.tableData_B = []
      this.getPointListData()
      if (this.fromValiData.id !== null) {
        this.getListData()
        this.getListData_B()
      }
    }
  },
  mounted () {
    this.fromValiData = {...this.$route.params}
    this.commonContent()

    this.getPointListData()
    if (this.fromValiData.id !== null) {
      this.getListData()
      this.getListData_B()
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
