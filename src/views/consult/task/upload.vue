<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
      <el-form-item :label="defaultName + ':'" slot="upload">
        <myUpload
          ref="myUpload"
          :fileType="fileType"
          :fileList="fileList"
          :delType="delType"
          :format="format"
          :accept="accept"
        ></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getFileQueryFileList} from '@/api/file.js'
export default {
  props: {
    contId: String,
    layerid: '',
    fileType: {
      type: String,
      default: '1'
    },
    delType: {
      type: String,
      default: 'not'
    },
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
    defaultName: {
      type: String,
      default: '上传附件'
    }
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {

      },
      fromItemList: [

      ],
      fileList: []
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.myUpload.uploadList.length === 0) {
        this.$share.message('请' + this.defaultName, 'warning')
        return
      }
      this.$refs.myUpload.upload(this.contId, this, this.layerid)
    }
  },
  mounted () {
    if (this.contId) {
      getFileQueryFileList({id: this.contId, type: this.fileType}).then(res => {
        this.fileList = res.result
      })
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
