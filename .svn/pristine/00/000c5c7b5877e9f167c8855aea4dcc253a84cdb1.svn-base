<!-- 合同详情 -->
<template>
  <div class="pc-container contractDetail">
    <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          联系人姓名
        </template>
        {{params.contacts}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          经办人姓名
        </template>
        {{params.sellerName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          内勤姓名
        </template>
        {{params.officeName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          联系人手机
        </template>
        {{params.contactsMobile}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          经办人手机
        </template>
        {{params.seller}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          内勤手机
        </template>
        {{params.office}}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="项目信息" :column="3" :size="size" border style="margin-top: 15px;">
      <el-descriptions-item label="项目名称">{{params.project}}</el-descriptions-item>
      <el-descriptions-item label="合同编号">{{params.contNo}}</el-descriptions-item>
      <el-descriptions-item label="项目板块">{{params.plateName}}</el-descriptions-item>
      <el-descriptions-item label="项目类型">{{params.projectTypeName}}</el-descriptions-item>

      <el-descriptions-item label="客户名称">{{params.custName}}</el-descriptions-item>
      <el-descriptions-item label="客户区域">{{params.area}}</el-descriptions-item>
      <el-descriptions-item label="审核流程">{{params.checkPathName}}</el-descriptions-item>

      <el-descriptions-item label="付款方式">{{params.payTypeName}}</el-descriptions-item>
      <el-descriptions-item label="寄送方式">{{params.mailTypeName}}</el-descriptions-item>
      <el-descriptions-item label="报告份数">{{params.reportNum}}</el-descriptions-item>

      <el-descriptions-item label="是否周期合同">{{params.iscycle === '1' ? '是' : '否'}}</el-descriptions-item>
      <el-descriptions-item label="是否分包">{{params.istosub === '1' ? '是' : '否'}}</el-descriptions-item>
      <el-descriptions-item label="是否评价">{{params.ispj === '1' ? '是' : '否'}}</el-descriptions-item>
      <el-descriptions-item label="是否需要寄出发票">{{params.needInvoice === '1' ? '是' : '否'}}</el-descriptions-item>

      <el-descriptions-item label="采样期限时间">{{params.cyTerm}}</el-descriptions-item>
      <el-descriptions-item label="项目期限">{{params.proTerm}}</el-descriptions-item>
      <el-descriptions-item label="业务类别">{{params.busiTypeName}}</el-descriptions-item>
      <el-descriptions-item label="检测地点">{{params.checkAddress}}</el-descriptions-item>
      <el-descriptions-item label="项目消耗(数值)" v-if="params.consumeType !== '' && params.consumeType !== null">{{params.consumeTypeName}}({{params.consume}})</el-descriptions-item>
      <el-descriptions-item label="合同状态">{{params.statusName}}</el-descriptions-item>
      <el-descriptions-item label="备注1">{{params.expOne}}</el-descriptions-item>
      <el-descriptions-item label="折扣" label-class-name="my-label">{{params.discount}}</el-descriptions-item>
      <!-- <el-descriptions-item label="服务费1类型" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.consumeTypeName}}</el-descriptions-item>
      <el-descriptions-item label="服务费1金额" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.consume}}</el-descriptions-item>
      <el-descriptions-item label="折扣" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.discount}}</el-descriptions-item> -->
      <!-- <el-descriptions-item label="报备金额" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.price}}</el-descriptions-item>
      <el-descriptions-item label="实际金额" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.price}}</el-descriptions-item> -->

      <el-descriptions-item label="合同金额" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.price}}</el-descriptions-item>
      <el-descriptions-item label="备注2" v-if="secret || this.$store.getters.userInfo.lev > 3" label-class-name="my-label">{{params.expTwo}}</el-descriptions-item>

    </el-descriptions>
    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else delType="not"></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import fileList from '../../../common/fileList.vue'
import { getFileQueryFileList } from '../../../../api/file.js'
export default {
  components: {
    fileList
  },
  props: {
    params: Object,
    secret: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      size: ''
    }
  },
  methods: {},
  mounted() {
    switch (this.params.status) {
      case '00':
        this.params.statusName = '草稿'
        break
      case '01':
        this.params.statusName = '审核中'
        break
      case '02':
        this.params.statusName = '审核通过'
        break
      case '03':
        this.params.statusName = '审核退回'
        break
      case '04':
        this.params.statusName = '放弃'
        break
      case '05':
        this.params.statusName = '已完成'
        break
      case '06':
        this.params.statusName = '进行中'
        break
      case '07':
        this.params.statusName = '变更审核'
        break
    }
    switch (this.params.busiType) {
      case '1':
        this.params.busiTypeName = '纯检测'
        break
      case '2':
        this.params.busiTypeName = '纯咨询'
        break
      case '3':
        this.params.busiTypeName = '检测和咨询'
        break
    }
    switch (this.params.consumeType) {
      //   this.params.consumeTypeName = '税前比例'
      //   break
      // case '2':
      //   this.params.consumeTypeName = '税后比例'
      //   break
      case '3':
        this.params.consumeTypeName = '税前金额'
        break
      case '4':
        this.params.consumeTypeName = '税后金额'
    }
    getFileQueryFileList({ id: this.params.id, type: '1' }).then(res => {
      this.fileList = res.result
    })
  },
  created() {

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
