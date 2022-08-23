<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="30" style="height: 100%;">
      <el-col :span="10" style="height: 100%;">
        <fromItem
          ref="myFromItem"
          :obj="this"
          :layerid="layerid"
          :fromItemList="fromItemList"
          :fromValiData="fromValiData"
          :rules="rules"
          type="preview"
          :labelWidth="100">
          <fileList :fileList="fileList" type="preview"></fileList>
        </fromItem>
      </el-col>
      <el-col :span="10">
        <h3 style="text-align: center;">报告审核</h3>
        <fromItem
          ref="mySecondFromItem"
          :obj="this"
          :layerid="layerid"
          :fromItemList="secondFromItemList"
          :fromValiData="secondForm"
          :rules="secondRules"
          :labelWidth="100"
          submitName="提交"
          scrollbarHeight="200px">
          <el-form-item label="二审审核人员:" v-if="secondForm.option === '1' && params.status ==='1_1'">
            <el-select v-model="secondForm.user" placeholder="请选择二审审核人员" value-key="mobile">
               <el-option
                 v-for="item in userData"
                 :key="item.mobile"
                 :label="item.name"
                 :value="item">
               </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="拒绝原因:" v-else-if="secondForm.option === '0'">
            <el-input type="textarea" v-model="secondForm.returnReason" placeholder="请输入拒绝原因"></el-input>
          </el-form-item>
        </fromItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import {getFileQueryFileList} from '../../../api/file.js'
import {getUserQueryPageData} from '../../../api/jcxxgl/user.js'
import {getReportEditCommitToCheck} from '../../../api/report/edit.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    fileList
  },
  data () {
    return {
      fromValiData: {

      },
      rules: {

      },
      fromItemList: [
        {label: '报告编号', prop: 'reportNo', type: 'input', disabled: true},
        {label: '客户名称', prop: 'custName', type: 'input', disabled: true}
      ],
      secondForm: {
        returnReason: ''
      },
      secondRules: {
        option: [{ required: true, message: '请选择审核意见', trigger: 'blur' }]
      },
      secondFromItemList: [
        {label: '审核意见', prop: 'option', value: '', type: 'radio', isRqd: true, data: [{label: '1', name: '同意'}, {label: '0', name: '拒绝'}]}
      ],
      fileList: []
    }
  },
  methods: {
    onSubmit (type) {
      let ids = JSON.parse(JSON.stringify(this.params))
      if (this.secondForm.option === '0') {
        if (this.secondForm.returnReason === null || this.secondForm.returnReason === '') {
          this.$share.message('请填写拒绝原因', 'warning')
          return
        }
        switch (this.params.status) {
          case '1_1':
            ids.firstOption = this.secondForm.option
            ids.returnReason = this.secondForm.returnReason
            break
          case '1_2':
            ids.secondOption = this.secondForm.option
            ids.returnReason = this.secondForm.returnReason
            break
        }
      } else if (this.secondForm.option === '1') {
        switch (this.params.status) {
          case '1_1':
            if (this.secondForm.user !== undefined && this.secondForm.user !== null) {
              ids.secondCheck = this.secondForm.user.mobile
              ids.secondCheckName = this.secondForm.user.name
            }
            ids.firstOption = this.secondForm.option
            break
          case '1_2':
            ids.secondOption = this.secondForm.option
            break
        }
      }
      getReportEditCommitToCheck(ids).then(res => {
        this.$parent.getListData()
        this.$share.message('提交成功', 'success')
        this.$layer.close(this.layerid)
      })
    },
    getUserData () {
      let ids = {pageSize: 99999, pageNow: 1, checkType: '2'}
      getUserQueryPageData(ids).then(res => {
        this.userData = res.result.pageList
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  },
  mounted () {
    if (this.params) {
      this.fromValiData = this.params
      getFileQueryFileList({id: this.params.reportNo, type: '2'}).then(res => {
        this.fileList = res.result
      })
    }
    this.getUserData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .content_a{
    display: flex;justify-content: space-between;margin-bottom: 10px;
  }
  .content_b{
    word-wrap:break-word; width: 100%;line-height: 20px;
  }
</style>
