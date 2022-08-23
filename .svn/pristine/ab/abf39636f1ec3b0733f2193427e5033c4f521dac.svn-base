<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getCrmResponsibilityQueryPageData } from '@/api/client/verity.js'
import inquire from './inquire.vue'
export default {
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        handle: null
      },
      fromData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'content',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'sumName',
          label: '申请类型',
          width: 90
        },
        {
          prop: 'contactsName',
          label: '申请联系人',
          width: 90
        },
        {
          prop: 'contactsMobile',
          label: '申请联系人电话',
          width: 90
        },
        {
          prop: 'createTime',
          label: '申请时间',
          width: 90
        },
        {
          prop: 'handleName',
          label: '处理结果',
          width: 90
        },
        {
          prop: 'handleUserName',
          label: '处理人',
          width: 90
        }
      ],
      button: {
        width: 100,
        buttonList: [
          {
            name: '查询审核进度',
            type: 'primary',
            click: 'handleInquire',
            condition: params => {
              if (params.sum > params.sumNow) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.judge = 1
      getCrmResponsibilityQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.sum === '0') {
              xdd.sumName = '上级领导审批'
            } else {
              xdd.sumName = '跟进人审批'
            }
            switch (xdd.handleRemarks) {
              case null:
                xdd.handleRemarks = ''
            }
            switch (xdd.handle) {
              case 1:
                xdd.handleName = '待审批'
                break
              case 2:
                xdd.handleName = '通过'
                break
              case 3:
                xdd.handleName = '退回' + '  ' + '(' + xdd.handleRemarks + ')'
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
    handleInquire(params) {
      this.$layer.iframe({
        content: {
          content: inquire, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '审核进度',
        maxmin: true,
        shadeClose: false
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
    this.fromValiData.createUser = JSON.parse(
      sessionStorage.getItem('userInfo')
    ).userId
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
