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
        {label: '联系人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '检测地点', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测类别', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '检测时间', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '检测方法', prop: 'zd48', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '检测依据', prop: 'zd47', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-名称及型号', prop: 'zd7', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '检测仪器-编号', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-检定日期', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '检测仪器-有效期至', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '校准仪器-名称及型号', prop: 'zd11', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '校准仪器-编号', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '校准仪器-检定日期', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '校准仪器-有效期至', prop: 'zd14', value: '', type: 'input', isRqd: true},
        {label: '仪器测量前后校准情况-测量前（dB）', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '仪器测量前后校准情况-测量后（dB）', prop: 'zd16', value: '', type: 'input', isRqd: true},
        {label: '测量结果有效性判定',
          prop: 'zd17',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '有效', name: '有效'},
            {id: '无效', name: '无效'}
          ]},
        {label: '测点编号', prop: 'zd18', value: '', type: 'input', isRqd: true},
        {label: '测定位置', prop: 'zd19', value: '', type: 'input', isRqd: true},
        {label: '环境背景噪声', prop: 'zd20', value: '', type: 'input', isRqd: true, append: 'dB'},
        {label: '气象条件-气温', prop: 'zd21', value: '', type: 'input', isRqd: true, append: '℃'},
        {label: '气象条件-湿度', prop: 'zd22', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '气象条件-风向', prop: 'zd23', value: '', type: 'input', isRqd: true},
        {label: '气象条件-风速', prop: 'zd24', value: '', type: 'input', isRqd: true, append: 'm/s'},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd25', value: '', type: 'date', isRqd: true},
        {label: '表头-Lwecpn和LEPN选择',
          prop: 'zd26',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: 'Lwecpn', name: 'Lwecpn'},
            {id: 'LEPN', name: 'LEPN'}
          ]}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd50',
        label: '样品编号',
        fixed: 'left',
        type: 'input',
        width: 200
      }, {
        prop: 'zd1',
        label: '检测时间(时 分 秒)',
        type: 'input',
        width: 200
      }, {
        prop: 'zd2',
        label: '飞行状态起降',
        type: 'input',
        width: 120
      }, {
        prop: 'zd3',
        label: '飞机型号',
        type: 'input',
        width: 120
      }, {
        prop: 'zd4',
        label: 'LAmax',
        type: 'input',
        width: 90
      }, {
        prop: 'zd5',
        label: '持续时间(s)',
        type: 'input',
        width: 120
      }, {
        prop: 'zd6',
        label: 'LEPN(dB)',
        type: 'input',
        width: 110
      }, {
        prop: 'zd7',
        label: '请先在主表选择表头',
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
      if (this.presentMachine === 'zd7') {
        let zd7 = ''
        let zd8 = ''
        let zd9 = ''
        let zd10 = ''
        data.forEach(xdd => {
          // 仪器名称及型号
          zd7 += xdd.name + xdd.machineXh + ';'
          // 仪器编号
          zd8 += xdd.machineNo + ';'
          // 仪器检定日期
          zd9 += xdd.jzrq + ';'
          // 有效期
          zd10 += xdd.yxrq + ';'
        })
        this.$set(this.fromValiData, 'zd7', zd7.substring(0, zd7.length - 1))
        this.$set(this.fromValiData, 'zd8', zd8.substring(0, zd8.length - 1))
        this.$set(this.fromValiData, 'zd9', zd9.substring(0, zd9.length - 1))
        this.$set(this.fromValiData, 'zd10', zd10.substring(0, zd10.length - 1))
      } else if (this.presentMachine === 'zd11') {
        let zd11 = ''
        let zd12 = ''
        let zd13 = ''
        let zd14 = ''
        data.forEach(xdd => {
          // 校准仪器名称及型号
          zd11 += xdd.name + xdd.machineXh + ';'
          // 校准仪器编号
          zd12 += xdd.machineNo + ';'
          // 校准仪器检定日期
          zd13 += xdd.jzrq + ';'
          // 有效期
          zd14 += xdd.yxrq + ';'
        })
        this.$set(this.fromValiData, 'zd11', zd11.substring(0, zd11.length - 1))
        this.$set(this.fromValiData, 'zd12', zd12.substring(0, zd12.length - 1))
        this.$set(this.fromValiData, 'zd13', zd13.substring(0, zd13.length - 1))
        this.$set(this.fromValiData, 'zd14', zd14.substring(0, zd14.length - 1))
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
    },
    // 双向绑定修改表头
    'fromValiData.zd26': {
      handler (newName, oldName) {
        if (newName === null || newName === undefined) {
          newName = '请先在主表选择表头'
        }
        let obj = this.tableHeader.find(xdd => xdd.prop === 'zd7')
        obj.label = newName
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
