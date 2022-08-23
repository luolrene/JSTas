<template>
  <div class="operate-container">
    <el-upload
      class="upload-demo"
      ref="uploader"
      :action="uploadAction"
      :headers="headers"
      :data="uploadData"
      :file-list="uploadList"

      :accept="accept"
      :auto-upload="autoUpload"
      :on-change="checkFile"
      :before-remove="removeCheck"
      :multiple="multiple"
      drag>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" style="color: red;" class="el-upload__tip">
        <i class="el-icon-warning" style="color:red;margin-right:5px"></i>
        最多能上传{{this.limit}}个文件，格式：{{this.format}}
      </div>
    </el-upload>
   <div style="width: 100%;height: 1px;border-bottom: 1px dashed black;margin-top: 8px;"></div>
   <fileList :fileList="fileList" @delFile="delFile" :delType="delType"></fileList>
  </div>
</template>

<script>
import fileList from '../fileList.vue'
import {getFileDelFile} from '../../../api/file.js'
export default {
  components: {
    fileList
  },
  props: {
    format: {
      type: Array,
      default: function () {
        return ['jpg', 'jpeg', 'png', 'doc', 'docx', 'pdf', 'xlsx', 'xls', 'rar', 'zip']
      }
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.doc,.docx,.pdf,.xlsx,.xls,.rar,.zip'
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 20
    },
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    fileType: {
      type: String,
      default: '1'
    },
    delType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      uploadAction: process.env.BASE_API + process.env.JS_Server + '/file/upload',
      uploadData: {},
      headers: {token: this.$store.getters.userInfo.token},
      uploadList: []
    }
  },
  methods: {
    upload (data, that, layerid) {
      this.uploadData.id = data
      this.uploadData.type = this.fileType
      if (this.uploadList.length > 0) {
        this.$refs.uploader.submit()
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        that.$layer.close(layerid)
        that.$parent.getListData()
      }
    },
    // 文件状态改变时
    checkFile (file, fileList) {
      if (this.beforeAvatarUpload(file, fileList)) {
        this.uploadList = fileList
        // return new Promise(resolve => {
        //   this.uploadList.push(file)
        // })
      }
    },
    beforeAvatarUpload (file, fileList) {
      var FileExt = file.name.replace(/.+\./, '')
      // const isLt5M = file.size / 1024 / 1024 <= 5
      if (this.format.indexOf(FileExt.toLowerCase()) === -1) {
        fileList.splice(fileList.indexOf(file), 1)
        this.$message.warning('请上传正确格式的文件！')
        return false
      }
      // if (!isLt5M) {
      //   fileList.splice(fileList.indexOf(file), 1)
      //   this.$message.warning('上传单个文件大小不能超过5MB!')
      //   return false
      // }
      if (this.fileList.length + this.uploadList.length >= this.limit) {
        fileList.splice(fileList.indexOf(file), 1)
        this.$message.warning('上传数量超限!')
        return false
      }
      return true
    },
    // 删除
    removeCheck (id) {
      console.log(id)
    },
    // 删除-已上传文件
    delFile (item) {
      this.$confirm('此操作将删除已提交过的附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getFileDelFile({fileId: item.id, type: this.fileType}).then(res => {
          let obj = this.fileList.findIndex(xdd => xdd.id === item.id)
          this.fileList.splice(obj, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {

  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
