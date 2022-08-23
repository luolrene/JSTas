<!-- 主任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <majorTable
      :obj="this"
      :loading="loading"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :button="button"
      @handleSizeChange="handleSizeChange"></majorTable>
  </div>
</template>

<script>
import edit from '../task/major_edit.vue'
import majorTable from '../../sampling/majorTask/major_table.vue'
import {getMainTaskQueryPageList, getMainTaskAddOrModifyTask} from '../../../api/sampling/majorTask.js'
export default {
  props: {
    layerid: ''
  },
  components: {
    majorTable
  },
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        proName: null,
        custName: null,
        taskName: null,
        isCycle: '',
        status: '5', // 启动
        type: '1', // 1采样 2送样
        isStart: '1', // 任务是否开始 1是0否
        isFp: '1' // 任务是否分配 1是0否
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'taskName', label: '主任务名称' },
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
          width: 260,
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
          sort: 'custom',
          width: 260
        },
        {
          prop: 'contNo',
          label: '合同编号',
          sort: 'custom',
          width: 120
        },
        {
          prop: 'area',
          label: '区域',
          sort: 'custom',
          width: 170
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          type: 'view2',
          width: 110,
          queryType: 'select',
          queryData: [
            {id: '1', name: '是'},
            {id: '0', name: '否'}
          ],
          condition: params => {
            if (params.isCycle === '1') {
              return '#F56C6C'
            }
          }
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 120,
          queryType: 'button'
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 130
        },
        {
          prop: 'startTime',
          label: '任务开始时间',
          sort: 'custom',
          width: 280,
          queryType: 'dateTime'
        }
      ],
      button: {
        width: 360,
        buttonList: [
          {name: '启动',
            type: 'primary',
            click: 'handleStart',
            condition: function(params) {
              if (params.contStatus !== '07') {
                return true
              }
            }
          }, {name: '放弃',
            type: 'primary',
            click: 'handleGiveUp',
            condition: function(params) {
              if (params.contStatus !== '07') {
                return true
              }
            }
          }, {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function(params) {
              if (params.contStatus !== '07') {
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
      getMainTaskQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '5':
              xdd.statusName = '退回' + '(' + xdd.returnReason + ')'
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
      }).catch(err => {
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
            params: params,
            type: params.contType
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleStart (params) {
      this.$share.confirm({
        message: '此操作将启动合同, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = {...params}
          ids.status = '1'
          getMainTaskAddOrModifyTask(ids).then(res => {
            this.getListData()
            this.$share.message('启动成功', 'success')
          })
        }
      })
    },
    handleGiveUp (params) {
      this.$share.confirm({
        message: '此操作将放弃合同, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = {...params}
          ids.status = '4'
          getMainTaskAddOrModifyTask(ids).then(res => {
            this.getListData()
            this.$share.message('放弃成功', 'success')
          })
        }
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
