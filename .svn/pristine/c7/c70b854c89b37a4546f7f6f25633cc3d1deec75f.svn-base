<template>
  <div class="operate-container">
    <el-form label-position="right" label-width="100px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="联系人姓名:" prop="name">
        <el-input v-model="fromValiData.name"></el-input>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="fromValiData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职务:" prop="position">
        <el-input v-model="fromValiData.position"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="fromValiData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:">
        <el-input v-model="fromValiData.email"></el-input>
      </el-form-item>
      <div class="operate-button">
        <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
        <el-button  type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getCustAddOrModifyContacts} from '@/api/contract/customer.js'

export default {
  props: {
    id: String,
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,

      fromValiData: {

      },
      rules: {
        name: [{ required: true, message: '请填写用户名称', trigger: 'blur' }],
        position: [{ required: true, message: '请填写职务', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getCustAddOrModifyContacts(this.fromValiData).then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          })
        }
      })
    }
  },
  mounted () {
    if (this.id) {
      this.fromValiData.custId = this.id
    } else {
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
