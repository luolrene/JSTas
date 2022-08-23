<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="销售机会">
        <number :params="params"></number>
      </el-tab-pane>
      <el-tab-pane label="跟进记录">
        <followRecords :params="params"></followRecords>
      </el-tab-pane>
       <el-tab-pane label="销售节点">
        <nodeList :params="params"></nodeList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import number from './number'
import followRecords from './followRecords'
import nodeList from './nodeList'
export default {
  components: {
    number,
    followRecords,
    nodeList
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
