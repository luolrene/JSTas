<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload
          ref="myUpload"
          fileType="5"
          :fileList="fileList"
          delType="not"
        ></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getFileQueryFileList} from '@/api/file.js'
export default {
  props: {
    params: Object,
    layerid: ''
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
        this.$share.message('请上传附件', 'warning')
        return
      }
      this.$refs.myUpload.upload(this.params.id, this, this.layerid)
    }
  },
  mounted () {
    if (this.params) {
      getFileQueryFileList({id: this.params.id, type: '5'}).then(res => {
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
