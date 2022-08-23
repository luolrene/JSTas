<!--销售机会 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="归属">
            <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags clearable :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="开始日期:" prop="startTime">
            <el-date-picker v-model="startTime" value-format='yyyy-MM-dd' type="date" placeholder="开始日期" style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="endTime">
            <el-date-picker v-model="endTime" value-format='yyyy-MM-dd' type="date" placeholder="结束时间" style="width: 200px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-check" v-if="LEV>9" @click="doImportant()">重点机会</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import add from './add.vue'
import edit from './edit.vue'
import code from './code'
import detail from './detail'
import details from '../contactManage/details'
import {
  getCrmSaleOpportunityQueryPageData,
  getCrmSaleOpportunityDelCrmSaleOpportunityIds,
  getCrmSaleOpportunityGetImportantStandard
} from '@/api/client/salesLeads.js'
import { getCrmSysGetUserAll } from '@/api/client/info.js'

export default {
  data() {
    return {
      LEV: '',
      code: '',
      loading: false,
      boxshow: false,

      startTime: '',
      endTime: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        startTime: '',
        endTime: '',
        code: '',
        other: '',
        stage: ''
        // stages:['1','2','3'].join(',')
      },
      fromData: [
        {
          type: 'input',
          prop: 'custName',
          label: '客户名称'
        },
        {
          type: 'input',
          prop: 'executorName',
          label: '负责人'
        },
        {
          type: 'input',
          prop: 'opportunityName',
          label: '销售机会名称'
        },
        {
          type: 'select',
          prop: 'stage',
          label: '销售阶段',
          data: [
            { name: '发现需求', id: '1' },
            { name: '确认需求', id: '2' },
            { name: '商务谈判', id: '3' },
            { name: '合同签订', id: '4' },
            { name: '输单', id: '5' }
          ]
        },
        {
          type: 'select',
          prop: 'tasklev',
          label: '是否重点',
          data: [{ name: '否', id: '1' }, { name: '是', id: '3' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          condition: function(params) {
            if (params) {
              if (params.taskLev === '3') {
                return 'red'
              }
            }
          },
          width: 120
        },
        {
          prop: 'contactsName',
          label: '联系人',
          width: 90
        },
        {
          prop: 'opportunityName',
          label: '销售机会名称',
          width: 110
        },
        {
          prop: 'opportunityId',
          label: '销售机会编号',
          type: 'view2',
          width: 120
        },

        {
          prop: 'stageName',
          label: '销售阶段',
          width: 90
        },
        {
          prop: 'estimatedAmount',
          label: '预计金额',
          width: 90
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 90
        },
        {
          prop: 'executorName',
          label: '负责人',
          width: 90
        }
      ],
      button: {
        width: 200,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.stage === '5' || params.stage === '4') {
                return false
              } else {
                return true
              }
              if (
                this.$store.getters.userInfo.name === params.executorName ||
                this.$store.getListData.userInfo.lev === '10'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (this.$store.getters.userInfo.lev === '10') {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      props_affiliation: {
        multiple: true
      },
      optionsAffiliation: [
        {
          label: '我的',
          value: '2'
        },
        {
          label: '下属的',
          value: '3',
          children: []
        }
      ],
      affiliationValue: ''
    }
  },

  methods: {
    getListData() {
      this.loading = true
      if (JSON.parse(sessionStorage.getItem('userInfo')).lev > '9') {
        getCrmSaleOpportunityGetImportantStandard({}).then(res => {
          this.fromValiData.code = res.result.code
          this.LEV = JSON.parse(sessionStorage.getItem('userInfo')).lev
        })
      }
      this.fromValiData = { ...this.fromValiData, ...this.$route.query }
      getCrmSaleOpportunityQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.stage === '1') {
              xdd.stageName = '发现需求'
            } else if (xdd.stage === '2') {
              xdd.stageName = '确认需求'
            } else if (xdd.stage === '3') {
              xdd.stageName = '商务谈判'
            } else if (xdd.stage === '4') {
              xdd.stageName = '合同签订'
            } else if (xdd.stage === '5') {
              xdd.stageName = '输单'
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
    changeCascaderAffiliation() {
      getCrmSysGetUserAll({ id: this.$store.getters.userInfo.orgId }).then(
        res => {
          this.optionData = res.result
          let arr = this.optionData.map(item => {
            return {
              label: item.name,
              value: item.userId
            }
          })
          this.optionsAffiliation[1].children = arr
        }
      )
    },
    changeAffiliation(params) {
      if (params[0]) {
        if (params[0][0] === '2') {
          this.fromValiData.other = params[0][0]
          this.doSearch()
        }
      }
      let list = []
      params.forEach(item => {
        list.push(item[1])
      })
      this.fromValiData.subordinateIds = list.join(',')
      this.doSearch()
    },

    doSearch() {
      if (this.startTime.length > 0) {
        this.fromValiData.startTime = this.startTime
      }
      if (this.endTime.length > 0) {
        this.fromValiData.endTime = this.endTime
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.groupId = null
      this.startTime = ''
      this.endTime = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 修改重点金额
    doImportant() {
      this.$layer.iframe({
        content: {
          content: code, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: add, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmSaleOpportunityDelCrmSaleOpportunityIds({ ids: row.id }).then(
            res => {
              if (res.code === 0) {
                that.$message({
                  type: 'success',
                  message: '删除成功'
                })
              }
              that.getListData()
            }
          )
        }
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '客户名称详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '销售机会详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.LEV = JSON.parse(sessionStorage.getItem('userInfo')).lev
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped>
</style>
