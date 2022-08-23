<!-- 记录填写 -->
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
import recordHandle from './record_handle.vue'
import inputPerson from '@/views/common/input_person.vue'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
import {getOriginalCyQueryPageList, getOriginalCyModifyData} from '../../../api/sampling/original.js'
import {getUserQueryPageData} from '@/api/jcxxgl/user.js'
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
        step: '1'
      },
      params: {},
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '初始'},
            {id: '1_1', name: '校对中'},
            {id: '1', name: '审核中'},
            {id: '2', name: '审核通过'},
            {id: '3', name: '退回'},
            {id: '4', name: '报告退回'},
            {id: '4_1', name: '退回采样'}
          ]}
      ],
      tableData: [

      ],
      tableHeader_0: [
        {
          prop: 'project',
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
          label: '客户',
          width: 90
        }, {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        }, {
          prop: 'sampTaskName',
          label: '采样任务名称',
          width: 120
        }, {
          prop: 'statusName',
          label: '原始记录状态',
          width: 120
        }, {
          prop: 'contStatusName',
          label: '合同状态',
          width: 90
        }, {
          prop: 'startTime',
          label: '任务开始时间',
          width: 120
        }
      ],
      tableHeader_Verify: [{
        prop: 'project',
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
        label: '客户',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'sampTaskName',
        label: '采样任务名称',
        width: 120
      }, {
        prop: 'statusName',
        label: '原始记录状态',
        width: 120
      }, {
        prop: 'jdOperName',
        label: '校对人',
        width: 70
      }, {
        prop: 'checkMan',
        label: '审核人',
        width: 70
      }, {
        prop: 'subManName',
        label: '提交人',
        width: 70
      }, {
        prop: 'subCheckTime',
        label: '提交时间',
        width: 90
      }],
      tableHeader_jd: [{
        prop: 'project',
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
        label: '客户',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'sampTaskName',
        label: '采样任务名称',
        width: 120
      }, {
        prop: 'statusName',
        label: '原始记录状态',
        width: 120
      }, {
        prop: 'contStatusName',
        label: '合同状态',
        width: 90
      }, {
        prop: 'jdOperName',
        label: '校对人',
        width: 70
      }, {
        prop: 'subManName',
        label: '提交人',
        width: 70
      }, {
        prop: 'subJdTime',
        label: '提交时间',
        width: 90
      }],
      tableHeader_return: [
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
        }, {
          prop: 'custName',
          label: '客户',
          width: 90
        }, {
          prop: 'reportNo',
          label: '报告编号',
          width: 90
        }, {
          prop: 'sampTaskName',
          label: '采样任务名称',
          width: 120
        }, {
          prop: 'statusName',
          label: '原始记录状态',
          width: 120
        }, {
          prop: 'returnReason',
          label: '退回原因',
          width: 90
        }, {
          prop: 'subManName',
          label: '提交人',
          width: 70
        }, {
          prop: 'subJdTime',
          label: '提交时间',
          width: 90
        }
      ],
      tableHeader_all: [{
        prop: 'project',
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
        label: '客户',
        width: 90
      }, {
        prop: 'reportNo',
        label: '报告编号',
        width: 90
      }, {
        prop: 'sampTaskName',
        label: '采样任务名称',
        width: 120
      }, {
        prop: 'statusName',
        label: '原始记录状态',
        width: 120
      }, {
        prop: 'contStatusName',
        label: '合同状态',
        width: 90
      }, {
        prop: 'startTime',
        label: '任务开始时间',
        width: 120
      }, {
        prop: 'endTime',
        label: '审核通过时间',
        width: 120
      }, {
        prop: 'jdOperName',
        label: '校对人',
        width: 70
      }, {
        prop: 'checkMan',
        label: '审核人',
        width: 70
      }, {
        prop: 'subCheckTime',
        label: '提交审核时间',
        width: 120
      }, {
        prop: 'subManName',
        label: '提交人',
        width: 70
      }, {
        prop: 'subCheckTime',
        label: '提交时间',
        width: 90
      }],
      button_0: {
        buttonList: []
      },
      button_all: {
        width: 160,
        buttonList: [
          {name: '提交',
            type: 'primary',
            click: 'handleReview',
            condition: (params) => {
              if (params.status === '0' && params.contStatus !== '07') {
                return true
              }
            }
          },
          {name: '原始记录',
            type: 'primary',
            click: 'handleRecord',
            condition: (params) => {
              if (params.status === '0' && params.contStatus !== '07') {
                return true
              }
            }
          }
        ]
      },
      operName: ''
    }
  },
  watch: {
    'fromValiData.status': {
      handler(newName, oldName) {
        switch (newName) {
          // 初始
          case '0':
            this.tableHeader = this.tableHeader_0
            this.button = this.button_all
            break
          // 审核中
          case '1':
            this.tableHeader = this.tableHeader_Verify
            this.button = this.button_0
            break
          // 校对中
          case '1_1':
            this.tableHeader = this.tableHeader_jd
            this.button = this.button_0
            break
          // 退回
          case '3':
            this.tableHeader = this.tableHeader_return
            this.button = this.button_0
            break
          default:
            this.tableHeader = this.tableHeader_all
            this.button = this.button_0
            break
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getOriginalCyQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '审核中'
              break
            case '1_1':
              xdd.statusName = '校对中'
              break
            case '2':
              xdd.statusName = '审核通过'
              break
            case '3':
              xdd.statusName = '退回'
              break
            case '4':
              xdd.statusName = '报告退回'
              break
            case '4_1':
              xdd.statusName = '退回采样'
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
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleReview (params) {
      this.params = params
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
        this.$share.confirm({
          message: '此操作将提交校对, 是否继续?',
          type: 'success',
          confirm: () => {
            let ids = {...this.params}
            ids.jdOper = params.mobile
            ids.jdOperName = params.name
            ids.status = '1_1'
            getOriginalCyModifyData(ids).then(res => {
              this.getListData()
              resolve(true)
            })
          }
        })
      })
    },
    handleRecord(params) {
      this.$router.push('/sampling/original')
      this.$layer.iframe({
        content: {
          content: recordHandle, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            operName: this.operName
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '原始记录',
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
    getUserQueryPageData({pageSize: 99999, pageNow: 1}).then(res => {
      res.result.pageList.forEach(xdd => {
        this.operName += xdd.name + ','
      })
      this.operName = this.operName.substring(0, this.operName.length - 1)
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
