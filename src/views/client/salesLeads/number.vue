<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="基本信息" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{params.custName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          联系人名称
        </template>
        {{params.contactsName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          销售机会名称
        </template>
        {{params.opportunityName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          销售机会编号
        </template>
        {{params.opportunityId}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          销售阶段
        </template>
        {{params.stageName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          关联产品
        </template>
        {{params.relation}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          预计金额
        </template>
        {{params.estimatedAmount}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          预计结束时间
        </template>
        {{params.estimatedTime}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">销售机会附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
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
    getFileQueryFileList({ id: this.params.id }).then(res => {
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
