<template>
  <div class="operate-container contractDetail">
    <el-descriptions class="margin-top" title="报价记录" :column="3" :size="size" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          客户名称
        </template>
        {{params.custName}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          描述
        </template>
        {{params.offerDescribe}}
      </el-descriptions-item>
       <el-descriptions-item>
        <template slot="label">
          金额
        </template>
        {{params.offerAmountOfmoney}}
      </el-descriptions-item>

       <el-descriptions-item>
        <template slot="label">
          报价时间
        </template>
        {{params.offerTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          创建时间
        </template>
       {{params.createTime}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          状态
        </template>
        {{params.offerStateName}}
      </el-descriptions-item>
    </el-descriptions>

    <div class="modular" style="display: flex;align-items: center;">
      <div class="title">报价记录附件：</div>
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
    getListData () {
      this.loading = true
      this.fromValiData.custId = this.details.id
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
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
