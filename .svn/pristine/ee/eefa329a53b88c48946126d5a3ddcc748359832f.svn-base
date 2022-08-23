<!-- 合同任务管理 -->
<template>
  <div class="pc-container contractTask">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-form-item label="合同状态:" slot="other">
          <el-select
            @change="changeSelect"
            @clear="clearSelect"
            :clearable='true'
            v-model="statusValue"
            placeholder="请选择"
            :style="{width:$layer_Size.inputSelfSelect}">
            <el-option v-for="item in statusData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()" :size="$layer_Size.buttonSize">查询</el-button>
        <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')" :size="$layer_Size.buttonSize">重置</el-button>
      </template>

      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :button="button"
      :dataSum='fromValiData.dataSum'
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange">
      <template v-slot:button="params">
        <el-badge :is-dot="params.scope.row.waitNum > 0" class="item" v-if="params.scope.row.iscycle === '1' && params.scope.row.status === '06'">
          <el-button type="primary" plain  :size="$layer_Size.buttonSize" style="padding: 7px 15px;margin-right: 7px;" @click="handlePlan(params.scope.row)">方案</el-button>
        </el-badge>
      </template>
    </tableItem>
  </div>
</template>

<script>
import pointList from './point_list.vue'
import cycleEdit from './cycle_edit.vue'
import majorList from './major_list.vue'
import start from './start.vue'
import planList from './plan_list.vue'
import cycle from './cycle.vue'
import details from '../../contract/msg/details.vue'
import { getSysQueryDict } from '@/api/common.js'
import {
  getContractQueryPageData,
  getContractQueryContractById,
  getContractFinishContract
} from '@/api/contract/msg.js'
import {getConSultRetrunBack} from '@/api/consult/task.js'
import {getContFinishCase, getContTaskStartTask} from '@/api/contract/task.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        project: null,
        plate: null,
        projectType: null,
        payType: null,
        mailType: null,
        queryType: '2', // 1退回方案数目2待处理方案数目
        status: '02,06,05,07'
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'project', label: '项目名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
        { type: 'input', prop: 'price', label: '合同金额' },
        { type: 'select', prop: 'plate', label: '项目板块', data: [] },
        { type: 'select', prop: 'projectType', label: '项目类型', data: [] },
        { type: 'select', prop: 'payType', label: '付款方式', data: [] },
        { type: 'select', prop: 'mailType', label: '寄送方式', data: [] },
        {
          type: 'select',
          prop: 'busiType',
          label: '业务类别',
          data: [
            { id: '1', name: '纯检测' },
            { id: '2', name: '纯咨询' },
            { id: '3', name: '检测和咨询' }
          ]
        },
        {
          type: 'select',
          prop: 'isFnishCase',
          label: '方案确认',
          data: [{ name: '是', id: '1' }, { name: '否', id: '0' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'project',
          label: '项目名称',
          type: 'view',
          width: 230,
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
          width: 120,
          sort: 'custom'
        },
        {
          prop: 'price',
          label: '合同金额',
          width: 120
        },
        {
          prop: 'plateName',
          label: '项目板块',
          width: 90
        },
        {
          prop: 'projectTypeName',
          label: '项目类型',
          width: 90
        },
        {
          prop: 'reportTaskNum',
          label: '报告任务数',
          width: 110
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'proTerm',
          label: '项目期限',
          width: 90
        },
        {
          prop: 'busiTypeName',
          label: '业务类别',
          width: 90
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          type: 'view2',
          width: 90,
          condition: params => {
            if (params.iscycle === '1') {
              return '#F56C6C'
            }
          }
        },
        {
          prop: 'typeName',
          label: '合同类型',
          width: 90
        },
        {
          prop: 'statusName',
          label: '合同状态',
          width: 90
        },
        {
          prop: 'isFnishCaseName',
          label: '方案确认',
          width: 90
        },
        {
          prop: 'sellerName',
          label: '经办人',
          width: 90
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 90
        }
      ],
      button: {
        width: 420,
        buttonList: [
          {
            name: '启动',
            type: 'primary',
            click: 'handleStart',
            condition: params => {
              if (params.status === '02' && Number(this.$store.getters.userInfo.lev) > 3 && params.isFnishCase === '1') {
                return true
              }
            }
          },
          {
            name: '项目确认',
            type: 'primary',
            click: 'handleProjectConfirm',
            condition: params => {
              if (params.busiType === '2' && params.isFnishCase === '0') {
                return true
              }
            }
          },
          {
            name: '主任务管理',
            type: 'primary',
            click: 'handleMajor',
            condition: params => {
              if (params.status === '06' && Number(this.$store.getters.userInfo.lev) > 3 && params.busiType !== '2') {
                return true
              }
            }
          },
          {
            name: '周期信息',
            type: 'primary',
            click: 'handleCycle',
            condition: function(params) {
              if (params.iscycle === '1' && params.status !== '07' && params.busiType !== '2') {
                return true
              }
            }
          },
          {
            name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: params => {
              if (params.iscycle === '1' && params.status !== '07' && params.busiType !== '2') {
                return true
              }
            }
          },
          {
            name: '点位录入',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.status !== '07' && params.busiType !== '2') {
                return true
              }
            }
          },
          {
            name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: params => {
              if (params.status === '02' && params.busiType === '3') {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: [],
      areaData: [], // 客户区域
      plateData: [], // 项目板块
      projectTypeData: [], // 项目类型
      payTypeData: [], // 付款方式
      mailTypeData: [], // 寄送方式

      statusData: [
        { value: '02', label: '审核通过' },
        { value: '05', label: '已完成' },
        { value: '06', label: '进行中' },
        { value: '07', label: '变更审核' }
      ],
      statusValue: ''
    }
  },
  methods: {
    getListData(status) {
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      if (status) {
        ids.status = status
      }
      this.loading = true
      ids = { ...ids, ...this.$route.query }
      this.fromValiData = ids
      getContractQueryPageData(ids).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '02':
              xdd.statusName = '审核通过'
              break
            case '06':
              xdd.statusName = '进行中'
              break
            case '05':
              xdd.statusName = '已完成'
              break
            case '07':
              xdd.statusName = '变更审核'
              break
          }
          switch (xdd.iscycle) {
            case '1':
              xdd.isCycleName = '是'
              break
            case '0':
              xdd.isCycleName = '否'
              break
          }
          switch (xdd.type) {
            case '1':
              xdd.typeName = '采样'
              break
            case '2':
              xdd.typeName = '送样'
              break
            case '3':
              xdd.typeName = '采样，送样'
              break
          }
          switch (xdd.isFnishCase) {
            case '1':
              xdd.isFnishCaseName = '是'
              break
            case '0':
              xdd.isFnishCaseName = '否'
              break
          }
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
    handleStart(params) {
      if (params.busiType === '2') {
        let index = '此操作将启动合同任务，是否继续？'
        this.$confirm(index, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          let ids = {}
          ids.contId = params.id
          ids.isAuto = '0'
          ids.taskLev = '1'
          ids.reportTaskNum = 0
          getContTaskStartTask(ids).then(res => {
            this.getListData()
            this.$share.message('启动成功', 'success')
          }).catch(() => {

          })
        })
      } else {
        this.$layer.iframe({
          content: {
            content: start, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '合同启动',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleProjectConfirm(params) {
      let index = '此操作将进行项目确认，是否继续？'
      this.$confirm(index, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getContFinishCase({ contId: params.id }).then(res => {
          this.$share.message('确认成功')
          this.getListData()
        })
      })
    },
    handlePlan(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleMajor(params) {
      this.$layer.iframe({
        content: {
          content: majorList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '主任务管理',
        maxmin: true,
        shadeClose: false
      })
    },
    handleCycle(params) {
      this.$layer.iframe({
        content: {
          content: cycleEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '周期信息',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFinish(params) {
      this.$confirm('此操作将完成周期合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getContractFinishContract(params).then(res => {
          this.$message({
            type: 'success',
            message: '完成成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消完成'
        })
      })
    },
    handleReturn(params) {
      let that = this
      this.$prompt('请输入退回原因', '退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = {}
        ids.returnReason = value
        ids.contId = params.id
        getConSultRetrunBack(ids).then(res => {
          that.getListData()
          that.$share.message('退回成功', 'success')
        })
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: pointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '点位列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.id }).then(res => {
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
      if (params.iscycle === '1') {
        this.$layer.iframe({
          content: {
            content: cycle, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '周期信息',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.fromValiData.status = '02,05,06,07'
      this.statusValue = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    changeSelect(e) {
      this.fromValiData.status = e
      this.doSearch()
    },
    clearSelect(e) {
      this.fromValiData.status = '02,05,06,07'
      this.doSearch()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getDicData() {
      getSysQueryDict({ type: 'AREA' }).then(res => {
        this.areaData = res.result
      })
      getSysQueryDict({ type: 'XMBK' }).then(res => {
        this.plateData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'plate') {
            xdd.data = this.plateData
          }
        })
      })
      getSysQueryDict({ type: 'XMLX' }).then(res => {
        this.projectTypeData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'projectType') {
            xdd.data = this.projectTypeData
          }
        })
      })
      getSysQueryDict({ type: 'FKFS' }).then(res => {
        this.payTypeData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'payType') {
            xdd.data = this.payTypeData
          }
        })
      })
      getSysQueryDict({ type: 'HTJS' }).then(res => {
        this.mailTypeData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'mailType') {
            xdd.data = this.mailTypeData
          }
        })
      })
    }
  },
  mounted() {
    this.getDicData()
    this.getListData()
  },
  created() {}
}
</script>

<style lang="scss">
.contractTask .el-badge__content.is-fixed.is-dot {
  top: 4px;
  right: 13px;
}
</style>
