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
import {getSamplingTaskQuerySampPointPage, getSamplingTaskQuerySampNoPage} from '@/api/sampling/sampTask.js'
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData} from '@/api/sampling/original.js'
import machineAllot from '@/views/sampling/checkTask/machine_allot.vue'
import {getDetectionQueryAllTarget} from '@/api/check/checkTask.js'
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
      fromItemList: [
        {label: '在线仪器型号及名称', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '编号', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系人及电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '生产厂家', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '使用单位', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '安装时间', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '参比方法仪器型号及名称', prop: 'zd7', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '编号', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd17', value: '', type: 'input', isRqd: true},
        {label: '生产厂家', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '使用单位', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '在线仪器测值单位(副表)', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '实验室测试结果单位(副表)', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '绝对误差单位(副表)', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '检控记录及采样人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd14', value: '', type: 'date', isRqd: true},
        {label: '检测指标', prop: 'zd16', value: '', type: 'select', isRqd: true, data: [], isNoClear: true, filterable: true},
        {label: '备注', prop: 'zd15', value: '', type: 'textarea', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd1',
        label: '次数',
        fixed: 'left',
        type: 'input',
        width: 70
      }, {
        prop: 'zd2',
        label: '采样点位及排污编号',
        type: 'input',
        width: 200
      }, {
        prop: 'zd50',
        label: '样品编号',
        type: 'input',
        width: 200
      }, {
        prop: 'zd4',
        label: '检控时间',
        type: 'datetime',
        width: 220
      }, {
        prop: 'zd5',
        label: '在线仪器测值()',
        type: 'input',
        width: 160
      }, {
        prop: 'zd6',
        label: '实验室测试结果()',
        type: 'input',
        width: 170
      }, {
        prop: 'zd7',
        label: '绝对误差()',
        type: 'input',
        width: 150
      }, {
        prop: 'zd8',
        label: '相对误差(%)',
        type: 'input',
        width: 110
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
          if (xdd.prop === 'zd16') {
            xdd.data = data
          }
        })
      })
    },
    // 获取选中的点位
    getPointValue(params) {
      this.pointValue = params
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
      let zd7 = ''
      let zd8 = ''
      let zd17 = ''
      data.forEach(xdd => {
        // 仪器名称及型号
        zd7 += xdd.name + xdd.machineXh + ';'
        // 仪器编号
        zd8 += xdd.machineNo + ';'
        // 有效期
        zd17 += xdd.yxrq + ';'
      })
      this.$set(this.fromValiData, 'zd7', zd7.substring(0, zd7.length - 1))
      this.$set(this.fromValiData, 'zd8', zd8.substring(0, zd8.length - 1))
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
    },
    // 双向绑定修改表头
    'fromValiData.zd11': {
      handler (newName, oldName) {
        if (newName === null || newName === undefined) {
          newName = ''
        }
        let obj = this.tableHeader.find(xdd => xdd.prop === 'zd5')
        obj.label = '在线仪器测值' + '(' + newName + ')'
      },
      immediate: true,
      deep: true
    },
    // 双向绑定修改表头
    'fromValiData.zd12': {
      handler (newName, oldName) {
        if (newName === null || newName === undefined) {
          newName = ''
        }
        let obj = this.tableHeader.find(xdd => xdd.prop === 'zd6')
        obj.label = '实验室测试结果' + '(' + newName + ')'
      },
      immediate: true,
      deep: true
    },
    // 双向绑定修改表头
    'fromValiData.zd13': {
      handler (newName, oldName) {
        if (newName === null || newName === undefined) {
          newName = ''
        }
        let obj = this.tableHeader.find(xdd => xdd.prop === 'zd7')
        obj.label = '绝对误差' + '(' + newName + ')'
      },
      immediate: true,
      deep: true
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
