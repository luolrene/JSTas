<template>
  <div class="operate-container">

    <el-tabs tab-position="left">
      <el-tab-pane label="项目名称">
        <opportunity :params="params"></opportunity>
      </el-tab-pane>
      <el-tab-pane label="流程明细" lazy>
        <process :params="params"></process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import opportunity from './details/opportunity.vue'
import process from './details/process.vue'
export default {
  components: {
    opportunity,
    process
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
  mounted() { },
  created() { }
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
</style>
