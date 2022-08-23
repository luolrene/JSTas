<!-- 采样任务列表 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.contStatus === '07'">添加</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-custom" @click="doInputPerson()" :disabled="params.contStatus === '07'">人员分配</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="params.contStatus === '07'">批量删除</el-button>
    </fromSearch>

    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    isSelectable
    :isPage="isPage"
    :customHeight="customHeight"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import samplingEdit from './sampling_edit.vue'
import pointList from './point_list.vue'
import inputPerson from './input_person.vue'
import {getSamplingTaskQuerySamplingPageList, getSamplingTaskAddOrModifySamplingTask,
  getSamplingTaskDelSampTask, getSamplingTaskToOper} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    layerid: '',
    isPage: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    customHeight: {
      type: String,
      default: '450'
    }
  },
  components: {

  },
  data () {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageNow: 1,
        name: ''
      },
      fromData: [
        {type: 'input', prop: 'name', label: '采样任务名称'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '采样任务名称',
        width: 150
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 110
      }, {
        prop: 'isCycleName',
        label: '是否周期',
        width: 90
      }, {
        prop: 'opermanName',
        label: '当前处理人',
        width: 120
      }, {
        prop: 'statusName',
        label: '采样任务状态',
        width: 120
      }],
      button: {
        width: 380,
        buttonList: [
          {name: '任务单下载',
            type: 'primary',
            click: 'handleTaskFile',
            condition: function (params) {
              if (params.status === '1') {
                return true
              }
            }
          },
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
              if (params.status !== '4') {
                return true
              }
            }
          },
          {name: '点位录入',
            type: 'primary',
            click: 'handlePoint',
            condition: function (params) {
              if (params.status === '0' || params.status === '1' || params.status === '2') {
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
          },
          {name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: function (params) {
              if (params.status !== '3') {
                return true
              }
            }}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.reportNo = this.params.reportNo
      getSamplingTaskQuerySamplingPageList(this.fromValiData).then(res => {
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
          switch (xdd.isCycle) {
            case '1':
              xdd.isCycleName = '是'
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
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: samplingEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: samplingEdit, // 传递的组件对象
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
    handlePoint (params) {
      this.$layer.iframe({
        content: {
          content: pointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '点位列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleTaskFile (params) {
      window.open(process.env.BASE_API + process.env.JS_Server + '/samplingTask/downTaskPaper?reportNo=' + params.reportNo + '&token=' + this.$store.getters.userInfo.token)
    },
    handleStart (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将启动合同, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '1'
          delete ids.statusName
          delete ids.isCycleName
          getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
            that.getListData()
            that.$share.message('启动成功', 'success')
          })
        }
      })
    },
    handleWithdraw (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将撤回合同, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '2'
          delete ids.statusName
          delete ids.isCycleName
          getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
            that.getListData()
            that.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将放弃合同, 是否继续？',
        type: 'success',
        confirm: function () {
          let ids = JSON.parse(JSON.stringify(params))
          ids.status = '4'
          delete ids.statusName
          delete ids.isCycleName
          getSamplingTaskAddOrModifySamplingTask(ids).then(res => {
            that.getListData()
            that.$share.message('放弃成功', 'success')
          })
        }
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getSamplingTaskDelSampTask({ids: row.id}).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = {id: ''}
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    doInputPerson () {
      let data = []
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选采样任务', 'warning')
        return
      }
      if (this.multipleSelection.length === 1) {
        data = this.multipleSelection
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1', // 只能看到自己组及以下的人
            data: data
          }// props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson (params) {
      return new Promise((resolve, reject) => {
        let ids = {ids: ''}
        this.multipleSelection.forEach(xdd => {
          ids.ids += xdd.id + ','
        })
        ids.operman = params.mobile
        ids.opermanName = params.name
        ids.ids = ids.ids.substring(0, ids.ids.length - 1)
        getSamplingTaskToOper(ids).then(res => {
          this.getListData()
          resolve(true)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getSelectable (row, index) {
      if (row.status !== '4') {
        return true
      } else {
        return false
      }
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
    this.fromValiData.pageSize = this.pageSize
    this.getListData()
  },
  created () {
    if (this.params.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '启动' || xdd.name === '撤回' || xdd.name === '放弃' || xdd.name === '编辑' || xdd.name === '删除') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
