<!-- 报告寄送 -->
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
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import details2 from '../edit/details.vue'
import edit from './edit.vue'
import {getReportMailTaskQueryPageData, getReportMailTaskAddOrModify} from '../../../api/report/send.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '0'
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '待处理'},
            {id: '1', name: '已完成'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        type: 'view',
        width: 180,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'reportNo',
        label: '报告编号',
        type: 'view2',
        width: 90
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'courier',
        label: '快递公司',
        width: 90
      }, {
        prop: 'mailNo',
        label: '快递单号',
        width: 90
      }, {
        prop: 'term',
        label: '报告期限',
        width: 110
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 180,
        buttonList: [
          {name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: (params) => {
              if (params.status === '0') {
                return true
              }
            }
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              if (params.status === '0') {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getReportMailTaskQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '待处理'
              break
            case '1':
              xdd.statusName = '已完成'
              break
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFinish (params) {
      if (params.courier === null || params.courier === '') {
        this.$share.message('请先编辑快递公司', 'warning')
        return
      }
      this.$confirm('此操作将完成寄送, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        params.status = '1'
        getReportMailTaskAddOrModify(params).then(res => {
          this.$message({
            type: 'success',
            message: '寄送成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消寄送'
        })
      })
    },
    handleDetails (params) {
      getContractQueryContractById({contId: params.contId}).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            }// props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleDetails2 (params) {
      this.$layer.iframe({
        content: {
          content: details2, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['900px', this.$layer_Size.layerSelfHeight],
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
