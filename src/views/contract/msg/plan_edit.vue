<template>
  <div class="operate-container">
    <fromItem
      ref="myFromItem"
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="100">
      <el-form-item label="附件上传:" slot="upload">
        <myUpload
          ref="myUpload"
          fileType="3"
          :fileList="fileList"
        ></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getContProgramAddOrModifyProgram} from '../../../api/contract/msg.js'
import {getFileQueryFileList} from '../../../api/file.js'
export default {
  props: {
    addParams: Object,
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {

      },
      rules: {
        name: [{ required: true, message: '请填写方案名称', trigger: 'blur' }]
      },
      fromItemList: [
        {label: '方案名称', prop: 'name', value: '', type: 'input', isRqd: true}
      ],
      fileList: []
    }
  },
  methods: {
    onSubmit (type) {
      this.btnLoading = true
      getContProgramAddOrModifyProgram(this.fromValiData).then(res => {
        if (this.$refs.myUpload.uploadList.length > 0) {
          this.$refs.myUpload.upload(res.result, this, this.layerid)
        } else {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        }
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {

  },
  created () {
    if (this.addParams) {
      this.fromValiData.contId = this.addParams.id
    } else {
      this.fromValiData = this.params

      getFileQueryFileList({id: this.params.id, type: '3'}).then(res => {
        this.fileList = res.result
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
