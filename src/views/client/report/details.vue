<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="工作报告" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          报告
        </template>
        {{params.reportName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          报告类型
        </template>
        {{params.reportTypeName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          报告时间
        </template>
        {{params.reportTime}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          报告内容
        </template>
        {{params.reportContent}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建人名称
        </template>
       {{params.createUserName}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          报告状态
        </template>
        {{params.submitTypeName}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">工作报告附件：</div>
      <div class="content">
        <div v-if="fileList.length === 0">无</div>
        <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
      </div>
    </div>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import {getFileQueryFileList} from '@/api/file.js'

export default {
  components: {
    fileList
  },
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      loading: false,
      fileList: [],
      fromValiData: {
        custName: null,
        project: null
      },
      tableData: [

      ],
      tableHeader: [

      ],
      size: '',
      details: {}
    }
  },
  methods: {

  },
  mounted () {
    getFileQueryFileList({id: this.params.id}).then(res => {
      this.fileList = res.result
    })
  },
  created () {

  }
}
</script>

<style lang="scss">
  .contractDetail{
    .my-label {
      background-color: #E1F3D8 !important;
    }
  }
</style>
