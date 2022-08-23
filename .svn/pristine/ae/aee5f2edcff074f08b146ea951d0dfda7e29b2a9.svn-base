<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules">
    </fromItem>
  </div>
</template>

<script>
import { validateNumber } from '@/utils/public.js'
import {
  getCrmTargetAddOrModify,
  getCrmReportGetUser
} from '@/api/client/sellTarget.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        userName: []
      },
      rules: {
        targetTime: [
          { required: true, message: '请选择目标时间', trigger: 'change' }
        ],
        targetQuota: [
          { required: true, message: '请填写目标金额', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请选择执行人', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '目标时间',
          prop: 'targetTime',
          value: '',
          type: 'monthrange',
          format: 'yyyy-MM',
          isRqd: true,
          disabled: false
        },
        {
          label: '目标金额',
          prop: 'targetQuota',
          value: '',
          type: 'input',
          isRqd: true,
          disabled: false
        },
        {
          label: '执行人',
          prop: 'userName',
          value: 'userId',
          type: 'select',
          isRqd: true,
          data: [],
          filterable: true,
          multiple: true,
          disabled: false
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.btnLoading = true
      let ids = []
      this.fromItemList[2].data.forEach(xdd => {
        this.fromValiData.userName.forEach(arc => {
          if (xdd.id === arc) {
            ids.push({
              id: this.fromValiData.id,
              targetQuota: this.fromValiData.targetQuota,
              userName: xdd.name,
              userId: xdd.id,
              targetTime: this.fromValiData.targetTime[0],
              targetTimeEnd: this.fromValiData.targetTime[1]
            })
          }
        })
      })
      this.fromValiData.userName = this.fromValiData.userName.join(',')
      getCrmTargetAddOrModify(ids)
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
    getUserData() {
      getCrmReportGetUser({}).then(res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'userName') {
            xdd.data = res.result
          }
        })
      })
    }
  },
  mounted() {
    if (this.params) {
      this.fromValiData = this.params
      this.fromItemList.forEach(xdd => {
        if (xdd.prop !== 'targetQuota') {
          xdd.disabled = true
        }
      })
      this.fromValiData.targetTime = this.fromValiData.targetTime.split('""')
      this.fromValiData.targetTime.push(this.fromValiData.targetTimeEnd)
      this.fromValiData.userName = this.fromValiData.userId.split('""')
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style scoped lang="scss">
</style>
