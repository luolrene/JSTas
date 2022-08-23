<!-- 合同信息管理 -->
<template>
  <div class="pc-container contractMsg">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-form-item label="分组:" slot="other">
          <el-cascader
            v-model="groupIds"
            :options="groupOption"
            :show-all-levels="false"
            @change="getGroupChange"
            :props="props"
            :style="{width:$layer_Size.inputSelfNorWidth}"
            placeholder=""></el-cascader>
        </el-form-item>
        <el-form-item label="审核时间:" prop="checkTime" slot="other">
          <el-date-picker
            v-model="checkTime"
            type="daterange"
            :clearable="false"
            value-format="yyyy-MM-dd"
            range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 240px;margin-top: 3px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下属人员:" prop="branches" slot="other">
          <el-select
            v-model="fromValiData.branches"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择人员">
            <el-option
              v-for="(item,index) in userData"
              :key="index"
              :label="item.name"
              :value="item.mobile">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-rank" @click="handleExport()">导出</el-button>
      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-edit-outline" @click="handleSelection('审核')">批量提交审核</el-button>
      <el-button type="danger" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-delete" @click="handleSelection('删除')">批量放弃</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange">
      <template v-slot:button="params">
        <el-badge :is-dot="params.scope.row.waitNum > 0" class="item" v-if="params.scope.row.iscycle === '1' && params.scope.row.status === '06'">
          <el-button type="primary" plain :size="$layer_Size.buttonSize" style="padding: 7px 15px;margin-right: 7px;" @click="handlePlan(params.scope.row)">上传方案</el-button>
        </el-badge>
      </template>
    </tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import details from './details.vue'
