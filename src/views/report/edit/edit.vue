<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
      <el-form-item label="电子版报告:" slot="upload">
        <myUpload
          ref="myUpload"
          fileType="2"
          :fileList="fileList"
        ></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getFileQueryFileList} from '../../../api/file.js'
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
        this.$share.message('请上传电子版报告', 'warning')
        return
      }
      this.$refs.myUpload.upload(this.params.reportNo, this, this.layerid)
    }
  },
  mounted () {
    if (this.params) {
      getFileQueryFileList({id: this.params.reportNo, type: '2'}).then(res => {
        this.fileList = res.result
      })
      this.fromValiData = this.params
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
