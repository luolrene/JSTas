<!-- 新建主任务 -->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import {getMainTaskAddOrModifyTask} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    layerid: '',
    params: Object,
    addParams: Object,
    type: String
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        custName: '',
        proName: ''
      },
      rules: {
        taskName: [{ required: true, message: '请填任务名称', trigger: 'blur' }]
      },
      fromItemList: [
        {label: '任务名称', prop: 'taskName', value: '', type: 'input', isRqd: true},
        {label: '任务类型',
          prop: 'type',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            {id: '1', name: '采样'},
            {id: '2', name: '送样'}
          ]},
        {label: '项目名称', prop: 'proName', value: '', type: 'input', disabled: true},
        {label: '客户名称', prop: 'custName', value: '', type: 'input', disabled: true},
        {label: '项目期限', prop: 'proTerm', value: '', type: 'input', disabled: true},
        {label: '采样期限', prop: 'cyTerm', value: '', type: 'input', disabled: true},
        {label: '是否周期', prop: 'isCycle', value: '', type: 'input', disabled: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.fromValiData.isCycle = this.fromValiData.isCycle === '是' ? '1' : '0'
      this.btnLoading = true
      getMainTaskAddOrModifyTask(this.fromValiData).then(res => {
        this.$parent.getListData()
        this.$layer.close(this.layerid)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    this.fromItemList.forEach(xdd => {
      if (xdd.prop === 'type') {
        if (this.type === '3') {
          xdd.data = [
            {id: '1', name: '采样'},
            {id: '2', name: '送样'}
          ]
        } else if (this.type === '1') {
          xdd.data = [
            {id: '1', name: '采样'}
          ]
        } else if (this.type === '2') {
          xdd.data = [
            {id: '1', name: '送样'}
          ]
        }
      }
    })

    if (this.addParams) {
      this.fromValiData.contId = this.addParams.id
      this.fromValiData.proName = this.addParams.project
      this.fromValiData.custId = this.addParams.custId
      this.fromValiData.custName = this.addParams.custName
      this.fromValiData.proTerm = this.addParams.proTerm
      this.fromValiData.cyTerm = this.addParams.cyTerm
      this.fromValiData.isCycle = this.addParams.iscycle === '1' ? '是' : '否'
      if (this.addParams.type === '1') {
        this.fromValiData.type = '1' // 送样
      } else if (this.addParams.type === '2') {
        this.fromValiData.type = '2' // 采样
      }
    }
    if (this.params) {
      this.params.isCycle = this.params.iscycle === '1' ? '是' : '否'
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
