<template>
  <div class="operate-container">
    <el-tabs tab-position="left" style="height: 100%;" ref="tabs">
      <el-tab-pane label="报价信息" style="height: 100%;">
        <edit :params="params" :layerid="layerid" style="height: 100%;"></edit>
      </el-tab-pane>
      <el-tab-pane label="点位指标" v-if="fromValiData.id !== undefined || isShow" lazy>
        <point :params="fromValiData"></point>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from './details/edit.vue'
import point from './details/point.vue'
export default {
  components: {
    edit,
    point
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      isShow: false,
      fromValiData: {

      }
    }
  },
  methods: { },
  mounted() {
    this.fromValiData = {...this.params}
  },
  created() { }
}
</script>

<style lang="scss" scoped>
  >>> .el-tabs__content{
    height: 100%;
  }
</style>
