<template>
  <div class="operate-container">
    <el-form label-position="right" label-width="90px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="指标选择:" prop="options">
         <el-cascader style="width: 100%;"
            v-model="fromValiData.options"
            :options="targetOptions"
            :props="props"
            filterable
            clearable></el-cascader>
      </el-form-item>
      <div class="operate-button">
        <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
        <el-button  type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getTargetQueryAllTarget, getPackAddOrModifyPackItem} from '../../../api/contract/target.js'

export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,

      fromValiData: {

      },
      rules: {
        options: [{ required: true, message: '请选择指标', trigger: 'blur' }]
      },

      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: true
      },
      targetOptions: []
    }
  },
  methods: {
    getListData () {
      getTargetQueryAllTarget({}).then(res => {
        this.targetOptions = res.result
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let array = []
          this.fromValiData.options.forEach((xdd, index) => {
            array.push({
              packageId: this.params.id,
              checkType: xdd[0],
              checkTarget: xdd[1],
              checkFun: xdd[2]
            })
          })
          getPackAddOrModifyPackItem(array).then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          })
        }
      })
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
