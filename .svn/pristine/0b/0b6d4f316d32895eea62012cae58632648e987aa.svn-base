<template>
  <div class="operate-container" >
    <el-tabs tab-position="left"  v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客户信息" name="one">
        <customer :params="params" v-if="tabData.one" />
      </el-tab-pane>
      <el-tab-pane label="客户关系" name="two" lazy>
        <relations :params="params" v-if="tabData.two" />
      </el-tab-pane>
      <el-tab-pane label="客联系人" name="there" lazy>
        <contactManage :params="params" v-if="tabData.there"/>
      </el-tab-pane>
      <el-tab-pane label="跟进记录" name="four" lazy>
        <followRecords :params="params" v-if="tabData.four"/>
      </el-tab-pane>
      <el-tab-pane label="访客计划" name="five" lazy>
        <visitorsToPlan :params="params" v-if="tabData.five"/>
      </el-tab-pane>
      <el-tab-pane label="销售机会" name="six" lazy>
        <salesLeads :params="params" v-if="tabData.six"/>
      </el-tab-pane>
      <el-tab-pane label="报价记录" name="seven" lazy>
        <quotationRecord :params="params" v-if="tabData.seven"/>
      </el-tab-pane>
      <el-tab-pane label="开票信息" name="eight" lazy>
        <billingInfo :params="params" v-if="tabData.eight"/>
      </el-tab-pane>
      <el-tab-pane label="操作日志" v-if="this.$store.getters.userInfo.lev==='10'" name="nine" lazy>
        <operationLog :params="params"  v-if="tabData.nine"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import relations from './details/relation.vue'
import visitorsToPlan from './details/visitorsToPlan.vue'
import contactManage from './details/contactManage.vue'
import customer from './details/customer.vue'
import followRecords from './details/followRecords.vue'
import salesLeads from './details/salesLeads.vue'
import quotationRecord from './details/quotationRecord.vue'
import billingInfo from './details/billingInfo.vue'
import operationLog from './details/operationLog.vue'
export default {
  components: {
    relations,
    customer,
    contactManage,
    followRecords,
    salesLeads,
    quotationRecord,
    visitorsToPlan,
    billingInfo,
    operationLog
  },
  props: {
    layerid: '',
    params: Object,
    secret: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'one',
      tabData: {
        one: true,
        two: false,
        there: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false
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
</style>
