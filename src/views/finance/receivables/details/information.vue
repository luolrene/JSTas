<!-- 资产明细 -->
<template>
    <div class='operate-container'>
        <div class="btn">
            <span class="span1" @click="download" v-show="show_1">
                <i class="el-icon-document"></i>台账导出
                </span>
        </div>
        <el-descriptions title='合同基本信息' :column='4' :size='size' border>
            <el-descriptions-item label='合同日期'>{{contractData.startTime}} </el-descriptions-item>
            <el-descriptions-item label='报告编号'>{{contractData.typeName}} </el-descriptions-item>
            <el-descriptions-item label='旧合同编号'>{{contractData.typeName}} </el-descriptions-item>
            <el-descriptions-item label='新合同编号'>{{contractData.contNo}} </el-descriptions-item>
            <el-descriptions-item label='业务类别'>{{contractData.busiTypeName}} </el-descriptions-item>
            <el-descriptions-item label='市场经理部门'>{{contractData.managerGroupNames}} </el-descriptions-item>
            <el-descriptions-item label='区域'>{{contractData.area}} </el-descriptions-item>
            <el-descriptions-item label='市场经理'>{{contractData.managerUserNames}} </el-descriptions-item>
            <el-descriptions-item label='委托方'>{{contractData.custName}} </el-descriptions-item>
            <el-descriptions-item label='受检方'>{{contractData.project}} </el-descriptions-item>
            <el-descriptions-item label='联系人'>{{contractData.contacts}} </el-descriptions-item>
            <el-descriptions-item label='联系人电话'>{{contractData.contactsMobile}} </el-descriptions-item>
            <el-descriptions-item label='地址'>{{contractData.address}} </el-descriptions-item>
            <el-descriptions-item label='行业类别'>{{contractData.industryName}} </el-descriptions-item>
            <el-descriptions-item label='合同类型'>{{contractData.plateName}} </el-descriptions-item>
            <el-descriptions-item label='报告备注'>{{contractData.typeName}} </el-descriptions-item>
            <el-descriptions-item label='付款方式'>{{contractData.payTypeName}} </el-descriptions-item>
            <el-descriptions-item label='价格系数'>{{contractData.discount}} </el-descriptions-item>
            <el-descriptions-item label='合同签订金额'>{{contractData.price}} </el-descriptions-item>
            <el-descriptions-item label='实际合同签订金额'>{{contractData.typeName}} </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title='服务费' :column='4' :size='size' border style='margin-top:10px;'>
            <el-descriptions-item label='实际金额'>{{serviceData}}</el-descriptions-item>
        </el-descriptions>
        <div class="btn">
            <el-button size="mini" type="primary" @click="changeShow_1" v-show="!show_1">开票情况</el-button>
            <span class="span" @click="changeHide_1" v-show="show_1">︽收起</span>
        </div>
        <el-descriptions title='开票情况' :column='4' :size='size' border style='margin-top:10px;' v-if="show_1">
            <el-descriptions-item label='开票单位'>{{billingData.custName}} </el-descriptions-item>
            <el-descriptions-item label='已开票金额'>{{billingData.sum}} </el-descriptions-item>
            <el-descriptions-item label='第一次开票时间'>{{billingData.time1}} </el-descriptions-item>
            <el-descriptions-item label='第一次开票金额'>{{billingData.money1}}</el-descriptions-item >
            <!-- <el-descriptions-item v-for="(item,index) in num" :key="index" :label="'第'+item+'次开票时间'" v-html="`billingData.time${item}`">{{billingData.timeitem}}</el-descriptions-item> -->
            <el-descriptions-item v-if="billingData.time2" label='第二次开票时间'>{{billingData.time2}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money2" label='第二次开票金额'>{{billingData.money2}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time3" label='第三次开票时间'>{{billingData.time3}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money3" label='第三次开票金额'>{{billingData.money3}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time4" label='第四次开票时间'>{{billingData.time4}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money4" label='第四次开票金额'>{{billingData.money4}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time5" label='第五次开票时间'>{{billingData.time5}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money5" label='第五次开票金额'>{{billingData.money5}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time6" label='第六次开票时间'>{{billingData.time6}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money6" label='第六次开票金额'>{{billingData.money6}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time7" label='第七次开票时间'>{{billingData.time7}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money7" label='第七次开票金额'>{{billingData.money7}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time8" label='第八次开票时间'>{{billingData.time8}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money8" label='第八次开票金额'>{{billingData.money8}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time9" label='第九次开票时间'>{{billingData.time9}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money9" label='第九次开票金额'>{{billingData.money9}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time10" label='第十次开票时间'>{{billingData.time10}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money10" label='第十次开票金额'>{{billingData.money10}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time11" label='第十一次开票时间'>{{billingData.time11}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money11" label='第十一次开票金额'>{{billingData.money11}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time12" label='第十二次开票时间'>{{billingData.time12}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money12" label='第十二次开票金额'>{{billingData.money12}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time13" label='第十三次开票时间'>{{billingData.time13}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money13" label='第十三次开票金额'>{{billingData.money13}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time14" label='第十四次开票时间'>{{billingData.time14}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money14" label='第十四次开票金额'>{{billingData.money14}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time15" label='第十五次开票时间'>{{billingData.time15}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money15" label='第十五次开票金额'>{{billingData.money15}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time16" label='第十六次开票时间'>{{billingData.time16}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money16" label='第十六次开票金额'>{{billingData.money16}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time17" label='第十七次开票时间'>{{billingData.time17}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money17" label='第十七次开票金额'>{{billingData.money17}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time18" label='第十八次开票时间'>{{billingData.time18}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money18" label='第十八次开票金额'>{{billingData.money18}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time19" label='第十九次开票时间'>{{billingData.time19}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money19" label='第十九次开票金额'>{{billingData.money19}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.time20" label='第二十次开票时间'>{{billingData.time20}} </el-descriptions-item>
            <el-descriptions-item v-if="billingData.money20" label='第二十次开票金额'>{{billingData.money20}} </el-descriptions-item>
        </el-descriptions>
        <div class="btn">
            <el-button size="mini" type="primary" @click="changeShow_2" v-show="!show_2">回款详情</el-button>
            <span class="span" @click="changeHide_2" v-show="show_2">︽收起</span>
        </div>
        <el-descriptions title='回款情况' :column='4' :size='size' border style='margin-top:10px;' v-if="show_2">
            <el-descriptions-item  label='已回款金额汇总'>{{returnedData.sum}}</el-descriptions-item>
            <el-descriptions-item  label='未回款金额汇总'>{{returnedData.notSum}}</el-descriptions-item>
            <el-descriptions-item  label='第一次回款时间'>{{returnedData.time1}}</el-descriptions-item>
            <el-descriptions-item  label='第一次回款金额'>{{returnedData.money1}}</el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time2" label='第二次回款时间'>{{returnedData.time2}}</el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money2" label='第二次回款金额'>{{returnedData.money2}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time3" label='第三次回款时间'>{{returnedData.time3}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money3" label='第三次回款金额'>{{returnedData.money3}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time4" label='第四次回款时间'>{{returnedData.time4}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money4" label='第四次回款金额'>{{returnedData.money4}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time5" label='第五次回款时间'>{{returnedData.time5}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money5" label='第五次回款金额'>{{returnedData.money5}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time6" label='第六次回款时间'>{{returnedData.time6}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money6" label='第六次回款金额'>{{returnedData.money6}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time7" label='第七次回款时间'>{{returnedData.time7}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money7" label='第七次回款金额'>{{returnedData.money7}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time8" label='第八次回款时间'>{{returnedData.time8}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money8" label='第八次回款金额'>{{returnedData.money8}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time9" label='第九次回款时间'>{{returnedData.time9}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money9" label='第九次回款金额'>{{returnedData.money9}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time10" label='第十次回款时间'>{{returnedData.time10}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money10" label='第十次回款金额'>{{returnedData.money10}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time11" label='第十一次回款时间'>{{returnedData.time11}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money11" label='第十一次回款金额'>{{returnedData.money11}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time12" label='第十二次回款时间'>{{returnedData.time12}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money12" label='第十二次回款金额'>{{returnedData.money12}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time13" label='第十三次回款时间'>{{returnedData.time13}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money13" label='第十三次回款金额'>{{returnedData.money13}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time14" label='第十四次回款时间'>{{returnedData.time14}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money14" label='第十四次回款金额'>{{returnedData.money14}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time15" label='第十五次回款时间'>{{returnedData.time15}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money15" label='第十五次回款金额'>{{returnedData.money15}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time16" label='第十六次回款时间'>{{returnedData.time16}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money16" label='第十六次回款金额'>{{returnedData.money16}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time17" label='第十七次回款时间'>{{returnedData.time17}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money17" label='第十七次回款金额'>{{returnedData.money17}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time18" label='第十八次回款时间'>{{returnedData.time18}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money18" label='第十八次回款金额'>{{returnedData.money18}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time19" label='第十九次回款时间'>{{returnedData.time19}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money19" label='第十九次回款金额'>{{returnedData.money19}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.time20" label='第二十次回款时间'>{{returnedData.time20}} </el-descriptions-item>
            <el-descriptions-item v-if="returnedData.money20" label='第二十次回款金额'>{{returnedData.money20}} </el-descriptions-item>
        </el-descriptions>
        <div class="btn">
            <el-button size="mini" type="primary" @click="changeShow_3" v-show="!show_3">报告详情</el-button>
            <span class="span" @click="changeHide_3" v-show="show_3">︽收起</span>
        </div>
        <el-descriptions title='报告完成情况' :column='4' :size='size' border style='margin-top:10px;' v-if="show_3">
            <el-descriptions-item label='应出具报告份数'>{{params.sumReportNo}} </el-descriptions-item>
            <el-descriptions-item label='已出具报告份数'>{{params.alreadyIssue}} </el-descriptions-item>
            <el-descriptions-item label='应出具报告编号集'>{{params.reportNoS}} </el-descriptions-item>
            <el-descriptions-item label='报告应收金额'>{{params.sumReceivable}} </el-descriptions-item>
        </el-descriptions>
        <div class="btn">
            <el-button size="mini" type="primary" @click="changeShow_4" v-show="!show_4">应收账款情况</el-button>
            <span class="span" @click="changeHide_4" v-show="show_4">︽收起</span>
        </div>
        <el-descriptions title='应收账款情况' :column='4' :size='size' border style='margin-top:10px;' v-if="show_4">
            <el-descriptions-item label='金额合计'>{{receivablesData.total}}</el-descriptions-item>
            <el-descriptions-item label='账龄1-3个月'>{{receivablesData.oneStage}}</el-descriptions-item>
            <el-descriptions-item label='账龄3-6个月'>{{receivablesData.secondStage}}</el-descriptions-item>
            <el-descriptions-item label='账龄6-12个月'>{{receivablesData.threeStages}}</el-descriptions-item>
            <el-descriptions-item label='账龄1年以上'>{{receivablesData.fourStages}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script>
import { getCrmBillIngGetDataByContId } from '@/api/client/billingInfo.js'
import {
  getCrmAccountsReceivableTakeBackGetDataByContId,
  getCrmAccountsReceivableStatistics,
  getCrmServiceChargeGetDataByContId
} from '@/api/finance/receivables.js'
export default {
  props: {
    layerid: '',
    params: Object,
    client: Object,
    type: Number
  },
  data() {
    return {
      loading: false,
      size: '',
      show_1: true,
      show_2: true,
      show_3: true,
      show_4: true,
      contractData: {}, // 合同数据
      serviceData: {
        reporting: '',
        reportingActual: ''
      }, // 服务费
      billingData: {}, // 开票
      returnedData: {}, // 回款
      completeData: {}, // 报告完成
      receivablesData: {} // 应收账款
    }
  },
  methods: {
    // 服务费
    getServiceData() {
      let obj = {}
      obj.contId = this.params.id
      obj.custId = this.params.custId
      getCrmServiceChargeGetDataByContId(obj).then(res => {
        if (res.result !== null) {
          this.serviceData = res.result
        }
      })
    },
    // 回款
    getReturnedData() {
      getCrmAccountsReceivableTakeBackGetDataByContId({
        contId: this.params.id
      }).then(res => {
        this.returnedData = res.result
      })
    },
    // 开票信息
    getCrmBillIng() {
      getCrmBillIngGetDataByContId({ contId: this.params.id }).then(res => {
        this.billingData = res.result
      })
    },
    // 应收账款
    getRceivablesData() {
      getCrmAccountsReceivableStatistics({ contId: this.params.id }).then(
        res => {
          this.receivablesData = res.result
        }
      )
    },
    changeShow_1() {
      this.show_1 = true
    },
    changeHide_1() {
      this.show_1 = false
    },
    changeShow_2() {
      this.show_2 = true
    },
    changeHide_2() {
      this.show_2 = false
    },
    changeShow_3() {
      this.show_3 = true
    },
    changeHide_3() {
      this.show_3 = false
    },
    changeShow_4() {
      this.show_4 = true
    },
    changeHide_4() {
      this.show_4 = false
    },
    // 台账导出
    download() {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/CrmAccountsReceivable/download?' +
          'ids=' +
          this.params.id +
          '&' +
          'token=' +
          this.$store.getters.userInfo.token
      )
    }
  },
  mounted() {
    switch (this.params.busiType) {
      case '1':
        this.params.busiTypeName = '纯检测'
        break
      case '2':
        this.params.busiTypeName = '纯咨询'
        break
      case '3':
        this.params.busiTypeName = '检测和咨询'
    }
    this.contractData = this.params
    // 税前金额
    if (this.params.consumeType === '3') {
      this.contractData.reportingContainTax = this.params.consume
    }
    // 税后金额
    if (this.params.consumeType === '4') {
      this.contractData.reportingWrongTax = this.params.consume
    }
    this.getServiceData() // 服务费
    this.getCrmBillIng() // 开票信息
    this.getReturnedData() // 回款
    this.getRceivablesData() // 应收账款
  },
  created() {}
}
</script>
<style lang='scss'>
.btn {
  margin-top: 20px;
}
.btn .span {
  position: absolute;
  right: 50px;
  color: #7c7c7c;
  cursor: pointer;
}
.btn .span1 {
  position: absolute;
  right: 50px;
  color: #409eff;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}
.btn .span:hover {
  color: #409eff;
}
</style>
