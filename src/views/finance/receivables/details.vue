<template>
  <div class="operate-container">
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="合同详情" name="first">
        <information :params="params" :client='client' :type='type' v-if="tabData.first" />
      </el-tab-pane>
      <el-tab-pane label="应收账款" name="second" lazy>
        <receivables :params="params" :client='client' v-if="tabData.second" />
      </el-tab-pane>
       <el-tab-pane label="回款信息" name="third" lazy>
        <returned :params="params" :client='client' v-if="tabData.third"  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import information from './details/information.vue' // 合同详情
import receivables from './details/receivables.vue' // 应收账款
import returned from '../../contract/msg/details/returned.vue' // 回款信息
export default {
  components: {
    information,
    receivables,
    returned
  },
  props: {
    layerid: '',
    params: Object,
    client: Object,
    type: Number
  },
  data() {
    return {
      activeName: 'first',
      tabData: {
        first: true,
        second: false,
        third: false
      }
    }
  },
  methods: {
    handleClick(tab) {
      for (var key in this.tabData) {
        if (tab.name != key) {
          this.tabData[key] = false
        } else {
          this.tabData[key] = true
        }
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style lang="scss">
.el-descriptions :not(.is-bordered) td,
.el-descriptions :not(.is-bordered) th {
  width: 200px;
}
.name {
  color: #0195db;
  cursor: pointer;
}
</style>
