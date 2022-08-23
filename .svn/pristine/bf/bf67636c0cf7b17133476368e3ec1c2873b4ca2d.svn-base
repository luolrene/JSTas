<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import {
  // getCrmProportionQueryAllGroupsTree,
  getCrmProportionAddOrModify
} from '@/api/performance/ratio.js'
import { validateTwo } from '../../../utils/public.js'
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
        projectType: [
          { required: true, message: '请选择项目类型', trigger: 'blur' }
        ],
        totalType: [
          { required: true, message: '请选择业务类型', trigger: 'blur' }
        ],
        commission: [
          { required: true, message: '请输入提成比例', trigger: 'blur' },
          { validator: validateTwo, trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '项目类型',
          prop: 'projectType',
          value: '',
          type: 'select',
          data: [
            {
              name: '环境',
              id: '环境'
            },
            {
              name: '农业',
              id: '农业'
            },
            {
              name: '土壤',
              id: '土壤'
            }
          ],
          isRqd: true
        },
        {
          label: '业务类型',
          prop: 'totalType',
          value: '',
          type: 'select',
          data: [
            {
              name: '报告室',
              id: '1'
            },
            {
              name: '实验室',
              id: '2'
            },
            {
              name: '现场部',
              id: '3'
            }
          ],
          isRqd: true
        },
        {
          label: '提成比例(%)',
          prop: 'commission',
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
      getCrmProportionAddOrModify(this.fromValiData)
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
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
