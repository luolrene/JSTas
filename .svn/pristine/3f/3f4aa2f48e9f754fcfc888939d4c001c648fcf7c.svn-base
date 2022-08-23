<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="客户信息">
        <info :params="params"></info>
      </el-tab-pane>

      <el-tab-pane label="客联系人">
        <contactManage :params="params"></contactManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import info from './info.vue'
import contactManage from './contactManage.vue'
export default {
  components: {
    info,
    contactManage
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      contId: '',
      isProcessDetail: true
    }
  },
  methods: {},
  mounted() {},
  created() {}
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
</style>
