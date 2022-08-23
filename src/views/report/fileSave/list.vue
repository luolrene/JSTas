<!-- 分包合同管理 -->
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
import edit from './edit'
import details from '../../contract/msg/details.vue'
import details2 from '../edit/details.vue'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
import {getReportFileSaveQueryPageList, getReportFileSaveModifyData} from '@/api/report/file.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '0',
        project:'',
        project:'',
        custName:''
      },
      fromData: [
        {type: 'input', prop: 'project', label: '项目名称'},
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '进行中'},
            {id: '1', name: '完成'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
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
        prop: 'reportNo',
        label: '报告编号',
        type: 'view2',
        width: 120
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 120
      }, {
        prop: 'operName',
        label: '存档人姓名',
        width: 90
      }, {
        prop: 'startTime',
        label: '开始时间',
        width: 90
      }, {
        prop: 'endTime',
        label: '完成时间',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 180,
        buttonList: [
          {name: '清单下载',
            type: 'primary',
            click: 'handleDownload'
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          },
          {name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: (params) => {
              if (params.status === '0') {
                return true
              }
            }
          },
        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getReportFileSaveQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '进行中'
              break
            case '1':
              xdd.statusName = '完成'
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
    handleDownload(params){
      window.open(
        process.env.BASE_API +
        process.env.JS_Server +
        '/reportFileSave/downTaskPaper?reportNo=' + params.reportNo +
        '&token=' + this.$store.getters.userInfo.token
      )
    },
    handleFinish (params) {
      this.$confirm('此操作将完成报告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        params.status = '1'
        getReportFileSaveModifyData(params).then(res => {
          this.$message({
            type: 'success',
            message: '完成成功'
          })
          this.getListData()
        })
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
