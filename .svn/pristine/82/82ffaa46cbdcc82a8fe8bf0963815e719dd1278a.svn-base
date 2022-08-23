<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
      <el-button slot="button" type="primary" native-type="submit" @click="handFlow">流程明细</el-button>
    </fromItem>
  </div>
</template>

<script>
import spcList from './spc_list.vue'
import {getSubContAddOrModifySubCont, getSubContQuerySubCont} from '../../../api/verity/contractVerity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        detail: [
          { required: true, message: '请填写分包明细', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '备注信息', prop: 'detail', value: '', type: 'textarea', isRqd: true}
      ]
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSubContAddOrModifySubCont(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    handFlow() {
      this.$layer.iframe({
        content: {
          content: spcList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            // params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '任务明细',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted () {
    this.fromValiData.contId = this.params.id

    let ids = {pageSize: 10, pageNow: 1}
    ids.contId = this.params.id
    getSubContQuerySubCont(ids).then(res => {
      if (res.result.pageList.length > 0) {
        this.fromValiData = res.result.pageList[0]
      }
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
