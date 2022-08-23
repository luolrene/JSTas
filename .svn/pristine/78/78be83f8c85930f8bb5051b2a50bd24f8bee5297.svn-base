<!-- 无样品编号 -->
<template>
  <homeRecord
    ref="homeRecord"
    :obj="this"
    :fromValiData="fromValiData"
    :pointListData="pointListData"
    @handleAdd="handleAdd"
    @handleSave="handleSave"
    :hasSelect="false">
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
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '观测日期', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '设备名称', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '治理设施', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测仪器名称', prop: 'zd5', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '检测仪器型号', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '检测仪器编号', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '检测方法', prop: 'zd48', value: '', type: 'input', isRqd: true, click: 'handleProject'},
        {label: '检测依据', prop: 'zd47', value: '', type: 'input', isRqd: true},
        {label: '烟囱距离', prop: 'zd8', value: '', type: 'input', isRqd: true, append: 'm'},
        {label: '烟囱所在方向', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '烟囱高度', prop: 'zd10', value: '', type: 'input', isRqd: true, append: 'm'},
        {label: '烟囱出口形状', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '风向', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '风速', prop: 'zd13', value: '', type: 'input', isRqd: true, append: 'm/s'},
        {label: '天气状况',
          prop: 'zd14',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '晴朗', name: '晴朗'},
            {id: '少云', name: '少云'},
            {id: '多云', name: '多云'},
            {id: '阴天', name: '阴天'}
          ]},
        {label: '烟羽背景',
          prop: 'zd15',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '无云', name: '无云'},
            {id: '薄云', name: '薄云'},
            {id: '白云', name: '白云'},
            {id: '灰云', name: '灰云'}
          ]},
        {label: '备注', prop: 'zd16', value: '', type: 'textarea', isRqd: true},
        {label: '观测开始时间-时', prop: 'zd17', value: '', type: 'input', isRqd: true, append: '时'},
        {label: '观测开始时间-分', prop: 'zd18', value: '', type: 'input', isRqd: true, append: '分'},
        {label: '观测结束时间-时', prop: 'zd19', value: '', type: 'input', isRqd: true, append: '时'},
        {label: '观测结束时间-分', prop: 'zd20', value: '', type: 'input', isRqd: true, append: '分'},
        {label: '观测值5级', prop: 'zd21', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd22', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '观测值≥4级', prop: 'zd23', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd24', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '观测值≥3级', prop: 'zd25', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd26', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '观测值≥2级', prop: 'zd27', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd28', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '观测值≥1级', prop: 'zd29', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd30', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '观测值<1级', prop: 'zd31', value: '', type: 'input', isRqd: true, append: '次'},
        {label: '累计时间', prop: 'zd32', value: '', type: 'input', isRqd: true, append: '分钟'},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '报告日期', prop: 'zd33', value: '', type: 'date', isRqd: true},
        {label: '样品编号', prop: 'zd35', value: '', type: 'input', isRqd: true},
        {label: '烟气黑度（林格曼级）', prop: 'zd34', value: '', type: 'textarea', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd1',
        label: '时间(分\\秒)',
        fixed: 'left',
        type: 'input',
        width: 200
      }, {
        prop: 'zd2',
        label: '0',
        type: 'input',
        width: 120
      }, {
        prop: 'zd3',
        label: '15',
        type: 'input',
        width: 120
      }, {
        prop: 'zd4',
        label: '30',
        type: 'input',
        width: 120
      }, {
        prop: 'zd5',
        label: '45',
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
      let zd5 = ''
      let zd6 = ''
      let zd7 = ''
      data.forEach(xdd => {
        // 仪器名称
        zd5 += xdd.name + ';'
        // 仪器型号
        zd6 += xdd.machineXh + ';'
        // 仪器编号
        zd7 += xdd.machineNo + ';'
      })
      this.$set(this.fromValiData, 'zd5', zd5.substring(0, zd5.length - 1))
      this.$set(this.fromValiData, 'zd6', zd6.substring(0, zd6.length - 1))
      this.$set(this.fromValiData, 'zd7', zd7.substring(0, zd7.length - 1))
    },
    // 新建副表
    handleAdd() {
      if (this.tableData.length === 0) {
        for (let i = 0; i < 30; i++) {
          this.tableData.push({id: null, zd1: i, zd2: 0, zd3: 0, zd4: 0, zd5: 0, edit: true})
        }
      } else {
        this.tableData.push({id: null, zd1: this.tableData.length, zd2: 0, zd3: 0, zd4: 0, zd5: 0, edit: true})
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
