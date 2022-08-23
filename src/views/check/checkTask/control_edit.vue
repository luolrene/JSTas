<template>
  <div class="operate-container">
    <fromItem
      ref="myFromItem"
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="100">
    </fromItem>
  </div>
</template>

<script>
import {getLaboratoryZkAddOrModify, getDetectionQueryAllTarget} from '../../../api/check/checkTask.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        type: '1',
        sampNo: '',
        sampNoZk: '',
        checkPro: [],
        danwei: ''
      },
      rules: {
        danwei: [{ required: true, message: '请填写单位', trigger: 'blur' }]
      },
      fromItemList: [
        {label: '报告编号', prop: 'reportNo', value: '', type: 'input', disabled: true},
        {label: '指控类别',
          click: 'changeType',
          prop: 'type',
          value: '',
          type: 'select',
          data: [
            {id: '1', name: '质控'},
            {id: '2', name: '平行'},
            {id: '3', name: '加标回收'}
          ]},
        {label: '质控样品编号', prop: 'sampNoZk', value: '', type: 'input', isShow: false},
        {label: '样品编号', prop: 'sampNo', value: '', type: 'input', isShow: true},
        {label: '指标名字', prop: 'checkPro', value: '', type: 'select', multiple: true, isRqd: true, data: [], click: 'getCheckProName', visibleChange: 'visibleChange'},
        {label: '指标单位', prop: 'danwei', value: '', type: 'input', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.fromValiData.checkPro.length === 0) {
        this.$share.message('请选择指标', 'warning')
        return
      }
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.checkPro = ids.checkPro.join('@')
      this.btnLoading = true
      getLaboratoryZkAddOrModify([ids]).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    changeType (item, params) {
      this.fromValiData.sampNo = ''
      this.fromValiData.sampNoZk = ''
      this.fromValiData.checkPro = []
      if (params === '1') {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'sampNo') {
            xdd.isShow = true
          }
          if (xdd.prop === 'sampNoZk') {
            xdd.isShow = false
          }
        })
        this.getTargetData({reportNo: this.fromValiData.reportNo})
      } else {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'sampNo') {
            xdd.isShow = false
          }
          if (xdd.prop === 'sampNoZk') {
            xdd.isShow = true
          }
        })
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'checkPro') {
            xdd.data = []
          }
        })
      }
    },
    getCheckProName (item, params) {

    },
    visibleChange (item, params) {
      // 下拉框展开  非质控  指标无数据
      if (params && this.fromValiData.type !== '1') {
        this.getTargetData({sampNo: this.fromValiData.sampNo}).then(res => {
          if (res.length === 0) {
            this.$share.message('当前样品编号下无指标', 'warning')
          }
        })
      }
    },
    getTargetData (params) {
      return new Promise(resolve => {
        getDetectionQueryAllTarget(params).then(res => {
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'checkPro') {
              xdd.data = []
              if (res.result && res.result.length > 0) {
                res.result.forEach(arc => {
                  xdd.data.push({
                    id: arc,
                    name: arc
                  })
                })
              }
              resolve(xdd.data)
            }
          })
        })
      })
    }
  },
  mounted () {

  },
  created () {
    if (this.addParams) {
      this.fromValiData.reportNo = this.addParams.reportNo
      this.fromValiData.proName = this.addParams.proName
      this.fromValiData.contId = this.addParams.contId
      this.fromValiData.mainId = this.addParams.mainId
      this.fromValiData.sampTaskId = this.addParams.id
    }
    if (this.params) {
      this.fromValiData = this.params
    }
    this.getTargetData({reportNo: this.fromValiData.reportNo})
  }
}
</script>

<style scoped lang="scss">

</style>
