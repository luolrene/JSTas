<template>
  <div class="operate-container">
    <el-form ref="fromValiData" :model="fromValiData" :rules="rules" label-width="80px">
      <el-form-item prop="reportFileNo" label="" style="margin-bottom: 22px;" label-width="0">
        <el-radio-group v-model="fromValiData.reportFileNo" style="display: flex;flex-direction: column;max-height: 460px;overflow-y: scroll;">
          <el-radio
            v-for="(item,index) in tableData"
            :key="index"
            :label="item.id">
            {{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="fromValiData.reportFileNo === 'F_59'">
        <el-form-item prop="firstTitleName" label="模板标题">
          <el-select v-model="fromValiData.firstTitleName" placeholder="请选择模板标题">
            <el-option label="受检单位" value="受检单位"></el-option>
            <el-option label="项目名称" value="项目名称"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="firstTitleValue" label="模板内容" style="margin-bottom: 0;" >
          <el-input
            v-model.trim="fromValiData.firstTitleValue"
            placeholder="请填写模板内容"
            type="text"></el-input>
        </el-form-item>
      </div>
      <el-form-item prop="yqcs" label="烟气参数" style="margin-bottom: 0;" v-else-if="fromValiData.reportFileNo === 'F_64'">
        <el-select v-model="fromValiData.yqcs" placeholder="请选择烟气参数" multiple style="width: 80%;">
          <el-option label="温度" value="1"></el-option>
          <el-option label="压力" value="2"></el-option>
          <el-option label="含湿量" value="3"></el-option>
          <el-option label="含氧量" value="4"></el-option>
          <el-option label="流速" value="5"></el-option>
          <el-option label="流量" value="6"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div style="position: absolute;bottom: 30px;right: 30px;">
      <span style="color: #FF798D;font-size: 14px;margin-right: 5px;">(生成报告会删除所有旧的报告文件，重新生成)</span>
      <el-button
        @click="handleGenerate"
        type="primary"
        :size="$layer_Size.buttonSize">生成报告</el-button>
    </div>
  </div>
</template>

<script>
import {getMyreportGetReportModels, getMyreportProduct} from '@/api/report/edit.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      fromValiData: {
        reportFileNo: ''
      },
      rules: {
        reportFileNo: [
          { required: true, message: '请选择报告模板', trigger: 'change' }
        ],
        firstTitleName: [
          { required: true, message: '请选择模板标题', trigger: 'change' }
        ],
        firstTitleValue: [
          { required: true, message: '请填写模板内容', trigger: 'change' }
        ],
        yqcs: [
          { type: 'array', required: true, message: '请至少选择一个烟气参数', trigger: 'change' }
        ]
      },

      tableData: []
    }
  },
  methods: {
    getListData() {
      getMyreportGetReportModels().then(res => {
        this.tableData = res.result
      })
    },
    handleGenerate() {
      this.$refs['fromValiData'].validate(valid => {
        if (valid) {
          let ids = {...this.fromValiData}
          if (this.fromValiData.reportFileNo === 'F_64') {
            ids.yqcs = this.fromValiData.yqcs.join(',')
          } else if (this.fromValiData.reportFileNo === 'F_59') {

          } else {
            delete ids.yqcs
            delete ids.firstTitleName
            delete ids.firstTitleValue
          }
          getMyreportProduct(ids).then(res => {
            this.$share.message('报告生成中，请稍后查看')
            this.$layer.close(this.layerid)
          })
        }
      })
    }
  },
  mounted () {
    this.fromValiData.reportNo = this.params.reportNo
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
>>> .el-radio{
  margin-bottom: 10px;
}
</style>
