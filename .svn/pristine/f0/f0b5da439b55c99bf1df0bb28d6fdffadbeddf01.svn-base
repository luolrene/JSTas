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
    <F98Son :params="fromValiData"></F98Son>
  </homeRecord>
</template>

<script>
import projectList from '@/views/common/project_list.vue'
import machineAllot from '@/views/sampling/checkTask/machine_allot.vue'
import F98Son from '../F_98_son.vue'
import {getSamplingTaskQuerySampPointPage, getSamplingTaskQuerySampNoPage} from '@/api/sampling/sampTask.js'
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData} from '@/api/sampling/original.js'
import {getDetectionQueryAllTarget} from '@/api/check/checkTask.js'
export default {
  inject: [
    'reload'
  ],
  components: {
    F98Son
  },
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
      fromItemList: [
        {label: 'CEMS型号及名称', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '编号', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系人及电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: 'CEMS生产厂家', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '安装时间', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '生产厂家', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(备注信息)', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '型号', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '出厂编号', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '在线方法原理', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '使用单位', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '测试位置', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '参比方法仪器名称', prop: 'zd14', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '参比方法仪器型号', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '仪器编号', prop: 'zd16', value: '', type: 'input', isRqd: true},
        {label: '有效期', prop: 'zd17', value: '', type: 'input', isRqd: true},
        {label: '生产厂家', prop: 'zd18', value: '', type: 'input', isRqd: true},
        {label: '污染物计量单位', prop: 'zd19', value: '', type: 'input', isRqd: true},
        {label: '参比方法原理', prop: 'zd48', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '参比方法检测依据', prop: 'zd47', value: '', type: 'input', isRqd: true},
        {label: '绝对误差', prop: 'zd20', value: '', type: 'input', isRqd: true},
        {label: '相对误差', prop: 'zd21', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '相对准确度', prop: 'zd22', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '标气值单位(副表)', prop: 'zd25', value: '', type: 'input', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd23', value: '', type: 'input', isRqd: true},
        {label: '检测指标', prop: 'zd24', value: '', type: 'select', isRqd: true, data: [], isNoClear: true, filterable: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd50',
        label: '样品编号',
        fixed: 'left',
        type: 'input',
        width: 160
      }, {
        prop: 'zd2',
        label: '测试时间',
        type: 'input',
        width: 160
      }, {
        prop: 'zd3',
        label: 'CEMS法',
        type: 'input',
        width: 160
      }, {
        prop: 'zd4',
        label: '参比方法',
        type: 'input',
        width: 160
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
    getTragetListData() {
      let ids = {}
      ids.reportNo = this.fromValiData.reportNo
      getDetectionQueryAllTarget(ids).then(res => {
        let data = []
        res.result.forEach(xdd => {
          data.push({id: xdd, name: xdd})
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'zd24') {
            xdd.data = data
          }
        })
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
      let zd14 = ''
      let zd15 = ''
      let zd16 = ''
      let zd17 = ''
      data.forEach(xdd => {
        // 仪器名称
        zd14 += xdd.name + ';'
        // 仪器型号
        zd15 += xdd.machineXh + ';'
        // 仪器编号
        zd16 += xdd.machineNo + ';'
        // 有效期
        zd17 += xdd.yxrq + ';'
      })
      this.$set(this.fromValiData, 'zd14', zd14.substring(0, zd14.length - 1))
      this.$set(this.fromValiData, 'zd15', zd15.substring(0, zd15.length - 1))
      this.$set(this.fromValiData, 'zd16', zd16.substring(0, zd16.length - 1))
      this.$set(this.fromValiData, 'zd17', zd17.substring(0, zd17.length - 1))
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
          // this.getListData()
        })
      }
    },
    // 相同路由和不同路由进入时候的交集
    commonContent() {
      if (this.fromValiData.id === null) {
        this.fromValiData.zd3 = this.fromValiData.contacts + '-' + this.fromValiData.contactsMobile
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
    this.getTragetListData()
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
