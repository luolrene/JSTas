
<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="135">
    </fromItem>
  </div>
</template>

<script>
import { getCrmAchievementSumModify } from '@/api/performance/statistics.js'
import { validateTwo, validateTwoDigit } from '../../../utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        proportion: null,
        userType: null,
        totalType: null,
        qualityQuota: null,
        attitudeQuota: null,
        effect: null
      },
      rules: {
        proportion: [
          { required: true, message: '请填写个人提成比例', trigger: 'blur' },
          { validator: validateTwo, trigger: 'change' }
        ],
        userType: [
          { required: true, message: '请选择个人所属岗位', trigger: 'blur' }
        ],
        qualityQuota: [
          { required: true, message: '请填写个人质量分', trigger: 'blur' },
          { validator: validateTwoDigit, trigger: 'change' }
        ],
        attitudeQuota: [
          { required: true, message: '请填写个人态度分', trigger: 'blur' },
          { validator: validateTwoDigit, trigger: 'change' }
        ],
        effect: [
          { required: true, message: '请填写个人绩效分', trigger: 'blur' },
          { validator: validateTwoDigit, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '个人提成比例(%)',
          prop: 'proportion',
          value: '',
          type: 'input',
          isShow: true,
          isRqd: false
        },
        {
          label: '个人所属岗位',
          prop: 'userType',
          value: '',
          type: 'select',
          data: [
            { name: '审核岗位', id: '1' },
            { name: '编制+档案岗位', id: '2' },
            { name: '档案管理+内勤岗位', id: '3' }
          ],
          isShow: true,
          isRqd: false
        },
        {
          label: '个人质量分',
          prop: 'qualityQuota',
          value: '',
          type: 'input',
          isShow: true,
          isRqd: false
        },
        {
          label: '个人态度分',
          prop: 'attitudeQuota',
          value: '',
          type: 'input',
          isShow: true,
          isRqd: false
        },
        {
          label: '个人绩效分',
          prop: 'effect',
          value: '',
          type: 'input',
          isShow: true,
          isRqd: false
        }
      ]
    }
  },
  watch: {
    'fromValiData.userType': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromItemList.forEach(item => {
          if (newV === '3') {
            if (item.prop === 'qualityQuota' || item.prop === 'attitudeQuota') {
              item.isShow = true
              item.isRqd = false
            }
            if (item.prop === 'effect') {
              item.isShow = false
              item.isRqd = true
            }
          } else if (newV === '1' || newV === '2') {
            if (item.prop === 'qualityQuota' || item.prop === 'attitudeQuota') {
              item.isShow = false
              item.isRqd = true
            }
            if (item.prop === 'effect') {
              item.isShow = true
              item.isRqd = false
            }
          }
        })
      }
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmAchievementSumModify(this.fromValiData)
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
    }
    if (this.params.totalType === '3') {
      this.fromItemList[0].isShow = false
      this.fromItemList[0].isRqd = true
    } else if (this.params.totalType === '1') {
      this.fromItemList[1].isShow = false
      this.fromItemList[1].isRqd = true
      this.fromItemList[2].isShow = false
      this.fromItemList[2].isRqd = true
      this.fromItemList[3].isShow = false
      this.fromItemList[3].isRqd = true
      this.fromItemList[4].isShow = false
      this.fromItemList[4].isRqd = true
    }
  },
  created() {}
}
</script>

<style scoped lang='scss'>
</style>
