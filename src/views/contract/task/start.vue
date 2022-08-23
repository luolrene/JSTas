<!-- 合同启动 -->
<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      submitName="启动"
      :labelWidth="120">
    </fromItem>
  </div>
</template>

<script>
import { getContTaskStartTask } from '../../../api/contract/task.js'
import { validateNumber } from '../../../utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      fromValiData: {
        taskLev: '1',
        isAuto: '1',
        reportTaskNum: 1,
        isContNo: false,
        contNo: ''
      },
      rules: {
        isAuto: [
          {
            required: true,
            message: '请选择是否自动生成主任务',
            trigger: 'blur'
          }
        ],
        reportTaskNum: [
          { required: true, message: '请输入任务报告数', trigger: 'blur' },
          { validator: validateNumber, trigger: 'change' }
        ],
        taskLev: [
          { required: true, message: '请选择任务等级', trigger: 'change' }
        ]
      },
      fromItemList: [
        {
          label: '生成主任务',
          prop: 'isAuto',
          value: '',
          type: 'radio',
          isRqd: true,
          labelWidth: 100,
          data: [{ label: '1', name: '是' }, { label: '0', name: '否' }]
        },
        {
          label: '报告任务数',
          prop: 'reportTaskNum',
          value: '',
          type: 'input',
          isRqd: true
        },
        {
          label: '任务等级',
          prop: 'taskLev',
          value: '',
          type: 'select',
          isRqd: true,
          data: [
            { id: '1', name: '普通' },
            { id: '2', name: '加急' },
            { id: '3', name: '紧急' }
          ]
        },
        {
          label: '是否指定合同编号',
          prop: 'isContNo',
          value: '',
          type: 'switch',
          isRqd: true,
          labelWidth: 150
        },
        {
          label: '合同编号',
          prop: 'contNo',
          value: '',
          type: 'input',
          isRqd: true,
          isShow: true
        }
      ]
    }
  },
  watch: {
    'fromValiData.isContNo': {
      handler(newName, oldName) {
        let obj = this.fromItemList.find(xdd => {
          return xdd.prop === 'contNo'
        })
        this.fromValiData.contNo = ''
        if (newName) {
          obj.isShow = false
        } else {
          obj.isShow = true
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onSubmit() {
      this.fromValiData.contId = this.params.id
      this.fromValiData.reportTaskNum = Number(this.fromValiData.reportTaskNum)
      this.btnLoading = true
      getContTaskStartTask(this.fromValiData).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message('启动成功', 'success')
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang="scss">
</style>
