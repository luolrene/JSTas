<!-- 咨询任务管理 -->
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
import upload from './upload.vue'
import nodeShow from './nodeShow.vue'
import {getConSultQueryPageData, getConSultModifyData} from '../../../api/consult/task.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '草稿'},
            {id: '1', name: '进行中'},
            {id: '2', name: '完成'},
            {id: '3', name: '退回'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        type: 'view',
        width: 160,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'busiTypeName',
        label: '业务类别',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 160,
        buttonList: [
          {name: '提交',
            type: 'primary',
            click: 'handleReview',
            condition: (params) => {
              if (params.busiType === '3' && (params.status === '0' || params.status === '3')) {
                return true
              }
            }
          },
          {name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: (params) => {
              if (params.status === '1') {
                return true
              }
            }
          },
          {name: '附件上传',
            type: 'primary',
            click: 'handleUpload',
            condition: (params) => {
              if (params.status === '0' || params.status === '1' || params.status === '3') {
                return true
              }
            }
          },
          {name: '节点设置',
            type: 'primary',
            click: 'handleNode',
            condition: (params) => {
              if (params.status !== '2') {
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
      getConSultQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
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
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '进行中'
              break
            case '2':
              xdd.statusName = '完成'
              break
            case '3':
              xdd.statusName = '退回' + '(' + xdd.returnReason + ')'
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
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
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
    handleReview (params, title) {
      let ids = {}
      let index = '此操作将提交咨询任务, 是否继续?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        ids = JSON.parse(JSON.stringify(params))
        ids.status = '1'
        getConSultModifyData([ids]).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    handleFinish (params, title) {
      let ids = {}
      let index = '此操作将完成咨询任务, 是否继续?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        ids = JSON.parse(JSON.stringify(params))
        ids.status = '2'
        getConSultModifyData([ids]).then(res => {
          this.$message({
            type: 'success',
            message: '完成成功'
          })
          this.getListData()
        })
      })
    },
    handleUpload (params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: params.contId
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '附件上传',
        maxmin: true,
        shadeClose: false
      })
    },
    handleNode (params) {
      this.$layer.iframe({
        content: {
          content: nodeShow, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '节点设置',
        maxmin: true,
        shadeClose: false
      })
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
