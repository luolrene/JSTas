<template>
  <el-main class="full-main-container">
    <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%">
      <div style="padding: 0px;height: 100%;">
        <router-view></router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script>
export default {
  name: 'FullComponent',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
.full-main-container {
  padding: 0px;
  height: 100%;
}
.el-scrollbar__view {
  height: 100%;
}
</style>
