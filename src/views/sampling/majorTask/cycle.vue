<!-- 周期合同 -->
<template>
  <div class="operate-container">
     <el-row :gutter="20">
      <el-col :span="11">
        <fromItem :obj="this" :fromItemList="fromItemListA" :fromValiData="details" :labelWidth="100" type='1'>
        </fromItem>
      </el-col>
      <el-col :span="13">
        <fromItem :obj="this" :fromItemList="fromItemListB" :fromValiData="details" :labelWidth="140" type='1'>
        </fromItem>
      </el-col>
    </el-row>
    <el-form :model="fromValiData" :rules="rules" ref="fromValiData" label-width="160px" class="demo-ruleForm" style="margin-top: 15px;" v-if="isShow">
      <el-form-item label="主任务周期信息:" prop="checkDetail">
        <el-checkbox-group v-model="fromValiData.checkDetail">
          <el-checkbox :label="item.label" v-for="(item,index) in checkDetailData" :key="index"></el-checkbox>
        </el-checkbox-group>
        <span style="color: red;">( 主任务提交后将无法修改 )</span>
      </el-form-item>
      <el-form-item label="下次任务开始时间:">
        <el-date-picker v-model="fromValiData.nextTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <div class="operate-button">
        <el-button @click='$layer.close(layerid)'>取消</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit('fromValiData')">保存</el-button>
      </div>
    </el-form>
    <div v-else style="margin-top: 15px;font-weight: 500;">
      <span style="margin-right: 15px;">主任务周期信息:</span><span>{{ params.checkDetail}}</span>
    </div>
  </div>
</template>

<script>
import { getContTaskQueryCycle } from '../../../api/contract/task.js'
import { getMainTaskConfirmCycle } from '../../../api/sampling/majorTask.js'
export default {
  props: {
    params: Object,
    layerid: '',
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      btnLoading: false,
      details: {
        weekTimes: 0,
        halfMonthTimes: 0,
        monthTimes: 0,
        quarterlyTimes: 0,
        halfYearTimes: 0,
        yearTimes: 0
      },
      fromItemList: [

      ],
      fromValiData: {
        checkDetail: [],
        nextTime: null
      },
      rules: {
        checkDetail: [{
          type: 'array',
          required: true,
          message: '请勾选至少一个主任务周期信息',
          trigger: 'change'
        }]
      },
      fromItemListA: [{
        label: '周测次数',
        prop: 'weekTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '半月测次数',
        prop: 'halfMonthTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '月测次数',
        prop: 'monthTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '季度测次数',
        prop: 'quarterlyTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '半年测次数',
        prop: 'halfYearTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '年测次数',
        prop: 'yearTimes',
        type: 'input',
        disabled: true,
        placeholder: ' '
      }
      ],
      fromItemListB: [{
        label: '完成周测次数',
        prop: 'weakFnishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '完成半月测次数',
        prop: 'halfmonthFinishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '完成月测次数',
        prop: 'monthFinishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '完成季度测次数',
        prop: 'quarterlyFinishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '完成半年测次数',
        prop: 'halfyearFinishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      },
      {
        label: '完成年测次数',
        prop: 'yearFinishdays',
        type: 'input',
        disabled: true,
        placeholder: ' '
      }
      ],
      checkDetailData: []
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.fromValiData.nextTime === null || this.fromItemList === '') {
            this.$confirm('下次任务开始时间未填,本次任务将为该周期合同最后一次任务, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              type: 'warning'
            }).then(() => {
              let ids = JSON.parse(JSON.stringify(this.fromValiData))
              ids.mainId = this.params.id !== null ? this.params.id : this.params.mainId
              ids.checkDetail = ids.checkDetail.join(',')
              getMainTaskConfirmCycle(ids).then(res => {
                this.$layer.close(this.layerid)
                this.$parent.getListData()
                this.$share.message()
              })
            })
          } else {
            let ids = JSON.parse(JSON.stringify(this.fromValiData))
            ids.mainId = this.params.id !== null ? this.params.id : this.params.mainId
            ids.checkDetail = ids.checkDetail.join(',')
            getMainTaskConfirmCycle(ids).then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
            })
          }
        }
      })
    }
  },
  mounted () {
    getContTaskQueryCycle({
      contId: this.params.contId
    }).then(res => {
      if (res.result !== null) {
        let x = res.result
        this.details = x
        if (x.weekTimes - x.weakFnishdays > 0) {
          this.checkDetailData.push({
            label: '周测'
          })
        }
        if (x.halfMonthTimes - x.halfmonthFinishdays > 0) {
          this.checkDetailData.push({
            label: '半月测'
          })
        }
        if (x.monthTimes - x.monthFinishdays > 0) {
          this.checkDetailData.push({
            label: '月测'
          })
        }
        if (x.quarterlyTimes - x.quarterlyFinishdays > 0) {
          this.checkDetailData.push({
            label: '季度测'
          })
        }
        if (x.halfYearTimes - x.halfyearFinishdays > 0) {
          this.checkDetailData.push({
            label: '半年测'
          })
        }
        if (x.yearTimes - x.yearFinishdays > 0) {
          this.checkDetailData.push({
            label: '年测'
          })
        }
      }
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
