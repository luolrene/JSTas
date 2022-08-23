<template>
 <div style="display: flex;">
   <template v-if="params.status === '3' || params.status === '0'">
     <div style="width: 400px;display: flex;justify-content: center;">
       <el-upload
         class="upload-demo"
         drag
         :headers="headers"
         :data="uploadData"
         :action="uploadAction"
         :format="format"
         :accept="accept"
         :on-success="onSuccess"
         :show-file-list="false"
         multiple>
         <i class="el-icon-upload"></i>
         <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
       </el-upload>
     </div>
     <div style="width: calc(100% - 400px);">
       <el-divider>未标记</el-divider>
       <tableItem
       :obj="this"
       :tableData="tableData_A"
       :tableHeader="tableHeader_A"
       :button="button"
       :loading="loading"
       :isPage="false"
       :isSelection="false"></tableItem>

       <el-divider><span style="color: red;">已标记</span></el-divider>
       <tableItem
       :obj="this"
       :tableData="tableData_B"
       :tableHeader="tableHeader_B"
       :button="button"
       :loading="loading"
       :isPage="false"
       :isSelection="false"></tableItem>
     </div>
   </template>
   <template v-else>
     <div style="width: 100%">
       <el-divider>未标记</el-divider>
       <tableItem
       :obj="this"
       :tableData="tableData_A"
       :tableHeader="tableHeader_A"
       :button="button"
       :loading="loading"
       :isPage="false"
       :isSelection="false"></tableItem>

       <el-divider><span style="color: red;">已标记</span></el-divider>
       <tableItem
       :obj="this"
       :tableData="tableData_B"
       :tableHeader="tableHeader_B"
       :button="button"
       :loading="loading"
       :isPage="false"
       :isSelection="false"></tableItem>
     </div>
   </template>
 </div>

</template>

<script>
import preview from '../../common/preview.vue'
import {getOriginalCyQueryFileList, getOriginalCyDelFile} from '../../../api/check/checkTask.js'
export default {
  props: {
    params: Object,
    format: {
      type: Array,
      default: function () {
        return ['doc', 'docx', 'xlsx', 'xls']
      }
    },
    accept: {
      type: String,
      default: '.doc,.docx,.xlsx,.xls'
    }
  },
  data () {
    return {
      loading: false,
      uploadData: {},
      uploadAction: process.env.BASE_API + process.env.JS_Server + '/originalCy/upload',
      headers: {token: this.$store.getters.userInfo.token},

      fromValiData: {},
      tableData_A: [],
      tableData_B: [],
      tableHeader_A: [{
        prop: 'loadName',
        label: '原始记录名称',
        width: 240
      }, {
        prop: 'fileNo',
        label: '编号',
        width: 120
      }, {
        prop: 'operName',
        label: '上传人/电话号码',
        width: 140
      }, {
        prop: 'loadTime',
        label: '上传时间',
        width: 120
      }],
      tableHeader_B: [{
        prop: 'loadName',
        label: '原始记录名称',
        width: 240
      }, {
        prop: 'fileNo',
        label: '编号',
        width: 120
      }, {
        prop: 'returnReason',
        label: '标记描述',
        width: 120,
        condition: params => {
          return 'red'
        }
      }, {
        prop: 'operName',
        label: '上传人/电话号码',
        width: 140
      }, {
        prop: 'loadTime',
        label: '上传时间',
        width: 120
      }],
      button: {
        width: 240,
        buttonList: [
          {name: '预览',
            type: 'primary',
            click: 'handlePreview'
          },
          {name: '下载',
            type: 'primary',
            click: 'handleDownLoad'
          },
          {name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (this.params.status === '0' || this.params.status === '3') {
                return true
              }
            }}
        ]
      },
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    getListData_A() {
      this.loading = true
      let ids = {...this.fromValiData}
      ids.sign = '0'
      ids.isZreo = '1'
      getOriginalCyQueryFileList(ids).then(res => {
        this.tableData_A = res.result
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getListData_B() {
      this.loading = true
      let ids = {...this.fromValiData}
      ids.sign = '1'
      ids.isZreo = '1'
      getOriginalCyQueryFileList(ids).then(res => {
        this.tableData_B = res.result
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    onSuccess(response, file, fileList) {
      if (response.code === 0) {
        this.$share.message('上传成功')
        this.getListData_A()
      } else {
        this.$share.message(response.message, 'error')
      }
    },
    handlePreview(params) {
      this.$layer.iframe({
        content: {
          content: preview, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            Interface: '/originalCy/download'
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '预览',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDownLoad(params) {
      window.open(this.host + '/originalCy/download?' + 'fileId=' + params.id + '&token=' + this.$store.getters.userInfo.token)
    },
    handleDelete (params) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getOriginalCyDelFile({fileId: params.id}).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData_A()
          })
        }
      })
    }
  },
  mounted () {
    this.getListData_A()
    this.getListData_B()
  },
  created () {
    this.uploadData.type = '2'
    this.uploadData.reportNo = this.params.reportNo
    this.fromValiData.reportNo = this.params.reportNo
  }
}
</script>

<style scoped lang="scss">

</style>
