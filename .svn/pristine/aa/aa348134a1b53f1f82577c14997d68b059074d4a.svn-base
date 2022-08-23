<template>
  <div class="operate-container">
    <fromItem :obj="this" :layerid="layerid" :fromItemList="fromItemList" :fromValiData="fromValiData" :btnLoading="btnLoading" :rules="rules" :labelWidth="90">
    </fromItem>
  </div>
</template>

<script>
import { getUserQueryPageData } from '@/api/jcxxgl/user.js'
import { getTargetUpdateFun } from '../../../api/jcxxgl/targetDefend.js'

export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      fileList: [],
      btnLoading: false,
      fromValiData: {
        pageSize: '99999',
        pageNow: '1'
      },
      rules: {
        isDefault: [
          { required: true, message: '请选择是否默认', trigger: 'blur' }
        ]
      },
      fromItemList: [
        // 保存方法 保存时间 检测方法 采样量 采样容器 单位 方法依据 是否默认 是否现场 检出限 方法依据 处理人
        {
          label: '方法名称',
          prop: 'name',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '方法依据',
          prop: 'funFrom',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '处理人',
          prop: 'operName',
          value: 'oper',
          type: 'select',
          needMobile: true,
          filterable: true,
          data: [],
          click: 'changeContacts'
        },
        {
          label: '处理人号码',
          prop: 'oper',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检出限',
          prop: 'jcx',
          value: '',
          type: 'input'
        },
        {
          label: '保存方法',
          prop: 'bcff',
          value: '',
          type: 'input'
        },
        {
          label: '保存时间',
          prop: 'bcsj',
          value: '',
          type: 'input'
        },
        {
          label: '是否现场',
          prop: 'isscene',
          value: '',
          type: 'select',
          data: [{ name: '是', id: '1' }, { name: '否', id: '0' }],
          disabled: true
        },
        {
          label: '是否默认',
          prop: 'isDefault',
          value: '',
          type: 'select',
          isRqd: true,
          data: [{ name: '是', id: '1' }, { name: '否', id: '0' }]
        },

        {
          label: '检测方法',
          prop: 'checkFun',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '采样量',
          prop: 'cyl',
          value: '',
          type: 'input'
        },
        {
          label: '采样容器',
          prop: 'cyrq',
          value: '',
          type: 'input'
        },
        {
          label: '单位',
          prop: 'dw',
          value: '',
          type: 'input',
          disabled: true
        },
        {
          label: '检测方法',
          prop: 'checkFun',
          value: '',
          type: 'input',
          disabled: true
        }
      ]
    }
  },
  watch: {},
  methods: {
    onSubmit() {
      getTargetUpdateFun(this.fromValiData)
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
    changeContacts(item, params) {
      let obj = {}
      obj = item.data.find(xdd => {
        return xdd.id === params
      })
      this.fromValiData.operName = obj.name
      this.fromValiData.oper = obj.id
    }
  },
  mounted() {
    getUserQueryPageData(this.fromValiData).then(res => {
      let arr = res.result.pageList.map(item => {
        return {
          id: item.mobile,
          name: item.name
        }
      })
      this.fromItemList[2].data = arr
    })
    if (this.params) {
      this.fromValiData = this.params
    }
  },
  created() {}
}
</script>

<style scoped lang='scss'>
</style>
