<template>
  <homeRecord
    ref="homeRecord"
    :fromValiData="fromValiData"
    @handleSave="handleSave"
    :hasPoint="false"
    :hasBatchSave="false">
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
      pointValue: '', // 选中的点位
      fromItemList: [
        {label: '委托（受检）单位', prop: 'zd1', value: '', type: 'input', isRqd: true},
        {label: '接待人', prop: 'zd2', value: '', type: 'input', isRqd: true},
        {label: '联系电话', prop: 'zd3', value: '', type: 'input', isRqd: true},
        {label: '地址', prop: 'zd4', value: '', type: 'input', isRqd: true},
        {label: '检测人员', prop: 'zd50', value: '', type: 'select', isRqd: true, data: [], multiple: true, isNoClear: true, filterable: true},
        {label: '检测时间', prop: 'zd5', value: '', type: 'date', isRqd: true},
        {label: '测点示意图', prop: 'zd6', value: '', type: 'draw', isRqd: true},
        {label: '备注', prop: 'zd7', value: '', type: 'textarea', isRqd: true}
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
        this.$set(this.fromValiData, 'zd1', this.fromValiData.custName)
        this.$set(this.fromValiData, 'zd2', this.fromValiData.contacts)
        this.$set(this.fromValiData, 'zd3', this.fromValiData.contactsMobile)
        if (this.fromValiData.address) {
          this.$set(this.fromValiData, 'zd4', this.fromValiData.address)
        }
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
