<!-- 主任务管理-备份
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-s-custom" @click="doInputPerson()">人员分配</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :loading="loading" :button="button" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import reportList from './report_list.vue'
import details from '../../contract/msg/details.vue'
import inputPerson from '../../common/input_person.vue'
import cycle from './cycle.vue'
import {
  getMainTaskQueryPageList,
  getMainTaskToOper
} from '../../../api/sampling/majorTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  props: {
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        project: null,
        custName: null,
        taskName: null,
        status: '1', // 启动
        type: '1', // 1采样 2送样
        isStart: '1', // 任务是否开始 1是0否
        isFp: '1' // 任务是否分配 1是0否
      },
      fromData: [
        { type: 'input', prop: 'project', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'taskName', label: '主任务名称' },
        {
          type: 'select',
          prop: 'status',
          label: '主任务状态',
          data: [
            { id: '0', name: '未启动' },
            { id: '1', name: '启动' },
            { id: '2', name: '撤回' },
            { id: '3', name: '完成' },
            { id: '4', name: '放弃' }
          ]
        },
        {
          type: 'select',
          prop: 'isStart',
          label: ' 任务是否开始',
          data: [{ id: '1', name: '是' }, { id: '0', name: '否' }]
        },
        {
          type: 'select',
          prop: 'isFp',
          label: ' 任务是否分配',
          data: [{ id: '1', name: '是' }, { id: '0', name: '否' }]
        },
        {
          type: 'select',
          prop: 'isCycle',
          label: ' 是否周期',
          data: [{ id: '1', name: '是' }, { id: '0', name: '否' }]
        }
      ],
      tableData: [],
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
          prop: 'contNo',
          label: '合同编号',
          width: 120
        },
        {
          prop: 'taskName',
          label: '主任务名称',
          width: 110
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'area',
          label: '区域',
          width: 130
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          type: 'view2',
          width: 90,
          condition: params => {
            if (params.isCycle === '1') {
              return '#F56C6C'
            }
          }
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 100
        },
        {
          prop: 'contStatusName',
          label: '合同状态',
          width: 110
        },
        {
          prop: 'statusName',
          label: '主任务状态',
          width: 110
        },
        {
          prop: 'startTime',
          label: '任务开始时间',
          width: 110
        }
      ],
      button: {
        width: 170,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function(params) {
              if (params.status === '1') {
                return true
              }
            }
          },
          {
            name: '报告任务',
            type: 'primary',
            click: 'handleReport',
            condition: function(params) {
              if (params.status === '1') {
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
    getListData() {
      this.loading = true
      getMainTaskQueryPageList(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '未启动'
                break
              case '1':
                xdd.statusName = '启动'
                break
              case '2':
                xdd.statusName = '撤回'
                break
              case '3':
                xdd.statusName = '完成'
                break
              case '4':
                xdd.statusName = '放弃'
                break
            }
            switch (xdd.contStatus) {
              case '00':
                xdd.contStatusName = '草稿'
                break
              case '01':
                xdd.contStatusName = '审核中'
                break
              case '02':
                xdd.contStatusName = '审核通过'
                break
              case '03':
                xdd.contStatusName = '审核退回'
                break
              case '04':
                xdd.contStatusName = '放弃'
                break
              case '05':
                xdd.contStatusName = '已完成'
                break
              case '06':
                xdd.contStatusName = '进行中'
                break
              case '07':
                xdd.contStatusName = '变更审核'
                break
            }
            switch (xdd.isCycle) {
              case '1':
                xdd.isCycleName =
                  '是' +
                  (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
                break
              case '0':
                xdd.isCycleName = '否'
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
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReport(params) {
      this.$layer.iframe({
        content: {
          content: reportList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '报告任务列表',
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
      if (params.isCycle === '1') {
        let isShow = false
        if (params.checkDetail === null) {
          isShow = true
        }
        this.$layer.iframe({
          content: {
            content: cycle, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              isShow: isShow
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '周期检测内容',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    doInputPerson() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选主任务', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1' // 只能看到自己组及以下的人
          } // props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson(params) {
      return new Promise((resolve, reject) => {
        let ids = { mainId: '' }
        this.multipleSelection.forEach(xdd => {
          ids.mainId += xdd.id + ','
        })
        ids.operman = params.mobile
        ids.opermanName = params.name
        ids.mainId = ids.mainId.substring(0, ids.mainId.length - 1)
        getMainTaskToOper(ids)
          .then(res => {
            this.getListData()
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      delete this.fromValiData.proTermStart
      delete this.fromValiData.proTermEnd
      delete this.fromValiData.cyTermStart
      delete this.fromValiData.cyTermEnd
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
    console.log(document.documentElement.clientHeight)
    if (Number(this.$store.getters.userInfo.lev) > 3) {
      this.fromValiData.isFp = '0'
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
