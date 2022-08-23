<!-- 主任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-s-custom" @click="doInputPerson()" v-if="this.$store.getters.userInfo.lev>3">人员分配</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <majorTable :obj="this" :loading="loading" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" @handleSizeChange="handleSizeChange"></majorTable>
  </div>
</template>

<script>
import edit from './edit.vue'
import reportEdit from './report_edit.vue'
import inputPerson from '../../common/input_person.vue'
import majorTable from './major_table.vue'
import {getMainTaskQueryPageList, getMainTaskToOper, getChangeContCaseError, getMainTaskBackTask} from '../../../api/sampling/majorTask.js'
import { getSysQueryDict } from '../../../api/common.js'
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
        status: '1', // 启动
        type: '1', // 1采样 2送样
        isStart: '1', // 任务是否开始 1是0否
        isFp: '1', // 任务是否分配 1是0否
        isTask: '1' // 后台只查询启动和完成内的数据
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'taskName', label: '主任务名称' },
        {
          type: 'select',
          prop: 'status',
          label: '主任务状态',
          data: [
            { id: '1', name: '启动' },
            { id: '3', name: '完成' }
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
        // {
        //   prop: 'taskName',
        //   label: '主任务名称',
        //   width: 120
        // },
        // {
        //   prop: 'reportTaskNum',
        //   label: '报告任务数',
        //   width: 120
        // },
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
        // {
        //   prop: 'contStatusName',
        //   label: '合同状态',
        //   width: 110
        // },
        {
          prop: 'statusName',
          label: '状态',
          width: 130,
          queryType: 'select',
          queryData: [
            {id: '1', name: '启动'},
            {id: '3', name: '完成'}
          ]
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
          {
            name: '添加报告任务',
            type: 'primary',
            click: 'handleAdd',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07') {
                return true
              }
            }
          }, {
            name: '方案报错',
            type: 'primary',
            click: 'handleErrors',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07') {
                return true
              }
            }
          }, {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07') {
                return true
              }
            }
          }, {
            name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07') {
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
            case '1':
              xdd.statusName = '启动'
              break
            case '3':
              xdd.statusName = '完成'
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
    handleAdd(params) {
      let data = params.projectType.split(',')
      let ids = ''
      // XMLX_4  送样检测
      // XMLX_8  农业送样检测
      data.forEach(xdd => {
        if (xdd !== 'XMLX_4' && xdd !== 'XMLX_8') {
          ids += xdd + ','
        }
      })
      ids = ids.substring(0, ids.length - 1)
      getSysQueryDict({ type: 'XMLX', projectType: ids }).then(res => {
        this.$layer.iframe({
          content: {
            content: reportEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              addParams: params,
              projectTypeData: res.result
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加报告任务',
          maxmin: true,
          shadeClose: false
        })
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
    handleReturn(params) {
      this.$prompt('请输入退回原因', '退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = {}
        ids.mainId = params.id
        ids.returnReason = value
        getMainTaskBackTask(ids).then(res => {
          this.getListData()
          this.$share.message('退回成功', 'success')
        })
      })
    },
    handleErrors(params) {
      this.$prompt('请输入修改明细', '报错处理', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = {}
        ids.cahngeDetail = value
        ids.contId = params.contId
        getChangeContCaseError(ids).then(res => {
          this.getListData()
          this.$share.message('处理成功', 'success')
        })
      })
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
