<template>
  <div class="operate-container contractDetail">
    <el-descriptions
      class="margin-top"
      title="基本信息"
      :column="3"
      :size="size"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{ details.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 客户类别 </template>
        {{ details.typeName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 社会统一信用代码 </template>
        {{ details.properlyCode }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 上级公司名称 </template>
        {{ details.parentCustomerName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 所在地区 </template>
        {{ details.province }}-{{ details.city }}-{{ details.area }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 详细地址 </template>
        {{ details.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 客户状态 </template>
        {{ details.customerType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 客户级别 </template>
        {{ details.importantCustomers }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 行业 </template>
        {{ details.industryName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 创建时间 </template>
        {{ details.createTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 备注 </template>
        {{ details.exp }}
      </el-descriptions-item>
    </el-descriptions>
    <div class="modular" style="display: flex; align-items: center">
      <div class="title">客户附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding: 0" v-else></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import { getCustQueryPageData } from '@/api/client/info.js'
import { getFileQueryFileList } from '@/api/file.js'
export default {
  components: {
    fileList
  },
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      fileList: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        project: null
      },
      tableData: [],
      tableHeader: [],
      size: '',
      details: {}
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.custId = this.details.id
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    getCustQueryPageData({
      pageNow: 1,
      pageSize: 999,
      id: this.params.custId
    }).then(res => {
      this.details = res.result.pageList[0]
      switch (this.details.importantCustomers) {
        case '1':
          this.details.importantCustomers = '普通客户'
          break
        case '2':
          this.details.importantCustomers = '重点客户'
          break
        case '3':
          this.details.importantCustomers = 'VIP客户'
          break
      }
      switch (this.details.customerType) {
        case '1':
          this.details.customerType = '已有订单'
          break
        case '2':
          this.details.customerType = '从无订单'
          break
        case '3':
          this.details.customerType = '订单中断'
          break
      }
      switch (this.details.type) {
        case '1':
          this.details.typeName = '个人'
          break
        case '2':
          this.details.typeName = '政府'
          break
        case '3':
          this.details.typeName = '事业单位'
          break
        case '4':
          this.details.typeName = '私有企业'
          break
        case '5':
          this.details.typeName = '国有企业'
          break
        case '6':
          this.details.typeName = '外资企业'
          break
        case '7':
          this.details.typeName = '合资企业'
          break
      }
      this.getListData()
    })
    getFileQueryFileList({ id: this.params.custId }).then(res => {
      this.fileList = res.result
    })
  },
  created() {}
}
</script>

<style lang="scss">
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
