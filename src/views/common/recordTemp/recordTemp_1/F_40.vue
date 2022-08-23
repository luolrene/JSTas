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
      presentMachine: '', // 当要选择不同类型仪器的时候使用
      pointValue: '', // 选中的点位
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '接待人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '检测地点', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测方法', prop: 'zd48', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '检测依据', prop: 'zd47', value: '', type: 'input', isRqd: true},
        {label: '仪器测量前后校准情况-测量前', prop: 'zd5', value: '', type: 'input', isRqd: true, append: 'dB'},
        {label: '仪器测量前后校准情况-测量后', prop: 'zd6', value: '', type: 'input', isRqd: true, append: 'dB'},
        {label: '检测仪器名称', prop: 'zd7', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '检测仪器型号', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '检测仪器编号', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '校准仪器名称', prop: 'zd11', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '校准仪器型号', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '校准仪器编号', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '有效期至', prop: 'zd14', value: '', type: 'input', isRqd: true},
        {label: '气象条件雨雪',
          prop: 'zd15',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '有', name: '有'},
            {id: '无', name: '无'}
          ]},
        {label: '气象条件雷电',
          prop: 'zd16',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '有', name: '有'},
            {id: '无', name: '无'}
          ]},
        {label: '气象条件风速',
          prop: 'zd17',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '无', name: '无'},
            {id: '小于5m/s', name: '小于5m/s'},
            {id: '大于5m/s', name: '大于5m/s'}
          ]},
        {label: '测量结果有效性判定',
          prop: 'zd18',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '有效', name: '有效'},
            {id: '无效', name: '无效'}
          ]},
        {label: '功能区类别', prop: 'zd19', value: '', type: 'input', isRqd: true},
        {label: '检测工况', prop: 'zd20', value: '', type: 'input', isRqd: true},
        {label: '主要声源', prop: 'zd21', value: '', type: 'input', isRqd: true},
        {label: '住宅形式',
          prop: 'zd22',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '独立', name: '独立'},
            {id: '联体', name: '联体'}
          ]},
        {label: '第几层', prop: 'zd23', value: '', type: 'input', isRqd: true},
        {label: '共几层', prop: 'zd24', value: '', type: 'input', isRqd: true},
        {label: '房间类型',
          prop: 'zd25',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '客厅', name: '客厅'},
            {id: '卧室', name: '卧室'},
            {id: '书房', name: '书房'},
            {id: '其他', name: '其他'}
          ]},
        {label: '噪声感觉强烈的位置',
          prop: 'zd26',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '靠近墙', name: '靠近墙'},
            {id: '房间中间', name: '房间中间'},
            {id: '靠近楼板', name: '靠近楼板'},
            {id: '其他', name: '其他'}
          ]},
        {label: '时间周期',
          prop: 'zd27',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '连续', name: '连续'},
            {id: '短时', name: '短时'},
            {id: '变化', name: '变化'}
          ]},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true}, {label: '检测日期', prop: 'zd29', value: '', type: 'date', isRqd: true},
        {label: '检测示意图', prop: 'zd28', value: '', type: 'draw', isRqd: true},
        {label: '备注', prop: 'zd30', value: '', type: 'textarea', isRqd: true},
        {label: '备注2', prop: 'zd31', value: '', type: 'textarea', isRqd: true}
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
        label: '测点编号',
        type: 'input',
        width: 190
      }, {
        prop: 'zd2',
        label: '检测时间',
        type: 'input',
        width: 190
      }, {
        prop: 'zd3',
        label: '值类型',
        type: 'input',
        width: 120
      }, {
        label: 'A声级dB（A）',
        data: [
          {
            prop: 'zd4',
            label: 'Leq',
            type: 'input',
            width: 90
          }, {
            prop: 'zd5',
            label: 'Lmax',
            type: 'input',
            width: 80
          }
        ]
      }, {
        label: '倍频带声压级  （dB）',
        data: [
          {
            prop: 'zd6',
            label: '31.5Hz',
            type: 'input',
            width: 80
          }, {
            prop: 'zd7',
            label: '63Hz',
            type: 'input',
            width: 80
          }, {
            prop: 'zd8',
            label: '125Hz',
            type: 'input',
            width: 80
          }, {
            prop: 'zd9',
            label: '250Hz',
            type: 'input',
            width: 80
          }, {
            prop: 'zd10',
            label: '500Hz',
            type: 'input',
            width: 80
          }
        ]
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
          // 仪器名称
          zd7 += xdd.name + ';'
          // 仪器型号
          zd8 += xdd.machineNo + ';'
          // 仪器编号
          zd9 += xdd.machineNo + ';'
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
          // 仪器名称
          zd11 += xdd.name + ';'
          // 仪器型号
          zd12 += xdd.machineNo + ';'
          // 仪器编号
          zd13 += xdd.machineNo + ';'
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
        this.tableData.push({id: null, zd3: '测量值', edit: true})
        this.tableData.push({id: null, zd3: '背景值', edit: true})
        this.tableData.push({id: null, zd3: '修正结果', edit: true})
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
            this.tableData.push({id: null, zd1: xdd.pointNo, zd50: xdd.sampNo, zd3: '测量值', edit: true})
            this.tableData.push({id: null, zd1: xdd.pointNo, zd50: xdd.sampNo, zd3: '背景值', edit: true})
            this.tableData.push({id: null, zd1: xdd.pointNo, zd50: xdd.sampNo, zd3: '修正结果', edit: true})
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
        this.$set(this.fromValiData, 'zd31', `噪声测量值依据《环境噪声检测技术规范 噪声测量值修正（HJ 706-2014）》进行修正。`)
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
