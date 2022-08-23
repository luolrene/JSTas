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
        {{ details.custName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 联系人 </template>
        {{ details.contactsName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 计划名称 </template>
        {{ details.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 拜访目的 </template>
        {{ details.objective }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 计划时间 </template>
        {{ details.executorTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 备注 </template>
        {{ details.remarks }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 提醒 </template>
        {{ details.remind }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 延期时间 </template>
        {{ details.delayTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 延期原因 </template>
        {{ details.delayReason }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 延期备注 </template>
        {{ details.delayRemarks }}
      </el-descriptions-item>
    </el-descriptions>

    <div class="modular" style="display: flex; align-items: center">
      <div class="title">访客计划附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding: 0" v-else></fileList>
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
    this.details = this.params
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
