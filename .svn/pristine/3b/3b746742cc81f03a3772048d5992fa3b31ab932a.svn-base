<!-- 原始记录管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import recordHandle from '@/views/sampling/original/record_handle.vue'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
import {getOriginalCyQueryPageList, getOriginalCyModifyData} from '../../../api/sampling/original.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '3,4_1'
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'input', prop: 'subManName', label: '提交人'}
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
        }, {
          prop: 'custName',
          label: '客户',
          width: 90
        }, {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        }, {
          prop: 'sampTaskName',
          label: '采样任务名称',
          width: 120
        }, {
          prop: 'statusName',
          label: '原始记录状态',
          width: 120
        }, {
          prop: 'returnReason',
          label: '退回原因',
          width: 90
        }, {
          prop: 'subManName',
          label: '提交人',
          width: 70
        }, {
          prop: 'subJdTime',
          label: '提交时间',
          width: 90
        }
      ],
      button: {
        width: 170,
        buttonList: [
          {
            name: '提交校对',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (params.contStatus !== '07') {
                return true
              }
            }
          },
          {name: '原始记录',
            type: 'primary',
            click: 'handleRecord',
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
              case '1_1':
                xdd.statusName = '校对中'
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
    handleRecord(params) {
      this.$router.push('/sampling/originalReturn')
      this.$layer.iframe({
        content: {
          content: recordHandle, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            routerPath: '/sampling/originalReturn',
            isSign: true
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '原始记录',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview(params) {
      let status = null
      if (params.status === '4_1') {
        status = '4'
      } else {
        status = '1_1'
      }
      this.$share.confirm({
        message: '此操作将提交数据进行校对, 是否继续?',
        type: 'success',
        confirm: () => {
          params.status = status
          params.returnReason = ''
          getOriginalCyModifyData(params).then(res => {
            this.getListData()
            this.$share.message('通过成功', 'success')
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
