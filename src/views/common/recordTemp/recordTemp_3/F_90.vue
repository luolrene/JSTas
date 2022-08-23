<!-- 无样品编号 -->
<template>
  <homeRecord
    ref="homeRecord"
    :obj="this"
    :fromValiData="fromValiData"
    :pointListData="pointListData"
    :hasSelect="false"
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
    :isOrder="true"
    @getCellClick="getCellClick"></tableRecord>
  </homeRecord>
</template>

<script>
import projectList from '@/views/common/project_list.vue'
import machineAllot from '@/views/sampling/checkTask/machine_allot.vue'
import {getSamplingTaskQuerySampPointPage} from '@/api/sampling/sampTask.js'
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
        {label: '接待人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '测量地点', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-名称', prop: 'zd5', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '检测仪器-型号', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-编号', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-有效期至', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '线路条件', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '地质情况', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '建筑物类型', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '车辆类型及编组', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '检测方法', prop: 'zd48', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '检测依据', prop: 'zd47', value: '', type: 'input', isRqd: true},
        {label: '列车运行速度/km/h', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '报告日期', prop: 'zd14', value: '', type: 'date', isRqd: true},
        {label: '测点与线路的位置关系图示或描述', prop: 'zd15', value: '', type: 'textarea', isRqd: true},
        {label: '备注', prop: 'zd16', value: '', type: 'textarea', isRqd: true},
        {label: '备注2', prop: 'zd17', value: '', type: 'textarea', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd1',
        label: '序号',
        fixed: 'left',
        type: 'input',
        width: 60
      }, {
        prop: 'zd2',
        label: '时间',
        type: 'input',
        width: 190
      }, {
        prop: 'zd3',
        label: '编组',
        type: 'input',
        width: 100
      }, {
        prop: 'zd4',
        label: '近/远轨',
        type: 'input',
        width: 100
      }, {
        prop: 'zd5',
        label: 'VLmax(dB)',
        type: 'input',
        width: 110
      }, {
        prop: 'zd6',
        label: '备注',
        type: 'input',
        width: 200
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
      // 检测方法
      this.$set(this.fromValiData, 'zd48', params.checkFun)
      // 检测依据
      this.$set(this.fromValiData, 'zd47', params.funFrom)
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
      let zd5 = ''
      let zd6 = ''
      let zd7 = ''
      let zd8 = ''
      data.forEach(xdd => {
        // 仪器名称
        zd5 += xdd.name + ';'
        // 仪器型号
        zd6 += xdd.machineXh + ';'
        // 仪器编号
        zd7 += xdd.machineNo + ';'
        // 有效期
        zd8 += xdd.yxrq + ';'
      })
      this.$set(this.fromValiData, 'zd5', zd5.substring(0, zd5.length - 1))
      this.$set(this.fromValiData, 'zd6', zd6.substring(0, zd6.length - 1))
      this.$set(this.fromValiData, 'zd7', zd7.substring(0, zd7.length - 1))
      this.$set(this.fromValiData, 'zd8', zd8.substring(0, zd8.length - 1))
    },
    // 新建副表
    handleAdd() {
      this.tableData.unshift({id: null, zd1: '', edit: true})
    },
    handleSave() {
      this.$refs.homeRecord.loading_save = true
      let ids = {...this.fromValiData}
      if (Array.isArray(ids.zd50) && ids.zd50.length > 0) {
        ids.zd50 = ids.zd50.join(',')
      }
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
        this.getListData()
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
          // this.getListData()
        })
      }
    },
    // 相同路由和不同路由进入时候的交集
    commonContent() {
      if (this.fromValiData.id === null) {
        this.fromValiData.zd1 = this.fromValiData.custName
        this.fromValiData.zd2 = this.fromValiData.contacts
        this.fromValiData.zd3 = this.fromValiData.contactsMobile
        this.fromValiData.zd4 = this.fromValiData.address
      }
      if (this.fromValiData.zd50 !== undefined && this.fromValiData.zd50 !== null && this.fromValiData.zd50 !== '') {
        this.fromValiData.zd50 = this.fromValiData.zd50.split(',')
      }
    }
  },
  watch: {
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
    if (this.fromValiData.operName !== null && this.fromValiData.operName !== '' && this.fromValiData.operName !== undefined) {
      let operNameData = this.fromValiData.operName.split(',')
      this.fromItemList.forEach(xdd => {
        if (xdd.prop === 'zd50') {
          operNameData.forEach(arc => {
            xdd.data.push({
              id: arc,
              name: arc
            })
          })
        }
      })
    }

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
