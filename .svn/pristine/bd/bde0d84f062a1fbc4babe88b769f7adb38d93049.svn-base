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
        {label: '单位名称', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '建厂日期', prop: 'zd2', value: '', type: 'date', isRqd: true},
        {label: '曾用名', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '单位所在地址', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '联系人', prop: 'zd6', value: '', type: 'input', isRqd: true},
        {label: '电话', prop: 'zd7', value: '', type: 'input', isRqd: true},
        {label: '企业法人', prop: 'zd8', value: '', type: 'input', isRqd: true},
        {label: '所属行业', prop: 'zd9', value: '', type: 'input', isRqd: true},

        {label: '主要原料', prop: 'zd10', value: '', type: 'input', isRqd: true},
        {label: '主要产品', prop: 'zd11', value: '', type: 'input', isRqd: true},
        {label: '年设计生产量', prop: 'zd12', value: '', type: 'input', isRqd: true},
        {label: '年设计生产天数', prop: 'zd13', value: '', type: 'input', isRqd: true},
        {label: '日设计生产量', prop: 'zd14', value: '', type: 'input', isRqd: true},
        {label: '检测期间实际生产量/天', prop: 'zd15', value: '', type: 'input', isRqd: true},
        {label: '检测期间生产负荷', prop: 'zd16', value: '', type: 'input', isRqd: true, append: '%'},
        {label: '实际季生产天数', prop: 'zd17', value: '', type: 'input', isRqd: true, append: '天'},
        {label: '实际季生产小时', prop: 'zd18', value: '', type: 'input', isRqd: true, append: '小时'},

        {label: '废气(排放标准依据)', prop: 'zd19', value: '', type: 'input', isRqd: true, append: '类'},
        {label: '废水(排放标准依据)', prop: 'zd20', value: '', type: 'input', isRqd: true, append: '类'},
        {label: '噪声(排放标准依据)', prop: 'zd21', value: '', type: 'input', isRqd: true, append: '类'},
        {label: '排放标准依据',
          prop: 'zd22',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '环评报告书', name: '环评报告书'},
            {id: '环评批复', name: '环评批复'},
            {id: '排污许可证', name: '排污许可证'},
            {id: '之前检测报告', name: '之前检测报告'},
            {id: '客户提供', name: '客户提供'}
          ]},
        {label: '检测日期', prop: 'zd24', value: '', type: 'date', isRqd: true},
        {label: '备注', prop: 'zd23', value: '', type: 'textarea', isRqd: true}
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
        this.fromValiData.zd6 = this.fromValiData.contacts
        this.fromValiData.zd7 = this.fromValiData.contactsMobile
        if (this.fromValiData.address) {
          this.fromValiData.zd4 = this.fromValiData.address
        }
        this.$set(this.fromValiData, 'zd23', `1、由于检查现场达不到流量检测条件，流量由企业方（     ）提供，流量为：(     ) t/d（吨/天）。
        2、    年    月    日检测期间生产设施、环保处理设施运行正常。`)
      }
    }
  },
  watch: {
    // 同路径路由跳转
    '$route': function (to, from) {
      this.fromValiData = {...this.$route.params}
      this.commonContent()
    }
  },
  mounted () {
    this.fromValiData = {...this.$route.params}
    this.commonContent()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
