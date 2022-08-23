<template>
  <el-scrollbar class="page-component__scroll" :native="false" style="height: 570px;padding-bottom: 2px;">
    <el-tree
      ref="elTree"
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      check-on-click-node
      :props="props"
      :data="treeData"
      @node-click="getNodeClick"
      >
     <span class="custom-tree-node" slot-scope="{ node, data }">
       <img src="../../../../static/img/default/file.png" alt="" style="vertical-align: middle;" v-if="node.childNodes && node.childNodes.length === 0">
       <template v-else>
        <img src="../../../../static/img/default/package_open.png" v-if="node.expanded" alt="" style="vertical-align: middle;">
         <img src="../../../../static/img/default/package_close.png" v-else alt="" style="vertical-align: middle;">
       </template>
       <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      default: function () {
        return {}
      }
    },
    treeData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getNodeClick (data, node, now) {
      this.$emit('getNodeClick', data, node, now)
    }
  },
  mounted () {
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .el-tree{
    display: inline-block;
    min-width: 100%;
    padding: 0 0 30px 0;

    .custom-tree-node{
      font-size: 14px;
    }
  }
</style>
