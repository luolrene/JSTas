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

  <!--  <el-form label-position="right" label-width="90px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="用户名称:" prop="name">
        <el-input v-model="fromValiData.name"></el-input>
      </el-form-item>
      <el-form-item label="角色:" prop="roleName">
        <el-input v-model="fromValiData.roleName" style="width: 80%;" placeholder="请选择角色" disabled></el-input>
        <el-button type="primary" size="mini" @click='getRoleId'>选择角色</el-button>
      </el-form-item>
      <el-form-item label="职务:" prop="position">
        <el-select v-model="fromValiData.position" placeholder="请选择职务" style="width: 100%;">
          <el-option
            v-for="item in positionData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组名:" prop="groupName">
        <el-input v-model="fromValiData.groupName" style="width: 80%;" placeholder="请选择分组" disabled></el-input>
        <el-button type="primary" size="mini" @click='getGroupId'>选择分组</el-button>
      </el-form-item>
      <el-form-item label="用户级别:" prop="lev">
        <el-select v-model="fromValiData.lev" placeholder="请选择用户级别" style="width: 100%;">
          <el-option
            v-for="item in levData"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="fromValiData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="生日:" prop="birth">
        <el-date-picker v-model="fromValiData.birth" type="date" placeholder="选择生日" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="性别:" prop="sex">
        <el-radio-group v-model="fromValiData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个性签名:">
        <el-input v-model="fromValiData.selfSign"></el-input>
      </el-form-item>
      <div class="operate-button">
        <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
        <el-button  type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">保存</el-button>
      </div>
    </el-form> -->
  </div>
</template>

<script>
import {getUserAddOrModify} from '../../../api/jcxxgl/user.js'
import choRole from '../../common/role_list.vue'
import choGroup from '../../common/group_list.vue'
import { validatePhoneTwo } from '@/utils/public.js'

export default {
  props: {
    params: Object,
    dictData: Array,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        roleName: '',
        groupName: '',
        isCheckOne: '0',
        isCheckTwo: '0'
      },
      rules: {
        name: [{ required: true, message: '请填写用户名称', trigger: 'blur' }],
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }],
        position: [{ required: true, message: '请选择职务', trigger: 'change' }],
        groupName: [{ required: true, message: '请选择分组', trigger: 'change' }],
        lev: [{ required: true, message: '请选择用户级别', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhoneTwo, trigger: 'change' }
        ],
        birth: [{ required: true, message: '请选择生日', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
      },
      fromItemList: [
        {label: '用户名称', prop: 'name', value: '', type: 'input', isRqd: true},
        {label: '角色', prop: 'roleName', value: '', type: 'inputChoice', isRqd: true, click: 'getRoleId'},
        {label: '职务', prop: 'position', value: '', type: 'select', isRqd: true, data: this.dictData},
        {label: '分组', prop: 'groupName', value: '', type: 'inputChoice', isRqd: true, click: 'getGroupId'},
        {label: '用户级别', prop: 'lev', value: '', type: 'select', isRqd: true, data: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}, {id: '6'}, {id: '7'}, {id: '8'}, {id: '9'}, {id: '10'}]},
        {label: '手机号', prop: 'mobile', value: '', type: 'input', isRqd: true},
        {label: '生日', prop: 'birth', value: '', type: 'date', isRqd: true},
        {label: '性别', prop: 'sex', value: '', type: 'radio', isRqd: true, data: [{label: '男', name: '男'}, {label: '女', name: '女'}]},
        {label: '一审人员', prop: 'isCheckOne', value: '', type: 'radio', isRqd: true, data: [{label: '1', name: '是'}, {label: '0', name: '否'}]},
        {label: '二审人员', prop: 'isCheckTwo', value: '', type: 'radio', isRqd: true, data: [{label: '1', name: '是'}, {label: '0', name: '否'}]},
        {label: '个性签名', prop: 'selfSign', value: '', type: 'input', isRqd: false}
      ],

      positionData: []
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getUserAddOrModify(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getRoleId () {
      this.$layer.iframe({
        content: {
          content: choRole, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择角色',
        maxmin: true,
        shadeClose: false
      })
    },
    getRoleData (params) {
      this.fromValiData.roleId = params.id
      this.fromValiData.roleName = params.name
    },
    getGroupId () {
      this.$layer.iframe({
        content: {
          content: choGroup, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择分组',
        maxmin: true,
        shadeClose: false
      })
    },
    getGroupData (params) {
      this.fromValiData.groupId = params.id
      this.fromValiData.groupName = params.name
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
    }
    this.positionData = this.dictData
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
