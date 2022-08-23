<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="30" style="height: 100%;">
      <el-col :span="9" style="height: 100%;">
        <fromItem ref="myFromItem" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" type="preview" :labelWidth="130">
          <div class="modular" style="display: flex;align-items: center;">
            <div class="title">附件：</div>
            <div class="content">
              <div v-if="fileList.length === 0">无</div>
              <fileList :fileList="fileList" style="padding:0;" v-else delType="not"></fileList>
            </div>
          </div>
        </fromItem>
      </el-col>
      <el-col :span="7" v-if="checkLogList.length > 0">
        <el-scrollbar class="page-component__scroll" :native="false" style="height: 100%;">
          <div class="block" style="padding-right: 40px;">
            <el-timeline style="padding-left: 20px;">
              <el-timeline-item :timestamp="item.operTime" placement="top" v-for="(item,index) in checkLogList" :key="index" :color="optinColor">
                <el-card>
                  <h4 class="content_a">
                    <span style="margin-right: 15px;">步骤{{item.step}}</span>
                    <span :style="{color:optinColor}">{{item.option}}</span>
                  </h4>
                  <div class="content_a">
                    <span>{{item.oper}}</span>
                    <span>{{item.operMobile}}</span>
                  </div>
                  <div v-if="item.exp !== null && item.exp !==''" class="content_b">
                    审核备注：{{item.exp}}
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="7" v-else style="text-align: center;">
        暂无审核日志
      </el-col>
      <el-col :span="8">
        <h3 style="text-align: center;">变更合同审核</h3>
        <fromItem ref="mySecondFromItem" :obj="this" :layerid="layerid" :fromItemList="secondFromItemList" :fromValiData="secondForm" :rules="secondRules" :labelWidth="100" :btnLoading="btnLoading" scrollbarHeight="280px">
        </fromItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCheckTaskQueryLogs, getCheckTaskAddCheckLog} from '../../../api/verity/contractVerity.js'
import fileList from '@/views/common/fileList.vue'
import { getFileQueryFileList } from '@/api/file.js'
export default {
  components: {
    fileList
  },
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      optinColor: '#01AB91',
      fromValiData: {
        custName: '',
        seller: '',
        officeName: '',
        office: '',
        reportNum: '2'
      },
      rules: {},
      fromItemList: [
        { label: '项目名称', prop: 'proName', type: 'input', disabled: true },
        { label: '客户名称', prop: 'custName', type: 'input', disabled: true },
        {
          label: '旧合同金额',
          prop: 'oldMoney',
          type: 'input',
          disabled: true
        },
        {
          label: '新合同金额',
          prop: 'newMoney',
          type: 'input',
          disabled: true
        },
        {
          label: '旧报告任务数',
          prop: 'oldReportTaskNum',
          type: 'input',
          disabled: true
        },
        {
          label: '新报告任务数',
          prop: 'newReportTaskNum',
          type: 'input',
          disabled: true
        },
        {
          label: '是否包含方案修改',
          prop: 'hasCaseName',
          type: 'input',
          disabled: true
        },

        {
          label: '变更描述',
          prop: 'changeDetail',
          type: 'textarea',
          disabled: true
        },
        {
          label: '流程名称',
          prop: 'checkPathName',
          type: 'input',
          disabled: true
        }
      ],
      secondForm: {},
      secondRules: {
        option: [{ required: true, message: '请填写审核意见', trigger: 'blur' }]
      },
      secondFromItemList: [
        {
          label: '审核意见',
          prop: 'option',
          value: '',
          type: 'radio',
          isRqd: true,
          data: [{ label: '1', name: '同意' }, { label: '2', name: '拒绝' }]
        },
        {
          label: '审核备注',
          prop: 'exp',
          value: '',
          type: 'textarea',
          isRqd: false
        }
      ],
      checkLogList: [], // 审核日志列表
      fileList: []
    }
  },
  methods: {
    onSubmit(type) {
      this.secondForm.father = this.params.checkTask
      this.btnLoading = true
      getCheckTaskAddCheckLog(this.secondForm)
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      console.log(this.fromValiData)
      this.fromValiData.hasCaseName = this.fromValiData.hasCase === '1' ? '是' : '否'
      getCheckTaskQueryLogs({ taskId: this.params.checkTask }).then(res => {
        res.result.logList.forEach(xdd => {
          if (xdd.option === '1') {
            xdd.option = '同意'
            this.optinColor = '#01AB91'
          } else {
            xdd.option = '拒绝'
            this.optinColor = '#FF798D'
          }
        })
        this.checkLogList = res.result.logList
      })

      getFileQueryFileList({ id: this.params.contId, type: '1' }).then(res => {
        this.fileList = res.result
      })
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
.content_a {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.content_b {
  word-wrap: break-word;
  width: 100%;
  line-height: 20px;
}
</style>