import planList from './plan_list.vue'
import exportList from './export_list.vue'
import upload from '../../consult/task/upload.vue'
import { getSysQueryDict } from '../../../api/common.js'
import {
  getContractQueryPageData,
  getContractAddOrModifyContract,
  getContractDropContract,
  getContractSubmitToCheck
} from '../../../api/contract/msg.js'
import { getGroupQueryAllGroupsTree } from '../../../api/jcxxgl/group.js'
import { zzData } from '@/utils/public.js'
import {getUserQueryPageData} from '@/api/jcxxgl/user.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        project: null,
        custName: null,
        contNo: null,
        price: null,
        plate: null,
        projectType: null,
        busiType: null,
        status: null,
        gsType: null,

        checkTime: null,
        branches: [],
        queryType: '1' // 1退回方案数目2待处理方案数目
      },
      fromData: [
        { type: 'input', prop: 'project', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
        { type: 'input', prop: 'price', label: '合同金额' },
        { type: 'select', prop: 'plate', label: '项目板块', data: [] },
        { type: 'select', prop: 'projectType', label: '项目类型', data: [] },
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
          prop: 'status',
          label: '合同状态',
          data: [
            { id: '00', name: '草稿' },
            { id: '03', name: '审核退回' },
            { id: '07', name: '变更审核' },
            { id: '01', name: '审核中' },
            { id: '02', name: '审核通过' },
            { id: '06', name: '进行中' },
            { id: '05', name: '已完成' },
            { id: '04', name: '放弃' },
            { id: '08', name: '方案录入' }
          ]
        },
        {
          type: 'select',
          prop: 'gsType',
          label: '归属',
          data: [{ name: '我的', id: '1' }, { name: '下属的', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 200
        },
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
          width: 120
        },
        {
          prop: 'price',
          label: '合同金额',
          width: 120
        },
        {
          prop: 'area',
          label: '区域',
          width: 160
        },
        {
          prop: ' proTerm',
          label: '项目期限',
          width: 90
        },
        {
          prop: 'busiTypeName',
          label: '业务类别',
          width: 90
        },
        {
          prop: 'projectTypeName',
          label: '检测类型',
          width: 90
        },
        {
          prop: 'statusName',
          label: '合同状态',
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
        width: 300,
        buttonList: [
          {
            name: '提交审核',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (params.status === '00' || params.status === '03') {
                return true
              }
            }
          },
          {
            name: '上传附件',
            type: 'primary',
            click: 'handleUpload',
            condition: params => {
              if (params.status === '06') {
                return true
              }
            }
          },
          {
            name: '撤回',
            type: 'primary',
            click: 'handleRecall',
            condition: params => {
              if (params.status === '01') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.status === '00' || params.status === '03') {
                return true
              }
            }
          },
          {
            name: '放弃',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (params.status !== '04') {
                return true
              }
            }
          }
        ]
      },
      checkTime: [],
      multipleSelection: [],
      plateData: [], // 项目板块
      projectTypeData: [], // 项目类型
      groupOption: [],
      groupIds: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      let ids = { ...this.fromValiData, ...this.$route.query }
      if (ids.branches.length > 0) {
        ids.branches = ids.branches.join(',')
      } else {
        delete ids.branches
      }

      getContractQueryPageData(ids).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '00':
              xdd.statusName = '草稿'
              break
            case '01':
              xdd.statusName = '审核中'
              break
            case '02':
              xdd.statusName = '审核通过'
              break
            case '03':
              xdd.statusName = '审核退回'
              break
            case '04':
              xdd.statusName = '放弃'
              break
            case '05':
              xdd.statusName = '已完成'
              break
            case '06':
              xdd.statusName = '进行中'
              break
            case '07':
              xdd.statusName = '变更审核'
              break
            case '08':
              xdd.statusName = '方案录入'
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
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getGroupListData() {
      getGroupQueryAllGroupsTree().then(res => {
        this.groupOption = zzData(res.result)
      })
    },
    getGroupChange(params) {
      this.fromValiData.groupId = params[params.length - 1]
    },
    doSearch() {
      if (this.checkTime.length > 0) {
        this.fromValiData.checkTime = this.checkTime[0] + ',' + this.checkTime[1]
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset() {
      this.checkTime = []
      delete this.fromValiData.checkTime
      this.fromValiData.pageNow = 1
      this.groupIds = []
      this.fromValiData.groupId = null
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleReview(params, title) {
      let ids = params.id
      let index = '此操作将提交审核, 是否继续?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        getContractSubmitToCheck({ ids: ids }).then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          this.getListData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交审核'
        })
      })
    },
    handleUpload (params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: params.id
          } // props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '附件上传',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            plateData: this.plateData, // 项目板块
            projectTypeData: this.projectTypeData, // 项目类型
            payTypeData: this.payTypeData, // 付款方式
            mailTypeData: this.mailTypeData // 寄送方式
          } // props
        },
        area: this.$layer_Size.Max,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            plateData: this.plateData, // 项目板块
            projectTypeData: this.projectTypeData, // 项目类型
            payTypeData: this.payTypeData, // 付款方式
            mailTypeData: this.mailTypeData // 寄送方式
          } // props
        },
        area: this.$layer_Size.Max,
        title: '编辑',
        maxmin: true,
        shadeClose: false
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleRecall(row) {
      let that = this
      this.$share.confirm({
        message: '此操作将撤回正在审核中的合同, 是否继续?',
        confirm: function() {
          let obj = {}
          obj = row
          obj.status = '00'
          getContractAddOrModifyContract(obj).then(res => {
            that.$message({
              type: 'success',
              message: '撤回成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        message: '此操作将放弃合同, 是否继续?',
        confirm: function() {
          getContractDropContract({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '放弃成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleExport() {
      this.$layer.iframe({
        content: {
          content: exportList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.fromValiData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '导出表头选择',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSelection(type) {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请勾选需要审核的数据', 'warning')
        return
      }

      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      if (type === '删除') {
        this.handleDelete(ids)
      } else {
        let title = ''
        title =
          `此操作将提交<span style="color:red">` +
          this.multipleSelection.length +
          `</span>条审核,是否继续?`
        this.handleReview(ids, title)
      }
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getDicData() {
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
    },
    getUserData() {
      let ids = {}
      ids.pageSize = '10'
      ids.pageNow = '1'
      ids.isFenp = '1'
      getUserQueryPageData(ids).then(res => {
        this.userData = res.result.pageList
      })
    }
  },
  mounted() {
    this.getListData()
    this.getUserData()
    this.getGroupListData()
  },
  created() {
    this.getDicData()
  }
}
</script>

<style scoped lang="scss">
.contractMsg .el-badge__content.is-fixed.is-dot {
  top: 4px;
  right: 13px;
}
</style>
