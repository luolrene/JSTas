<!-- 原始记录管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
import {
  getOriginalCyQueryPageList,
  getOriginalCyFinishMyJob
} from '../../../api/sampling/original.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '4'
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'project',
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
          label: '客户',
          width: 90
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        },
        {
          prop: 'sampTaskName',
          label: '采样任务名称',
          width: 90
        },
        {
          prop: 'statusName',
          label: '原始记录状态',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '完成',
            type: 'primary',
            click: 'handlePass',
            condition: params => {
              if (params.contStatus !== '07') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getOriginalCyQueryPageList(this.fromValiData)
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
                xdd.statusName = '退回'
                break
              case '4':
                xdd.statusName = '报告退回'
                break
              case '4_1':
                xdd.statusName = '退回采样'
                break
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
    handlePass(params) {
      let that = this
      this.$share.confirm({
        message: '此操作将通过原始记录, 是否继续?',
        type: 'success',
        confirm: function() {
          getOriginalCyFinishMyJob(params).then(res => {
            that.getListData()
            that.$share.message('通过成功', 'success')
          })
        }
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
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
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
