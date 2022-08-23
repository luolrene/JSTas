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
      fromItemList: [
        {label: 'CEMS名称', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: 'CEMS型号', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '编号', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '联系人及电话', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: 'CEMS生产厂家', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '安装时间', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '使用单位', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '测试位置', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(颗粒物)', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '型号', prop: 'zd10', value: '', type: 'input', isRqd: true},

        {label: '出厂编号', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(温度)', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '型号', prop: 'zd14', value: '', type: 'input', isRqd: true},
        {label: '出厂编号', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd16', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(流速)', prop: 'zd17', value: '', type: 'input', isRqd: true},
        {label: '型号', prop: 'zd18', value: '', type: 'input', isRqd: true},
        {label: '出厂编号', prop: 'zd19', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd20', value: '', type: 'input', isRqd: true},

        {label: '生产厂家(湿度)', prop: 'zd21', value: '', type: 'input', isRqd: true},
        {label: '型号', prop: 'zd22', value: '', type: 'input', isRqd: true},
        {label: '出厂编号', prop: 'zd23', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd24', value: '', type: 'input', isRqd: true},
        {label: '参比方法仪器型号及名称', prop: 'zd25', value: '', type: 'input', isRqd: true, click: 'handleMachine'},
        {label: '编号', prop: 'zd26', value: '', type: 'input', isRqd: true},
        {label: '生产厂家', prop: 'zd27', value: '', type: 'input', isRqd: true},
        {label: '有效期', prop: 'zd28', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(颗粒物)', prop: 'zd29', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd30', value: '', type: 'input', isRqd: true},

        {label: '生产厂家(温度)', prop: 'zd31', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd32', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(流速)', prop: 'zd33', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd34', value: '', type: 'input', isRqd: true},
        {label: '生产厂家(湿度)', prop: 'zd35', value: '', type: 'input', isRqd: true},
        {label: '原理', prop: 'zd36', value: '', type: 'input', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd37', value: '', type: 'date', isRqd: true},
        {label: '颗粒物相对误差', prop: 'zd38', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '颗粒物绝对误差', prop: 'zd39', value: '', type: 'input', isRqd: true, append: 'mg/m³'},
        {label: '流速相对误差', prop: 'zd40', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '温度绝对误差', prop: 'zd41', value: '', type: 'input', isRqd: true, append: '℃'},
        {label: '湿度绝对误差(参比方法测量值≤5%时)', prop: 'zd42', value: '', type: 'input', isRqd: true},
        {label: '湿度相对误差(参比方法测量值＞5%时)', prop: 'zd43', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'zd44', value: '', type: 'textarea', isRqd: true}
      ],

      tableData: [],

      tableHeader: [{
        prop: 'zd1',
        label: '测试时间',
        fixed: 'left',
        type: 'input',
        width: 190
      }, {
        label: 'CEMS法',
        data: [
          {
            prop: 'zd50',
            label: '样品编号（滤筒编号）',
            type: 'input',
            width: 200
          }, {
            prop: 'zd3',
            label: '浓度mg/m³',
            type: 'input',
            width: 110
          }, {
            prop: 'zd4',
            label: '流速m/s',
            type: 'input',
            width: 100
          }, {
            prop: 'zd5',
            label: '温度℃',
            type: 'input',
            width: 100
          }, {
            prop: 'zd6',
            label: '湿度%',
            type: 'input',
            width: 100
          }
        ]
      }, {
        label: '参比方法',
        data: [
          {
            prop: 'zd7',
            label: '增重g',
            type: 'input',
            width: 70
          }, {
            prop: 'zd8',
            label: '标态体积L',
            type: 'input',
            width: 100
          }, {
            prop: 'zd9',
            label: '浓度mg/m³',
            type: 'input',
            width: 100
          }, {
            prop: 'zd10',
            label: '流速m/s',
            type: 'input',
            width: 90
          }, {
            prop: 'zd11',
            label: '温度℃',
            type: 'input',
            width: 70
          }, {
            prop: 'zd12',
            label: '湿度%',
            type: 'input',
            width: 70
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
      let zd25 = ''
      let zd26 = ''
      let zd28 = ''
      data.forEach(xdd => {
        // 仪器名称
        zd25 += xdd.name + xdd.machineXh + ';'
        // 仪器编号
        zd26 += xdd.machineNo + ';'
        // 有效期
        zd28 += xdd.yxrq + ';'
      })
      this.$set(this.fromValiData, 'zd25', zd25.substring(0, zd25.length - 1))
      this.$set(this.fromValiData, 'zd26', zd26.substring(0, zd26.length - 1))
      this.$set(this.fromValiData, 'zd28', zd28.substring(0, zd28.length - 1))
    },
    // 新建副表
    handleAdd() {
      // 如果未选择点位
      if (this.pointValue === '') {
        this.tableData.push({id: null, zd1: ':  ——  :', zd50: '', edit: true})
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
            this.tableData.push({id: null, zd1: '： ——  ：', zd50: xdd.sampNo, edit: false})
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
        this.fromValiData.zd4 = this.fromValiData.contacts + '-' + this.fromValiData.contactsMobile
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
