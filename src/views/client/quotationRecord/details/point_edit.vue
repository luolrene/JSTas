<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
      <template v-slot:top>
        <el-form-item
          label="样品类别/类型:"
          prop="options"
          label-width="110">
          <el-cascader
            ref="cascader"
            v-model="fromValiData.options"
            :options="optionsData"
            @change="changeCascader"
            :props="props"
            clearable :separator="'/'" style='width: 380px;'>
            <template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span style="font-size: 13px !important;">({{ data.sampType }})</span>
            </template></el-cascader>
        </el-form-item>
      </template>
    </fromItem>
  </div>
</template>

<script>
import {validateNumber} from '@/utils/public.js'
import {getCrmOfferPointAddOrModifyPoint} from '@/api/client/quotationRecord.js'
import {getContTaskQuerySampType} from '@/api/contract/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        options: []
      },
      rules: {
        pointName: [{ required: true, message: '请填写点位名称', trigger: 'blur' }],
        pointNum: [
          { required: true, message: '请填写点位数量', trigger: 'change' }, { validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {label: '点位名称', prop: 'pointName', value: '', type: 'input', isRqd: true},
        {label: '点位数量', prop: 'pointNum', value: '', type: 'input', isRqd: true}
      ],
      props: {
        value: 'id',
        label: 'name',
        expandTrigger: 'hover'
      },
      optionsData: []
    }
  },
  methods: {
    onSubmit (formName) {
      if (this.fromValiData.options === undefined) {
        this.$share.message('请选择样品类别', 'warning')
      }
      if (this.fromValiData.id) {
        this.btnLoading = true
        this.fromValiData.name = this.fromValiData.pointName
        getCrmOfferPointAddOrModifyPoint(this.fromValiData).then(res => {
          this.$layer.close(this.layerid)
          this.$parent.editTree(this.fromValiData)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        let ids = {}
        ids = {...this.fromValiData}
        this.btnLoading = true
        getCrmOfferPointAddOrModifyPoint(ids).then(res => {
          this.$layer.close(this.layerid)
          let ids = {}
          ids.name = this.fromValiData.pointName
          ids.father = this.fromValiData.father
          ids.id = res.result
          this.$parent.appendTree(ids)
          this.$parent.getListData(this.fromValiData.father)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }
    },
    changeCascader (e) {
      if (this.$refs['cascader'].getCheckedNodes()[0]) {
        // let labels = this.$refs['cascader'].getCheckedNodes()[0].pathLabels
        this.fromValiData.sampLb = e[0]
        this.fromValiData.proType = e[1]
        // this.fromValiData.sampLbName = labels[0]
        // this.fromValiData.sampLxName = labels[1]
        // let type = this.$refs['cascader'].getCheckedNodes()[0].data.sampType
      }
    },
    getSampList () {
      getContTaskQuerySampType({contId: this.fromValiData.offerId}).then(res => {
        this.optionsData = res.result
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = {...this.params}
      this.fromValiData.options = []
      this.fromValiData.options.push(this.fromValiData.sampLb)
      this.fromValiData.options.push(this.fromValiData.proType)
      console.log(this.fromValiData)
    }
    this.getSampList()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
