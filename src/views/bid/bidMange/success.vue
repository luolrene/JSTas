<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="100"
      >
       <el-form-item label="附件上传:" slot="upload">
        <myUpload ref="myUpload" fileType="4" :fileList="fileList"></myUpload>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import { getCrmBiddingAddOrModify } from '@/api/bid/bid.js'
import { validateNumber } from '@/utils/public.js'
import { getFileQueryFileList } from '@/api/file.js'
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
      rules: {
        situationOffer: [
          {
            required: true,
            message: '请填写竞争对手最终报价',
            trigger: 'blur'
          },
          { validator: validateNumber, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '竞争对手报价',
          prop: 'situationOffer',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '竞争对手得分',
          prop: 'situationScore',
          value: '',
          type: 'input'
        },
        {
          label: '备注',
          prop: 'situationRemarks',
          value: '',
          type: 'input'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmBiddingAddOrModify(this.fromValiData)
        .then(res => {
          console.log(res);

          if (this.$refs.myUpload.uploadList.length > 0) {
            this.$refs.myUpload.upload(res.result.situationFile, this, this.layerid)
          } else {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
            this.btnLoading = false
          }
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.projectNode = '5'
      getFileQueryFileList({ id: this.params.situationFile, type: '4' }).then(res => {
        this.fileList = res.result
      })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
