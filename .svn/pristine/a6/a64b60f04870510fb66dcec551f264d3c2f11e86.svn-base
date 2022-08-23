<template>
  <div class="operate-container">

    <el-tabs tab-position="left">
      <el-tab-pane label="报价详情">
        <quotation :params="params"></quotation>
      </el-tab-pane>
      <el-tab-pane label="流程明细" v-if="params.offerType!=2" lazy>
        <process :params="params"></process>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import quotation from './details/quotation.vue'
import process from './details/process.vue'
export default {
  components: {
    quotation,
    process
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {

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
