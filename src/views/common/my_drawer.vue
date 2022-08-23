<template>
  <div class="pc-container">
    <el-button @click="getDrawer" :size="$layer_Size.buttonSize" type="primary" style="position: absolute;right: 30px;margin-top: -20px;">选择机构</el-button>
    <el-drawer
      ref="myDrawer"
      title="我是标题"
      :visible.sync="drawer"
      size="400px"
      :with-header="false">
      <el-scrollbar class="page-component__scroll" :native="false">
        <div>请勾选组织机构</div>
        <el-radio-group v-model="orgId" class="drawerRadioGroup">
          <el-radio :label="item.id" v-for="(item,index) in orgData" :key="index">{{item.name}}</el-radio>
        </el-radio-group>
        <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit" :loading="btnLoading">确认</el-button>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import {getSysChangeSysOrg} from '../../api/common.js'
import {getOrgQueryPageData} from '../../api/jcxxgl/org.js'
export default {
  props: {

  },
  data () {
    return {
      drawer: false,
      btnLoading: false,

      orgData: [],
      orgId: this.$store.getters.userInfo.orgId
    }
  },
  methods: {
    getDrawer () {
      getOrgQueryPageData({pageSize: 9999}).then(res => {
        this.drawer = true
        this.orgData = res.result.pageList
      })
    },
    onSubmit () {
      this.btnLoading = true
      getSysChangeSysOrg({orgId: this.orgId}).then(res => {
        this.$refs.myDrawer.closeDrawer()
        this.btnLoading = false
        location.reload()
      })
    }
  },
  mounted () {

  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .drawerRadioGroup{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15px;
    max-height: 80vh;
  }
  .drawerRadioGroup label{
    height: 35px;
  }
</style>
