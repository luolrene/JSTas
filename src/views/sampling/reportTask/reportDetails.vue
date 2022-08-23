<template>
  <div class="operate-container">
    <div>
      <div style="display: flex;justify-content: center;">
        <div class="titleImg">报告任务详情</div>
      </div>
      <task :params="reportParams"></task>
    </div>
    <div>
      <div style="display: flex;justify-content: center;margin-top: 30px;">
        <div class="titleImg">合同信息</div>
      </div>
      <contract :params="params"></contract>
    </div>
    <div>
      <div style="display: flex;justify-content: center;margin-top: 30px;">
        <div class="titleImg">过程备注</div>
      </div>
      <remark :params="params"></remark>
    </div>

    <!-- <el-tabs tab-position="left">
       <el-tab-pane label="任务详情">
        <task :params="reportParams"></task>
      </el-tab-pane>
      <el-tab-pane label="合同信息" lazy>
        <contract :params="params"></contract>
      </el-tab-pane>
      <el-tab-pane label="过程备注" lazy>
        <remark :params="params"></remark>
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import task from './reportDetails/task.vue'
import contract from '@/views/contract/msg/details/contract.vue'
import remark from '@/views/contract/msg/details/remark.vue'

export default {
  components: {
    task,
    contract,
    remark
  },
  props: {
    layerid: '',
    params: Object,
    reportParams: Object
  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  },
  created () {

  }
}
</script>

<style lang="scss">
  .titleImg {
    background-image: url('../../../../static/img/menu/majorReportBK.png');
    width: 250px;
    height: 40px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
