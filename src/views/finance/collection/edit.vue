<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="120">
    </fromItem>
  </div>
</template>

<script>
import { TwoNumber, NumberIndex } from '../../../utils/public.js'
import {
  getReportCollectionTaskAddOrModify,
  getCrmAccountsReceivableReportEstablish
} from '@/api/finance/collection.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        ifsk: '1'
      },
      rules: {
        reportMoney: [
          { required: true, message: '请填写报告金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        whetherTheReceivable: [
          { required: true, message: '请选择是否应收', trigger: 'change' }
        ],
        anticipateMoney: [
          { required: true, message: '请填写应收款金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        processingType: [
          { required: true, message: '请选择结算类型', trigger: 'change' }
        ],
        cycleStart: [
          { required: true, message: '请填写报告总周期', trigger: 'change' },
          { validator: NumberIndex, trigger: 'change' }
        ],
        cycleMonth: [
          { required: true, message: '请选择报告结算周期', trigger: 'change' }
        ],
        skDate: [
          { required: true, message: '请选择应收款日期', trigger: 'blur' }
        ],
        planAnticipateMoney: [
          { required: true, message: '请填写计划收款金额', trigger: 'change' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        planSkDate: [
          { required: true, message: '请选择计划收款日期', trigger: 'blur' }
        ]
      },
      fromItemList: [
        { label: '项目名称', prop: 'proName', type: 'input', disabled: true },
        { label: '报告编号', prop: 'reportNo', type: 'input', disabled: true },
        {
          label: '结算类型',
          prop: 'processingType',
          type: 'select',
          isRqd: true,
          // data: [{ name: '固定结算', id: 1 }, { name: '据实结算', id: 2 }]
          data: [{ name: '固定结算', id: 2 }, { name: '据实结算', id: 1 }]
        },
        {
          label: '报告总周期/月',
          prop: 'cycleStart',
          type: 'input',
          isRqd: true,
          isShow: true
        },
        {
          label: '报告结算周期',
          prop: 'cycleMonth',
          type: 'select',
          isRqd: true,
          isShow: true,
          data: [
            { name: '1个月', id: 1 },
            { name: '2个月', id: 2 },
            { name: '3个月', id: 3 },
            { name: '4个月', id: 4 },
            { name: '6个月', id: 6 },
            { name: '12个月', id: 12 }
          ]
        },
        {
          label: '摘要',
          prop: 'processingAbstract',
          type: 'textarea'
        },
        { label: '报告金额', prop: 'reportMoney', type: 'input', isRqd: true },
        {
          label: '是否应收',
          prop: 'whetherTheReceivable',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        },
        {
          label: '应收款日期',
          prop: 'skDate',
          type: 'date',
          isRqd: false,
          isShow: true
        },
        {
          label: '应收款金额',
          prop: 'anticipateMoney',
          type: 'input',
          isRqd: false,
          isShow: true
        },
        {
          label: '计划收款日期',
          prop: 'planSkDate',
          type: 'date',
          isRqd: false,
          isShow: true
        },
        {
          label: '计划收款金额',
          prop: 'planAnticipateMoney',
          type: 'input',
          isRqd: false,
          isShow: true
        },
        { label: '备注', prop: 'exp', type: 'textarea' }
      ]
    }
  },
  watch: {
    'fromValiData.whetherTheReceivable': {
      deep: true,
      handler: function(newV, oldV) {
        if (newV === '1') {
          this.fromItemList.forEach(item => {
            if (item.prop === 'skDate') {
              item.isRqd = true
              item.isShow = false
            }
            if (item.prop === 'anticipateMoney') {
              item.isRqd = true
              item.isShow = false
            }
            if (item.prop === 'planSkDate') {
              item.isRqd = false
              item.isShow = true
            }
            if (item.prop === 'planAnticipateMoney') {
              item.isRqd = false
              item.isShow = true
            }
          })
        }
        if (newV === '2') {
          this.fromItemList.forEach(item => {
            if (item.prop === 'planSkDate') {
              item.isRqd = true
              item.isShow = false
            }
            if (item.prop === 'planAnticipateMoney') {
              item.isRqd = true
              item.isShow = false
            }
            if (item.prop === 'skDate') {
              item.isRqd = false
              item.isShow = true
            }
            if (item.prop === 'anticipateMoney') {
              item.isRqd = false
              item.isShow = true
            }
          })
        }
      }
    },
    'fromValiData.processingType': {
      deep: true,
      handler: function(newV, oldV) {
        if (newV === 2) {
          this.fromItemList.forEach(item => {
            if (item.prop === 'cycleStart') {
              item.isShow = false
              item.isRqd = true
            }
            if (item.prop === 'cycleMonth') {
              item.isShow = false
              item.isRqd = true
            }
            if (item.prop === 'reportMoney') {
              item.isShow = true
              item.isRqd = false
            }
          })
        }
        if (newV === 1) {
          this.fromItemList.forEach(item => {
            if (item.prop === 'cycleStart') {
              item.isShow = true
              item.isRqd = false
            }
            if (item.prop === 'cycleMonth') {
              item.isShow = true
              item.isRqd = false
            }
            if (item.prop === 'reportMoney') {
              item.isShow = false
              item.isRqd = true
            }
          })
        }
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.fromValiData.reportMoney > this.params.contNoPrice) {
        let money = this.fromValiData.reportMoney - this.params.contNoPrice
        this.$message({
          message: `填写报告金额不可超过合同金额${money},合同金额为${
            this.params.contNoPrice
          }`,
          duration: 5000,
          type: 'error'
        })
      } else {
        if (this.fromValiData.whetherTheReceivable === '1') {
          this.btnLoading = true
          this.fromValiData.status = '1'
          getReportCollectionTaskAddOrModify(this.fromValiData)
            .then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
              this.btnLoading = false
            })
            .catch(() => {
              this.btnLoading = false
            })
            .then(res => {
              if (res.code === 0) {
                getCrmAccountsReceivableReportEstablish(this.fromValiData).then(
                  res => {
                    console.log(res)
                  }
                )
              }
            })
        } else {
          this.btnLoading = true
          getReportCollectionTaskAddOrModify(this.fromValiData)
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
      }
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(xdd => {
        if (this.fromValiData.processingType) {
          if (xdd.prop === 'processingType') {
            xdd.disabled = true
          }
          if (xdd.prop === 'cycleStart') {
            xdd.disabled = true
          }
          if (xdd.prop === 'cycleMonth') {
            xdd.disabled = true
          }
        }
      })
      if (
        this.fromValiData.whetherTheReceivable &&
        this.params.status === '2'
      ) {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'whetherTheReceivable') {
            xdd.isShow = true
          }
        })
      }
    }
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
