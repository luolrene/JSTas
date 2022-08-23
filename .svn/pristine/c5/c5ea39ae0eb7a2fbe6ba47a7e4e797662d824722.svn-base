<template>
  <div class='operate-container'>
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :labelWidth="130"
      :btnLoading="btnLoading"
      :rules="rules">
      <span style="color: red;font-size: 14px;">✳新密码必须包含大小写字母、数字、特殊符号</span>
    </fromItem>
  </div>
</template>

<script>
import {getUserChange} from '../../api/login.js'
import {b64Md5} from '../../utils/md5.js'
export default{
  name: 'updpass',
  props: {
    data: null,
    layerid: ''
  },
  data () {
    var Validator1 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请重新输入新密码'))
      }
      if (value !== this.fromValiData.password) {
        return callback(new Error('两次新密码不相同'))
      }
      callback()
    }
    var Validator2 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请输入新密码'))
      }
      callback()
    }
    var Validator3 = (rule, value, callback) => {
      if (!value || !value.trim()) {
        return callback(new Error('请输入原密码'))
      }
      callback()
    }
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        pwd: [
          { validator: Validator3, required: true, trigger: 'blur' }
        ],
        password: [
          { validator: Validator2, required: true, trigger: 'blur' }
        ],
        npwc: [
          { validator: Validator1, required: true, trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '原密码', prop: 'pwd', value: '', type: 'password', isRqd: true},
        {label: '新密码', prop: 'password', value: '', type: 'password', isRqd: true},
        {label: '重新输入新密码', prop: 'npwc', value: '', type: 'password', isRqd: true}
      ],
      verHref: ''
    }
  },
  methods: {
    onSubmit () {
      let ids = {}
      ids.mobile = this.$store.getters.userInfo.mobile
      ids.pwd = b64Md5(this.fromValiData.pwd).replace(/\+/g, '')
      ids.password = b64Md5(this.fromValiData.password).replace(/\+/g, '')
      this.btnLoading = true
      getUserChange(ids).then(res => {
        this.$share.message('修改成功', 'success')
        this.$layer.close(this.layerid)
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {

  },
  created () {
  }
}
</script>

<style>

</style>
