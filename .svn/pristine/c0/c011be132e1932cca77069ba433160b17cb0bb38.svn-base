<template>
  <homeRecord
    ref="homeRecord"
    :obj="this"
    :fromValiData="fromValiData"
    :hasPoint="false"
    :hasSelect="false"
    :hasBatchSave="false"
    @handleSave="handleSave">
    <fromRecord
      ref="fromRecord"
      :obj="this"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"></fromRecord>
  </homeRecord>
</template>

<script>
import projectList from '@/views/common/project_list.vue'
import {getOxcAddOrModifyData} from '@/api/sampling/original.js'
export default {
  inject: [
    'reload'
  ],
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        fileName: ''
        // type:'' 1通用 2列表
      },
      presentMachine: '', // 当要选择不同类型仪器的时候使用
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '接待人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '地址', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测项目', prop: 'zd49', value: '', type: 'textarea', isRqd: true, click: 'handleProject'},
        {label: '测定位置', prop: 'zd5', value: '', type: 'input', isRqd: true},
        {label: '锅炉（窑炉、设备）型号及名称', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '安装时间', prop: 'zd7', value: '', type: 'datetime', isRqd: true},
        {label: '额定蒸发量', prop: 'zd8', value: '', type: 'input', isRqd: true, append: 't/h'},
        {label: '燃烧方式', prop: 'zd9', value: '', type: 'input', isRqd: true},
        {label: '燃料名称种类', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '每月用量', prop: 'zd11', value: '', type: 'input', isRqd: true, append: 't'},
        {label: '运转时间', prop: 'zd12', value: '', type: 'input', isRqd: true, append: '时/年'},
        {label: '煤灰分含量', prop: 'zd13', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '煤含硫量', prop: 'zd14', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘设备名称及型号', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '设计除尘效率', prop: 'zd16', value: '', type: 'input', isRqd: true},
        {label: '环评批复时间', prop: 'zd17', value: '', type: 'input', isRqd: true},
        {label: '脱硫设备名称及型号', prop: 'zd18', value: '', type: 'input', isRqd: true},
        {label: '设计脱硫效率', prop: 'zd19', value: '', type: 'input', isRqd: true},
        {label: '环评批复时间', prop: 'zd20', value: '', type: 'input', isRqd: true},
        {label: '脱硝设备名称及型号', prop: 'zd21', value: '', type: 'input', isRqd: true},
        {label: '设计脱硝效率', prop: 'zd22', value: '', type: 'input', isRqd: true},
        {label: '环评批复时间', prop: 'zd23', value: '', type: 'input', isRqd: true},
        {label: '净化装置名称及型号', prop: 'zd24', value: '', type: 'input', isRqd: true},
        {label: '设计除尘效率', prop: 'zd25', value: '', type: 'input', isRqd: true},
        {label: '设计净化效率', prop: 'zd26', value: '', type: 'input', isRqd: true},
        {label: '鼓风机额定风量', prop: 'zd27', value: '', type: 'input', isRqd: true, append: 'm³/h'},
        {label: '引风机额定风量', prop: 'zd28', value: '', type: 'input', isRqd: true, append: 'm³/h'},
        {label: '负荷记录-耗水量', prop: 'zd29', value: '', type: 'input', isRqd: true},
        {label: '负荷记录-耗煤量', prop: 'zd30', value: '', type: 'input', isRqd: true},
        {label: '负荷记录-平均蒸发量', prop: 'zd31', value: '', type: 'input', isRqd: true, append: 't/h'},
        {label: '负荷记录-蒸汽压力MPa', prop: 'zd32', value: '', type: 'input', isRqd: true},
        {label: '负荷记录-运行负荷', prop: 'zd33', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '负荷记录-出力影响系数K', prop: 'zd34', value: '', type: 'input', isRqd: true},
        {label: '排气筒编号', prop: 'zd51', value: '', type: 'input', isRqd: true},
        {label: '排气筒高度', prop: 'zd64', value: '', type: 'input', isRqd: true, append: 'm'},
        {label: '排气筒面积', prop: 'zd41', value: '', type: 'input', isRqd: true, append: '㎡'},
        {label: '除尘效率η1', prop: 'zd52', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η1', prop: 'zd53', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η1', prop: 'zd54', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η1', prop: 'zd55', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘效率η2', prop: 'zd56', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η2', prop: 'zd57', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η2', prop: 'zd58', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η2', prop: 'zd59', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘效率η3', prop: 'zd60', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η3', prop: 'zd61', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η3', prop: 'zd62', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η3', prop: 'zd63', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘效率η1′', prop: 'zd65', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η1′', prop: 'zd66', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η1′', prop: 'zd67', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η1′', prop: 'zd68', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘效率η2′', prop: 'zd69', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η2′', prop: 'zd70', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η2′', prop: 'zd71', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η2′', prop: 'zd72', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '除尘效率η3′', prop: 'zd73', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硫效率η3′', prop: 'zd74', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '脱硝效率η3′', prop: 'zd75', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '净化效率η3′', prop: 'zd76', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测日期', prop: 'zd36', value: '', type: 'date', isRqd: true},
        {label: '测点示意图', prop: 'zd35', value: '', type: 'draw', isRqd: true},
        {label: '备注', prop: 'zd37', value: '', type: 'textarea', isRqd: true}
      ]
    }
  },
  methods: {
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
      ids.zd40 =
      ids.zd51 + ',' +
      ids.zd52 + ',' +
      ids.zd53 + ',' +
      ids.zd54 + ',' +
      ids.zd55 + ',' +
      ids.zd56 + ',' +
      ids.zd57 + ',' +
      ids.zd58 + ',' +
      ids.zd59 + ',' +
      ids.zd60 + ',' +
      ids.zd61 + ',' +
      ids.zd62 + ',' +
      ids.zd63 + ',' +
      ids.zd64 + ',' +
      ids.zd65 + ',' +
      ids.zd66 + ',' +
      ids.zd67 + ',' +
      ids.zd68 + ',' +
      ids.zd69 + ',' +
      ids.zd70 + ',' +
      ids.zd71 + ',' +
      ids.zd72 + ',' +
      ids.zd73 + ',' +
      ids.zd74 + ',' +
      ids.zd75 + ',' +
      ids.zd76
      this.fromValiData.zd40 = ids.zd40
      getOxcAddOrModifyData(ids).then(res => {
        this.$share.message()
        this.$refs.homeRecord.loading_save = false
        this.reload()
        this.fromValiData.id = res.result
        // 表头保存成功后 跳转到当前保存的路由 不然还是在新建页面
        this.$router.push({name: this.fromValiData.fileNo, params: this.fromValiData})
      })
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
      if (this.fromValiData.zd40 === undefined) {
        this.$set(this.fromValiData, 'zd51', '')
        this.$set(this.fromValiData, 'zd52', '')
        this.$set(this.fromValiData, 'zd53', '')
        this.$set(this.fromValiData, 'zd54', '')
        this.$set(this.fromValiData, 'zd55', '')
        this.$set(this.fromValiData, 'zd56', '')
        this.$set(this.fromValiData, 'zd57', '')
        this.$set(this.fromValiData, 'zd58', '')
        this.$set(this.fromValiData, 'zd59', '')
        this.$set(this.fromValiData, 'zd60', '')
        this.$set(this.fromValiData, 'zd61', '')
        this.$set(this.fromValiData, 'zd62', '')
        this.$set(this.fromValiData, 'zd63', '')
        this.$set(this.fromValiData, 'zd64', '')
        this.$set(this.fromValiData, 'zd65', '')
        this.$set(this.fromValiData, 'zd66', '')
        this.$set(this.fromValiData, 'zd67', '')
        this.$set(this.fromValiData, 'zd68', '')
        this.$set(this.fromValiData, 'zd69', '')
        this.$set(this.fromValiData, 'zd70', '')
        this.$set(this.fromValiData, 'zd71', '')
        this.$set(this.fromValiData, 'zd72', '')
        this.$set(this.fromValiData, 'zd73', '')
        this.$set(this.fromValiData, 'zd74', '')
        this.$set(this.fromValiData, 'zd75', '')
        this.$set(this.fromValiData, 'zd76', '')
      } else {
        let data = this.fromValiData.zd40.split(',')
        this.$set(this.fromValiData, 'zd51', data[0])
        this.$set(this.fromValiData, 'zd52', data[1])
        this.$set(this.fromValiData, 'zd53', data[2])
        this.$set(this.fromValiData, 'zd54', data[3])
        this.$set(this.fromValiData, 'zd55', data[4])
        this.$set(this.fromValiData, 'zd56', data[5])
        this.$set(this.fromValiData, 'zd57', data[6])
        this.$set(this.fromValiData, 'zd58', data[7])
        this.$set(this.fromValiData, 'zd59', data[8])
        this.$set(this.fromValiData, 'zd60', data[9])
        this.$set(this.fromValiData, 'zd61', data[10])
        this.$set(this.fromValiData, 'zd62', data[11])
        this.$set(this.fromValiData, 'zd63', data[12])
        this.$set(this.fromValiData, 'zd64', data[13])
        this.$set(this.fromValiData, 'zd65', data[14])
        this.$set(this.fromValiData, 'zd66', data[15])
        this.$set(this.fromValiData, 'zd67', data[16])
        this.$set(this.fromValiData, 'zd68', data[17])
        this.$set(this.fromValiData, 'zd69', data[18])
        this.$set(this.fromValiData, 'zd70', data[19])
        this.$set(this.fromValiData, 'zd71', data[20])
        this.$set(this.fromValiData, 'zd72', data[21])
        this.$set(this.fromValiData, 'zd73', data[22])
        this.$set(this.fromValiData, 'zd74', data[23])
        this.$set(this.fromValiData, 'zd75', data[24])
        this.$set(this.fromValiData, 'zd76', data[25])
      }
    }
  },
  watch: {
    '$route': function (to, from) {
      this.fromValiData = {...this.$route.params}
      this.commonContent()
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
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
