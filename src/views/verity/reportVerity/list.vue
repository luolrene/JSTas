<!-- 角色信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="1" label="待审核">
        <tableItem
          :obj="this"
          :tableData="tableData"
          :tableHeader="tableHeader"
          :button="button"
          :dataSum='fromValiData.dataSum'
          :loading="loading"
          :isSelection="false"
          @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane name="2" label="一审认领">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button
            type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            @click="handleClaim">认领</el-button>
        </fromSearch>
        <tableItem
          :obj="this"
          :tableData="tableData"
          :tableHeader="tableHeader"
          :dataSum='fromValiData.dataSum'
          :loading="loading"
          @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane name="3" label="二审认领">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
          <el-button
            type="primary"
            :size="$layer_Size.buttonSize"
            class="default-btn"
            @click="handleClaim">认领</el-button>
        </fromSearch>
        <tableItem
          :obj="this"
          :tableData="tableData"
          :tableHeader="tableHeader"
          :dataSum='fromValiData.dataSum'
          :loading="loading"
          @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
      <el-tab-pane name="4" label="我审核的">
        <tableItem
          :obj="this"
          :tableData="tableData"
          :tableHeader="tableHeader"
          :dataSum='fromValiData.dataSum'
          :loading="loading"
          :isSelection="false"
          @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import details2 from '../../report/edit/details.vue'
import verity from './verity.vue'
import {getReportEditQueryPageList, getReportEditGetmyTask} from '../../../api/report/edit.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        isCheck: '1'
      },
      tableData: [],
      fromData: [
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'input', prop: 'proName', label: '项目名称'}
      ],
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
          prop: 'reportNo',
          label: '报告编号',
          type: 'view2',
          width: 90
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'startTime',
          label: '检测完成时间',
          width: 90
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '审核',
            type: 'primary',
            click: 'handleVerity',
            condition: () => {
              if (this.activeName === '1') {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: [],
      activeName: '1'
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getReportEditQueryPageList(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '待编辑'
                break
              case '1_1':
                xdd.statusName = '一审审核中'
                break
              case '1_2':
                xdd.statusName = '二审审核中'
                break
              case '2':
                xdd.statusName = '退回'
                break
              case '3':
                xdd.statusName = '审核通过'
                break
              case '4':
                xdd.statusName = '变更审核'
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
    // 认领
    handleClaim() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需要认领的报告', 'warning')
        return
      }
      getReportEditGetmyTask(this.multipleSelection).then(res => {
        this.$share.message('认领成功')
        this.getListData()
      })
    },
    handleClick(e) {
      if (this.activeName === '3') {
        this.tableHeader = [
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
            prop: 'reportNo',
            label: '报告编号',
            type: 'view2',
            width: 90
          },
          {
            prop: 'custName',
            label: '客户名称',
            width: 90
          },
          {
            prop: 'firstCheckName',
            label: '一审审核人员',
            width: 110
          },
          {
            prop: 'startTime',
            label: '检测完成时间',
            width: 90
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 90
          }
        ]
      } else if (this.activeName === '4') {
        this.tableHeader = [
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
            prop: 'reportNo',
            label: '报告编号',
            type: 'view2',
            width: 90
          },
          {
            prop: 'custName',
            label: '客户名称',
            width: 90
          },
          {
            prop: 'firstCheckName',
            label: '一审审核人员',
            width: 110
          },
          {
            prop: 'secondCheckName',
            label: '二审审核人员',
            width: 110
          },
          {
            prop: 'startTime',
            label: '检测完成时间',
            width: 90
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 90
          }
        ]
      } else {
        this.tableHeader = [
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
            prop: 'reportNo',
            label: '报告编号',
            type: 'view2',
            width: 90
          },
          {
            prop: 'custName',
            label: '客户名称',
            width: 90
          },
          {
            prop: 'startTime',
            label: '检测完成时间',
            width: 90
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 90
          }
        ]
      }
      this.fromValiData.isCheck = this.activeName
      this.getListData()
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
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: details2, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: ['900px', this.$layer_Size.layerSelfHeight],
        title: '查看详情',
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
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
