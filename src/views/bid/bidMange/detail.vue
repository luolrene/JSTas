<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="项目信息" :column="3" size="mimi" border>
      <el-descriptions-item>
        <template slot="label">
          客户名称
        </template>
        {{details.custName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          项目名称
        </template>
        {{details.opportunityName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          项目限价
        </template>
        {{details.fixedPrice}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          开标时间
        </template>
        {{details.startTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          项目节点
        </template>
        {{details.projectNodeName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          备注
        </template>
        {{details.remarks}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          竞争对手最终报价
        </template>
        {{details.situationOffer}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          竞争对手最终得分
        </template>
        {{details.situationScore}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          投标情况备注
        </template>
        {{details.situationRemarks}}
      </el-descriptions-item>

    </el-descriptions>

    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">初始投标附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">最终投标附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList1" style="padding:0;" v-else></fileList>
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
      fileList1: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      details: {}
    }
  },
  methods: {},
  mounted() {
    this.details = JSON.parse(JSON.stringify(this.params))
    if (this.params) {
      this.fromValiData = this.params
    }
    getFileQueryFileList({ id: this.params.id }).then(res => {
      this.fileList = res.result
    })
    getFileQueryFileList({ id: this.params.situationFile }).then(res => {
      this.fileList1 = res.result
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
