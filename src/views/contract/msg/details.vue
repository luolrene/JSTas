<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
       <el-tab-pane label="任务信息">
        <task :params="params"></task>
      </el-tab-pane>
      <el-tab-pane label="合同信息" lazy>
        <contract :secret="secret" :params="params"></contract>
      </el-tab-pane>
      <el-tab-pane label="客户信息" lazy>
        <customer :custId="params.custId" :layerid="layerid"></customer>
      </el-tab-pane>
      <el-tab-pane label="流程明细" v-if="params.status !=='00'" lazy>
        <process :params="params"></process>
      </el-tab-pane>
      <el-tab-pane label="过程备注" lazy>
        <remark :params="params"></remark>
      </el-tab-pane>
      <el-tab-pane label="合同变更" lazy>
        <changeCont :params="params"></changeCont>
      </el-tab-pane>
       <el-tab-pane label="回款信息" lazy>
        <returned :params="params"></returned>
      </el-tab-pane>
      <el-tab-pane label="分包信息" v-if="params.istosub === '1'" lazy>
        <spc :params="params"></spc>
      </el-tab-pane>
      <el-tab-pane label="操作日志" v-if="$store.getters.userInfo.lev > 4" lazy>
        <operationLog :params="params"></operationLog>
      </el-tab-pane>
      <el-tab-pane label="咨询日志" v-if="params.busiType === '2' || params.busiType === '3'" lazy>
        <node :params="params"></node>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import contract from './details/contract.vue' // 合同信息
import customer from './details/customer.vue' // 客户信息
import task from './details/task.vue' // 任务信息
import process from './details/process.vue' // 流程明细
import remark from './details/remark.vue' // 过程备注
import changeCont from './details/changeCont.vue' // 合同变更
import operationLog from './details/operationLog.vue' // 操作日志
import spc from './details/spc.vue' // 分包信息
import node from './details/node.vue' // 咨询日志
import returned from './details/returned.vue' // 回款信息

export default {
  components: {
    contract,
    customer,
    task,
    process,
    remark,
    changeCont,
    operationLog,
    spc,
    node,
    returned
  },
  props: {
    layerid: '',
    params: Object,
    secret: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      contId: '',
      isProcessDetail: true
    }
  },
  methods: {

  },
  mounted () {

  },
  created () {

  },
  destroyed() {
    // this.$parent.getListData()
  }
}
</script>

<style lang="scss">
  .el-descriptions :not(.is-bordered) td, .el-descriptions :not(.is-bordered) th{
    width: 200px;
  }
</style>
