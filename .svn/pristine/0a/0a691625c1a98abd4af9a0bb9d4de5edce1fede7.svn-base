<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :labelWidth="100"
      :rules="rules">
      <el-form-item label="指标明细选择:">
        <el-cascader style="width: 100%;"
           v-model="options"
           ref="cascaderId"
           :options="targetOptions"
           :props="props"
           filterable
           clearable>
           <template slot-scope="{ node, data }">
             <span>{{ data.name}}</span>
             <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
             <span v-else style="color:#53ABD5">{{data.isDefault === '1' ? '(默认)' : ''}}</span>
           </template></el-cascader>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getPackAddOrModifyPack, getPackQueryListPackItem, getPackAddOrModifyPackItem, getTargetQueryAllTarget} from '../../../api/contract/target.js'
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
        name: [
          { required: true, message: '请填写包名', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '包名', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '备注', prop: 'exp', value: '', type: 'input', isRqd: false}
      ],

      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: true
      },

      targetOptions: [],
      options: []
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getPackAddOrModifyPack(this.fromValiData).then(res => {
        let paramsData = []
        let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
        data.forEach(xdd => {
          paramsData.push({
            packageId: res.result,
            checkType: xdd.path[0],
            checkTarget: xdd.path[1],
            checkFun: xdd.path[2]
          })
        })
        getPackAddOrModifyPackItem(paramsData).then(res2 => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getEditData () {
      let ids = {}
      ids.packageId = this.params.id
      getPackQueryListPackItem(ids).then(res => {
        res.result.forEach(xdd => {
          let data = []
          data.push(xdd.checkType)
          data.push(xdd.checkTarget)
          data.push(xdd.checkFun)
          this.options.push(data)
        })

        getTargetQueryAllTarget({}).then(res => {
          this.targetOptions = res.result
        })
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
      this.getEditData()
    } else {
      getTargetQueryAllTarget({}).then(res => {
        this.targetOptions = res.result
      })
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
