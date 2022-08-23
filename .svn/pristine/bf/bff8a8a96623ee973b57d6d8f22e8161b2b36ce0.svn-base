<!--合同变更审核 -->
<template>
  <div class="pc-container">
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false"></tableItem>
  </div>
</template>

<script>
import verity from './verity.vue'
import details from '../../contract/msg/details.vue'
import {
  getChangeContQueryPageList,
  getContractQueryContractById
} from '../../../api/contract/msg.js'

export default {
  props: {
    params: Object
  },
  components: {},
  data() {
    return {
      loading: false,
      isAdd: true,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        isCheck: '1'
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 180,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'oldMoney',
          label: '旧合同金额',
          width: 110
        },
        {
          prop: 'newMoney',
          label: '新合同金额',
          width: 110
        },
        {
          prop: 'oldReportTaskNum',
          label: '旧报告任务数',
          width: 110
        },
        {
          prop: 'newReportTaskNum',
          label: '新报告任务数',
          width: 110
        },
        {
          prop: 'hasCaseName',
          label: '是否包含方案修改',
          width: 150
        },
        {
          prop: 'changeDetail',
          label: '变更描述',
          width: 90
        },
        {
          prop: 'checkPathName',
          label: '流程名称',
          width: 90
        },
        {
          prop: 'operName',
          label: '变更发起人',
          width: 90
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 90
        }, {
          prop: 'startTime',
          label: '开始时间',
          width: 160
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '审核',
            type: 'primary',
            click: 'handleVerity'
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getChangeContQueryPageList(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '初始'
                break
              case '1':
                xdd.statusName = '审核中'
                break
              case '2':
                xdd.statusName = '审核通过'
                break
              case '3':
                xdd.statusName = '审核退回'
                break
              case '4':
                xdd.statusName = '放弃'
                break
            }
            switch (xdd.hasCase) {
              case '1':
                xdd.hasCaseName = '是'
                break
              case '0':
                xdd.hasCaseName = '否'
            }
            if (
              xdd.status === '0' ||
              xdd.status === '1' ||
              xdd.status === '3'
            ) {
              this.isAdd = false
            }
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleVerity(params) {
      this.$layer.iframe({
        content: {
          content: verity, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审核',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
