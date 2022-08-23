<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import {
  getCrmProportionQueryAllGroupsTree,
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
        departmentId: [
          { required: true, message: '请选择部门名称', trigger: 'blur' }
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
          label: '部门名称',
          prop: 'departmentId',
          value: '',
          type: 'select',
          data: [],
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
    getCrmProportionQueryAllGroupsTree({}).then(res => {
      let arr = res.result.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
      this.fromItemList[1].data = arr
    })
  },
  created() {}
}
</script>
<style scoped lang="scss">
</style>
