<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="80">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fileList: [],
      fromValiData: {},
      rules: {},
      fromItemList: []
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      if (this.$refs.myUpload.uploadList.length > 0) {
        this.$refs.myUpload.upload(this.params.id, this, this.layerid)
      } else {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
        this.btnLoading = false
      }
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang="scss">
</style>
