<!-- 合同合同审核 -->
<template>
    <div class="pc-container">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
           <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
           <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
    </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import { getMyContractQueryPageData } from '../../../api/contract/msg.js'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'project', label: '项目名称' },
        { type: 'input', prop: 'sellerName', label: '跟进人' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 180
        },
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
          prop: 'price',
          label: '合同金额',
          width: 120
        },
        {
          prop: 'proTerm',
          label: '项目期限',
          width: 90
        },
        {
          prop: 'busiTypeName',
          label: '业务类别',
          width: 90
        },

        {
          prop: 'projectTypeName',
          label: '检测类型',
          width: 90
        },
        {
          prop: 'sellerName',
          label: '跟进人',
          width: 90
        }
      ]
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getMyContractQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '00':
                xdd.statusName = '草稿'
                break
              case '01':
                xdd.statusName = '审核中'
                break
              case '02':
                xdd.statusName = '审核通过'
                break
              case '03':
                xdd.statusName = '审核退回'
                break
              case '04':
                xdd.statusName = '放弃'
                break
              case '05':
                xdd.statusName = '已完成'
                break
              case '06':
                xdd.statusName = '进行中'
                break
            }
            switch (xdd.busiType) {
              case '1':
                xdd.busiTypeName = '纯检测'
                break
              case '2':
                xdd.busiTypeName = '纯咨询'
                break
              case '3':
                xdd.busiTypeName = '检测和咨询'
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
    // handleVerity(params) {
    //   this.$layer.iframe({
    //     content: {
    //       content: verity, // 传递的组件对象
    //       parent: this, // 当前的vue对象
    //       data: {
    //         params: params
    //       } // props
    //     },
    //     area: this.$layer_Size.Max,
    //     title: '审核',
    //     maxmin: true,
    //     shadeClose: false
    //   })
    // },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      delete this.fromValiData.custName
      delete this.fromValiData.project
      delete this.fromValiData.sellerName

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
