<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="基本信息" :column="4" size="mimi" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          联系人名字
        </template>
       {{details.name}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          联系人电话
        </template>
       {{details.mobile}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          性别
        </template>
       {{details.sex}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          邮箱
        </template>
        {{details.email}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          地址
        </template>
        {{details.addressDetailed}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          生日
        </template>
      {{details.birthday}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          部门
        </template>
       {{details.department}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          职务
        </template>
       {{details.position}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          爱好
        </template>
       {{details.hobby}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          备注
        </template>
       {{details.remarks}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          家庭状况
        </template>
        {{details.familySituation}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">联系人附件：</div>
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
