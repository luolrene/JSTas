<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="客户信息">
        <customer :params="params"></customer>
      </el-tab-pane>
      <el-tab-pane label="客户关系" lazy>
        <relation :params="params"></relation>
      </el-tab-pane>
      <el-tab-pane label="联系人管理" lazy>
        <contactManage :params="params"></contactManage>
      </el-tab-pane>
      <el-tab-pane label="跟进记录" lazy>
        <followRecords :params="params"> </followRecords>
      </el-tab-pane>
      <el-tab-pane label="访客计划" lazy>
        <visitorsToPlan :params="params"></visitorsToPlan>
      </el-tab-pane>
      <el-tab-pane label="销售机会" lazy>
        <salesLeads :params="params"></salesLeads>
      </el-tab-pane>
      <el-tab-pane label="报价记录" lazy>
        <quotationRecord :params="params"></quotationRecord>
      </el-tab-pane>
      <el-tab-pane label="操作日志" v-if="this.$store.getters.userInfo.lev==='10'" lazy>
        <operationLog :params="params" ></operationLog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import relation from '../../client/info/details/relation.vue'
import visitorsToPlan from '../../client/info/details/visitorsToPlan.vue'
import contactManage from '../../client/info/details/contactManage.vue'
import customer from './detail/customer.vue'
import followRecords from '../../client/info/details/followRecords.vue'
import salesLeads from '../../client/info/details/salesLeads.vue'
import quotationRecord from '../../client/info/details/quotationRecord.vue'
import operationLog from '../../client/info/details/operationLog.vue'
export default {
  components: {
    relation,
    customer,
    contactManage,
    followRecords,
    salesLeads,
    quotationRecord,
    visitorsToPlan,
    operationLog
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
