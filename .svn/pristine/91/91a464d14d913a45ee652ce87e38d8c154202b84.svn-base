
<template>
  <div class="operate-container">
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="30" style="height: 100%;">
      <el-col :span="10" style="height: 100%;">
        <fromItem ref="myFromItem" :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :rules="rules" type="preview" :labelWidth="130">
          <div class="title">投标附件：</div>
          <fileList :fileList="fileList" type="preview"></fileList>
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
      <el-col :span="7">
        <h3 style="text-align: center;">招投标审核</h3>
        <fromItem id="father" ref="mySecondFromItem" :obj="this" :layerid="layerid" :fromItemList="secondFromItemList" :fromValiData="secondForm" :rules="secondRules" :labelWidth="100" scrollbarHeight="280px">
        </fromItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import { getCrmBiddingToExamineLogDetailed } from '@/api/bid/bid.js'
import { getFileQueryFileList } from '@/api/file.js'
import { getCheckTaskAddCheckLog } from '@/api/verity/contractVerity.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    fileList
  },
  data() {
    return {
      optinColor: '#01AB91',
      fromValiData: {},
      rules: {},
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'input',
          click: 'getCustId',
          disabled: true
        },
        {
          label: '是否关联销售机会',
          prop: 'opportunity',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '项目名称',
          prop: 'opportunityName',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '项目限价',
          prop: 'fixedPrice',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          prop: 'startTime',
          label: '开标时间',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '当前审核步骤',
          prop: 'step',
          value: '',
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
      fileList: [],
      checkLogList: [] // 审核日志列表
    }
  },
  methods: {
    onSubmit(type) {
      this.secondForm.father = this.params.checkTaskId
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
      this.params.opportunity === '1'
        ? (this.params.opportunity = '是')
        : (this.params.opportunity = '否')
      getFileQueryFileList({ id: this.params.id }).then(res => {
        this.fileList = res.result
      })
      getCrmBiddingToExamineLogDetailed({
        father: this.params.checkTaskId
      }).then(res => {
        res.result.forEach(xdd => {
          if (xdd.option === '1') {
            xdd.option = '同意'
            this.optinColor = '#01AB91'
          } else {
            xdd.option = '拒绝'
            this.optinColor = '#FF798D'
          }
        })
        this.checkLogList = res.result
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
