<!-- 主任务管理 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="项目期限:" prop="proTermTime">
            <el-date-picker
              v-model="proTermTime"
              type="daterange"
              :clearable="false"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采样期限:" prop="cyTermTime">
            <el-date-picker
              v-model="cyTermTime"
              type="daterange"
              :clearable="false"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px;">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :button="button"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import majorEdit from './major_edit.vue'
import allOperationList from './allOperation_list.vue'
import {getMainTaskQueryPageList, getMainTaskAddOrModifyTask} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  components: {

  },
  data () {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        project: null,
        custName: null,
        taskName: null
      },
      fromData: [
        {type: 'input', prop: 'project', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'input', prop: 'taskName', label: '主任务名称'},
        {type: 'select',
          prop: 'status',
          label: '主任务状态',
          data: [
            {id: '0', name: '未启动'},
            {id: '1', name: '启动'},
            {id: '2', name: '撤回'},
            {id: '3', name: '完成'},
            {id: '4', name: '放弃'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'taskName',
        label: '主任务名称',
        width: 110
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'proName',
        label: '项目名称',
        width: 90
      }, {
        prop: 'proTerm',
        label: '项目期限',
        width: 90
      }, {
        prop: 'cyTerm',
        label: '采样期限',
        width: 90
      }, {
        prop: 'opermanName',
        label: '现场负责人',
        width: 140
      }, {
        prop: 'statusName',
        label: '任务状态',
        width: 90
      }, {
        prop: 'typeName',
        label: '任务类型',
        width: 90
      }],
      multipleSelection: [],
      button: {
        width: 300,
        buttonList: [
          // {name: '子任务',
          //   type: 'primary',
          //   click: 'handleAllPeration',
          //   condition: function (params) {
          //     if (params.type === '2' && params.status === '1') {
          //       return true
          //     }
          //   }
          // },
          {name: '启动',
            type: 'primary',
            click: 'handleStart',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '撤回',
            type: 'primary',
            click: 'handleWithdraw',
            condition: function (params) {
              if (params.status === '1') {
                return true
              }
            }
          },
          {name: '放弃',
            type: 'primary',
            click: 'handleGiveUp',
            condition: function (params) {
              if (params.status === '1' || params.status === '0') {
                return true
              }
            }
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          }
        ]
      },
      statusList: [
        {id: '0', name: '未启动'},
        {id: '1', name: '启动'},
        {id: '2', name: '撤回'},
        {id: '3', name: '完成'},
        {id: '4', name: '放弃'}
      ],
      proTermTime: [],
      cyTermTime: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.id
      getMainTaskQueryPageList(this.fromValiData).then(res => {
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
          switch (xdd.type) {
            case '1':
              xdd.typeName = '采样'
              break
            case '2':
              xdd.typeName = '送样'
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
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: majorEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params,
            type: this.params.type
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAllPeration (params) {
      this.$layer.iframe({
        content: {
          content: allOperationList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '子任务列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: majorEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: this.params.type
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleStart (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将启动合同, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '1'
          delete ids.statusName
          getMainTaskAddOrModifyTask(ids).then(res => {
            that.getListData()
            that.$share.message('启动成功', 'success')
          })
        }
      })
    },
    handleWithdraw (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将撤回合同, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '2'
          delete ids.statusName
          getMainTaskAddOrModifyTask(ids).then(res => {
            that.getListData()
            that.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将放弃合同, 是否继续',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '4'
          delete ids.statusName
          getMainTaskAddOrModifyTask(ids).then(res => {
            that.getListData()
            that.$share.message('放弃成功', 'success')
          })
        }
      })
    },
    doSearch () {
      if (this.proTermTime.length > 0) {
        this.fromValiData.proTermStart = this.proTermTime[0]
        this.fromValiData.proTermEnd = this.proTermTime[1]
      }
      if (this.cyTermTime.length > 0) {
        this.fromValiData.cyTermStart = this.cyTermTime[0]
        this.fromValiData.cyTermEnd = this.cyTermTime[1]
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.proTermTime = []
      this.cyTermTime = []
      delete this.fromValiData.proTermStart
      delete this.fromValiData.proTermEnd
      delete this.fromValiData.cyTermStart
      delete this.fromValiData.cyTermEnd
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
