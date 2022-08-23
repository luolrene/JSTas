<template>
  <div class="pc-container">
    <el-descriptions title="" :column="2">
        <el-descriptions-item label="用户名">{{$store.getters.userInfo.name}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{$store.getters.userInfo.mobile}}</el-descriptions-item>
        <el-descriptions-item label="用户级别">{{$store.getters.userInfo.lev}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{$store.getters.userInfo.sex}}</el-descriptions-item>
        <el-descriptions-item label="角色">{{$store.getters.userInfo.roleName}}</el-descriptions-item>
        <el-descriptions-item label="职务">{{$store.getters.userInfo.positionName}}</el-descriptions-item>
        <el-descriptions-item label="个性签名">{{$store.getters.userInfo.selfSign}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    console.log(this.$store.getters.userInfo)
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
