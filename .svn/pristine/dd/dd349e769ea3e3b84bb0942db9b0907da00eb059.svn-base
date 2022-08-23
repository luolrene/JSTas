<!-- 合同详情 -->
<template>
  <div class="pc-container contractDetail">
    <el-descriptions class="margin-top" title="" :column="2" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          项目名称
        </template>
        {{params.proName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          主任务名称
        </template>
        {{params.taskName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          监测计划
        </template>
        {{params.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          报告编号
        </template>
        {{params.reportNo}}
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template slot="label">
          客户名称
        </template>
        {{params.custName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          是否周期
        </template>
        {{params.isCycleName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          方案是否确认
        </template>
        {{params.funIsOkName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          现场负责人
        </template>
        {{params.opermanName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建时间
        </template>
        {{params.creatTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          状态
        </template>
        {{params.statusName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          合同状态
        </template>
        {{params.contStatusName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          报告开始日期
        </template>
        {{params.reportStart}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          报告完成日期
        </template>
        {{params.complete}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    secret: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      size: ''
    }
  },
  methods: {},
  mounted() {

  },
  created() {
    let xdd = this.params
    switch (this.params.status) {
      case '0':
        xdd.statusName = '未启动'
        break
      case '1':
        xdd.statusName = '启动'
        break
      case '2':
        xdd.statusName = '撤回'
        break
      case '3':
        xdd.statusName = '完成'
        break
      case '4':
        xdd.statusName = '放弃'
        break
    }
    switch (xdd.contStatus) {
      case '00':
        xdd.contStatusName = '草稿'
        break
      case '01':
        xdd.contStatusName = '审核中'
        break
      case '02':
        xdd.contStatusName = '审核通过'
        break
      case '03':
        xdd.contStatusName = '审核退回'
        break
      case '04':
        xdd.contStatusName = '放弃'
        break
      case '05':
        xdd.contStatusName = '已完成'
        break
      case '06':
        xdd.contStatusName = '进行中'
        break
      case '07':
        xdd.contStatusName = '变更审核'
        break
    }
    switch (xdd.isCycle) {
      case '1':
        xdd.isCycleName =
          '是' +
          (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
        break
      case '0':
        xdd.isCycleName = '否'
        break
    }
    switch (xdd.funIsOk) {
      case '1':
        xdd.funIsOkName = '是'
        break
      case '0':
        xdd.funIsOkName = '否'
        break
    }
  }
}
</script>

<style lang="scss">
.contractDetail {
  .modular {
    display: flex;
    margin: 15px 0 30px 0;
    .title {
      width: 80px;
      font-weight: 600;
    }
    .content {
      width: calc(100% - 80px);
    }
  }
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
