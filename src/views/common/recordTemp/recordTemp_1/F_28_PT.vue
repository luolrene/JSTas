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
        {label: '接待人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '地址', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测项目', prop: 'zd49', value: '', type: 'textarea', isRqd: true, click: 'handleProject'},
        {label: '治理设施类型及名称', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '处理量（吨/日）— 设计', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '处理量（吨/日）— 实际', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '建设日期', prop: 'zd8', value: '', type: 'date', isRqd: true},
        {label: '处理规律', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: 'COD设计去除率', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '氨氮设计去除率', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '企业生产情况 — 建厂日期', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '新鲜用水量(吨/天)', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '回用水量(吨/天)', prop: 'zd14', value: '', type: 'input', isRqd: true},
        {label: '主要原料', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '主要产品', prop: 'zd16', value: '', type: 'input', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd17', value: '', type: 'date', isRqd: true},
        {label: '废(污)水主要来源', prop: 'zd20', value: '', type: 'input', isRqd: true},
        {label: '废(污)水主要去向', prop: 'zd22', value: '', type: 'input', isRqd: true},
        {label: '排放规律(以流速变化判断)',
          prop: 'zd21',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '连续稳定', name: '连续稳定'},
            {id: '连续不稳定', name: '连续不稳定'},
            {id: '间断稳定', name: '间断稳定'},
            {id: '间断不稳定', name: '间断不稳定'}
          ]},
        {label: '采样布点示意图', prop: 'zd18', value: '', type: 'draw', isRqd: true},
        {label: '备注', prop: 'zd19', value: '', type: 'textarea', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd50',
        label: '样品编号',
        fixed: 'left',
        type: 'input',
        width: 200
      }, {
        prop: 'zd2',
        label: '排污口名称及编号',
        type: 'input',
        width: 140
      }, {
        prop: 'zd3',
        label: '采样时间',
        type: 'datetime',
        width: 220
      }, {
        prop: 'zd4',
        label: '水温(℃)',
        type: 'input',
        width: 100
      }, {
        prop: 'zd5',
        label: 'pH',
        type: 'input',
        width: 80
      }, {
        label: '流量',
        data: [
          {
            prop: 'zd6',
            label: '(m³/h)',
            type: 'input',
            width: 70
          }, {
            prop: 'zd7',
            label: '(m³/d)',
            type: 'input',
            width: 70
          }
        ]
      }, {
        prop: 'zd8',
        label: '样品表观',
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
            this.tableData.push({id: null, zd50: xdd.sampNo, zd2: xdd.pointName + '—' + xdd.pointNo, edit: false})
          })
        })
      }
    },
    handleProject(params) {
      this.$layer.iframe({
        content: {
          content: projectList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNo: this.fromValiData.reportNo,
            isSelection: true
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
        this.fromValiData.zd1 = this.fromValiData.custName
        this.fromValiData.zd2 = this.fromValiData.contacts
        this.fromValiData.zd3 = this.fromValiData.contactsMobile
        if (this.fromValiData.address) {
          this.fromValiData.zd4 = this.fromValiData.address
        }
        this.$set(this.fromValiData, 'zd19', `1、治理设施运行情况和企业生产情况由委托单位提供；2、回用水量不含设施循环水部分。`)
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
