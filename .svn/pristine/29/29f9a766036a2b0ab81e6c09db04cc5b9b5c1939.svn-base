<!--变更合同管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="450"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import pointList from './point_list.vue'
import upload from './upload.vue'
import {getChangeContQueryPageList, getContractQueryContractById} from '../../../api/contract/msg.js'
import {getChangeContFinishJob} from '../../../api/contract/changeCont.js'
import details from '../../contract/msg/details.vue'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        isCheck: '0',
        status: '2'
      },
      fromData: [

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
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'oldMoney',
        label: '旧合同金额',
        width: 90
      }, {
        prop: 'newMoney',
        label: '新合同金额',
        width: 90
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
        width: 140
      }, {
        prop: 'changeDetail',
        label: '变更描述',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }, {
        prop: 'startTime',
        label: '开始时间',
        width: 160
      }, {
        prop: 'checkTime',
        label: '审核时间',
        width: 160
      }],
      button: {
        width: 270,
        buttonList: [
          {name: '完成',
            type: 'primary',
            click: 'handleFinish'
          },
          {name: '方案管理',
            type: 'primary',
            click: 'handleEdit'
          },
          {name: '附件上传',
            type: 'primary',
            click: 'handleUpload'
          }
        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getChangeContQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '草稿'
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
            case '5':
              xdd.statusName = '完成'
              break
          }
          switch (xdd.hasCase) {
            case '1':
              xdd.hasCaseName = '是'
              break
            case '0':
              xdd.hasCaseName = '否'
          }
          if (xdd.status === '3' && xdd.returnReason !== null && xdd.returnReason !== '') {
            xdd.statusName = xdd.statusName + '(' + xdd.returnReason + ')'
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
          content: pointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '方案管理',
        maxmin: true,
        shadeClose: false
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
    handleUpload (params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '上传附件',
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
    },
    handleFinish (params) {
      this.$confirm('此操作将完成变更合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getChangeContFinishJob(params).then(res => {
          this.getListData()
          this.$share.message('完成成功', 'success')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完成'
        })
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
