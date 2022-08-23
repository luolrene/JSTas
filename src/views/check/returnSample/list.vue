<!-- 实验室-检测任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-search"
          @click="doSearch()">查询</el-button>
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-refresh"
          @click="doReset('fromValiData')">重置</el-button>
      </template>
      </el-upload>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :button="button"
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import edit from '../../report/edit/edit.vue'
import targetList from './target_list.vue'
import { getSyReturnQueryList, getSyReturnFinishJob } from '../../../api/check/returnSample.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '0',
        proName: '',
        custName: '',
        reportNo: ''
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' },
        {
          type: 'select',
          prop: 'status',
          label: '任务状态',
          data: [
            { id: '0', name: '待处理' },
            { id: '1', name: '已完成' }
          ]
        }
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
          label: '客户名称',
          width: 120
        }, {
          prop: 'reportNo',
          label: '报告任务编号',
          width: 120
        }, {
          prop: 'statusName',
          label: '状态',
          width: 110
        }, {
          prop: 'returnReason',
          label: '退回原因',
          width: 110
        }, {
          prop: 'returnTime',
          label: '退回时间',
          width: 110
        }, {
          prop: 'finishTime',
          label: '完成时间',
          width: 110
        }
      ],
      button: {
        width: 160,
        buttonList: [
          {
            name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: params => params.status === '0' && params.contStatus !== '07'
          },
          {
            name: '样品管理',
            type: 'primary',
            click: 'handleTarget',
            condition: params => params.status === '0' && params.contStatus !== '07'
          },
          {
            name: '附件上传',
            type: 'primary',
            click: 'handleUpload',
            condition: params => params.type === '2' && params.contStatus !== '07'
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSyReturnQueryList(this.fromValiData).then(res => {
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
    handleUpload (params) {
      let ids = {}
      ids.reportNo = params.subSampTaskId
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: ids
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFinish(params) {
      this.$share.confirm({
        message: '此操作将完成报告, 是否继续？',
        type: 'success',
        confirm: () => {
          getSyReturnFinishJob(params).then(res => {
            this.$share.message('完成成功', 'success')
            this.getListData()
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    handleTarget(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '样品列表',
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
