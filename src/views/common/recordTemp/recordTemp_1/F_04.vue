<template>
  <homeRecord
    ref="homeRecord"
    :fromValiData="fromValiData"
    :pointListData="pointListData"
    :hasSelect="false"
    :hasPoint="false"
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
      pointListData: [], // 报告任务下的点位数据
      pointValue: '', // 选中的点位
      fromItemList: [
        {label: '报告编号', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '检测人员是否持证上岗',
          prop: 'zd2',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '现场采样的检测方法选用是否正确',
          prop: 'zd3',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '检测依据是否正确',
          prop: 'zd4',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '检测仪器设备是否在计量检定/校准有效期内使用',
          prop: 'zd5',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '现场质控措施和质控结果是否符合要求',
          prop: 'zd6',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '是否按业务通知单要求的项目完成检测',
          prop: 'zd7',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '是', name: '是'},
            {id: '否', name: '否'}
          ]},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测时间', prop: 'zd10', value: '', type: 'date', isRqd: true},
        {label: '异常反馈', prop: 'zd8', value: '', type: 'textarea', isRqd: true},
        {label: '备注', prop: 'zd9', value: '', type: 'textarea', isRqd: true}
      ]
    }
  },
  methods: {
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
    // 同路径路由跳转
    '$route': function (to, from) {
      this.fromValiData = {...this.$route.params}
      this.fromValiData.zd1 = this.fromValiData.reportNo
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
