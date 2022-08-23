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
        {{details.contName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          合同编号
        </template>
        {{details.contNo}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          开票状态
        </template>
        {{details.stateName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          开票时间
        </template>
        {{details.billTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          开票金额
        </template>
        {{details.billMoney}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          开票类型
        </template>
        {{details.billTypeName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          开票备注
        </template>
        {{details.remark}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          其他备注
        </template>
        {{details.exp}}
      </el-descriptions-item>
    </el-descriptions>

    <!-- <div class="modular" style="display: flex;align-items: center;  margin-top:10px;">
      <div class="title">开票附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList1" style="padding:0;" v-else></fileList>
      </div>
    </div> -->
  </div>
</template>

<script>
import fileList from '../../../common/fileList.vue'
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
  created() { }
}
</script>

<style lang="scss">
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
