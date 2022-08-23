<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="110">
    </fromItem>
  </div>
</template>

<script>
import info from './info'
import { getCrmVisitorBatchAdd } from '@/api/client/visitorsToPlan.js'
export default {
  props: {
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      industry: null,
      industryName: '',
      ids: null,
      fromValiData: {
        industryName: '',
        id: null,
        ids: [],
        custName: ''
      },
      rules: {
        name: [{ required: true, message: '请填写计划主题', trigger: 'blur' }],
        objective: [
          { required: true, message: '请输入拜访目的', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {
          label: '客户名称',
          prop: 'custName',
          value: '',
          type: 'inputChoice',
          isRqd: true,
          data: [],
          hasInput: true,
          click: 'getIndustry'
        },
        {
          label: '计划名称',
          prop: 'name',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '拜访目的',
          prop: 'objective',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '执行时间',
          prop: 'executorTime',
          value: '',
          type: 'date'
        },
        {
          label: '备注',
          prop: 'remarks',
          value: '',
          type: 'input'
        },
        {
          label: '提醒',
          prop: 'remind',
          value: '',
          type: 'date'
        }
      ]
    }
  },
  methods: {
    getData(ids) {
      this.fromValiData.ids = ids.id.split(',')
    },
    onSubmit() {
      if (this.fromValiData.ids.length === 0) {
        this.$share.message('请选择客户', 'waring')
        return
      }
      this.btnLoading = true
      getCrmVisitorBatchAdd({
        ids: this.fromValiData.ids.join(','),
        name: this.fromValiData.name,
        objective: this.fromValiData.objective,
        executorTime: this.fromValiData.executorTime,
        remind: this.fromValiData.remind
      })
        .then(res => {
          this.$layer.close(this.layerid)
          this.$parent.getListData()
          this.$share.message()
          this.btnLoading = false
        })
        .catch(() => {
          this.btnLoading = false
        })
    },
    // 新增栏客户行业的选择菜单
    getIndustry() {
      this.$layer.iframe({
        content: {
          content: info, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            ids: this.fromValiData.ids
          } // props
        },
        area: this.$layer_Size.Max,
        title: '选择客户',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang="scss">
</style>
