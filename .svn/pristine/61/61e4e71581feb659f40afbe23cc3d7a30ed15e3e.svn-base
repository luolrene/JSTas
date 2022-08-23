<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="150">
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmAchievementSumSzGetAll,
  getCrmAchievementSumSzUpdateDictItem
} from '@/api/performance/statistics.js'
import { NumberIndex, TwoNumber } from '../../../utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {},
      rules: {
        code1: [
          { required: true, message: '请输入任务完成率考核', trigger: 'blur' },
          { validator: TwoNumber, trigger: 'change' }
        ],
        code2: [
          { required: true, message: '请输入审核岗位人数', trigger: 'blur' },
          { validator: NumberIndex, trigger: 'change' }
        ],
        code3: [
          {
            required: true,
            message: '请输入编制+档案岗位人数',
            trigger: 'blur'
          },
          { validator: NumberIndex, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '任务完成率考核',
          prop: 'code1',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '审核岗位人数',
          prop: 'code2',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '编制+档案岗位人数',
          prop: 'code3',
          value: '',
          type: 'input',
          isRqd: true
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.btnLoading = true
      getCrmAchievementSumSzUpdateDictItem(this.fromValiData)
        .then(res => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    }
  },
  mounted() {
    getCrmAchievementSumSzGetAll({}).then(res => {
      this.fromValiData = res.result
    })
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
