<!--访客计划-->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="归属">
            <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags clearable :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="开始日期:" prop="startTime">
            <el-date-picker v-model="startTime" value-format='yyyy-MM-dd' type="date" placeholder="开始日期" style="width: 220px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="endTime">
            <el-date-picker v-model="endTime" value-format='yyyy-MM-dd' type="date" placeholder="结束时间" style="width: 220px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-promotion" @click="handleAdds()" v-if="LEV>1">批量添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import go from './go'
import add from './add'
import edit from './edit'
import adds from './adds'
import postpone from './postpone'
import details from './details'
import detail from './detail'
import { getCrmSysGetUserAll } from '@/api/client/info.js'
import {
  getCrmVisitorAddOrModify,
  getCrmVisitorQueryPageData,
  getCrmVisitorDelCrmVisitorIds
} from '@/api/client/visitorsToPlan.js'
export default {
  data() {
    return {
      LEV: '',
      loading: false,
      boxshow: false,

      startTime: '',
      endTime: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        position: null,
        startTime: '',
        endTime: '',
        other: '',
        status: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'contactsName', label: '联系人' },
        { type: 'input', prop: 'executorName', label: '执行人' },
        {
          type: 'select',
          prop: 'status',
          label: '跟进状态',
          data: [
            { name: '未跟进', id: '1' },
            { name: '已跟进', id: '2' },
            { name: '延期', id: '3' },
            { name: '取消', id: '4' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '访客计划名称',
          type: 'view2',
          width: 120
        },
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          width: 120
        },
        {
          prop: 'contactsName',
          label: '联系人',
          width: 90
        },
        {
          prop: 'objective',
          label: '拜访目的',
          width: 90
        },

        {
          prop: 'statusName',
          label: '跟进状态',
          width: 80
        },
        {
          prop: 'executorTime',
          label: '执行时间',
          width: 90
        },
        {
          prop: 'remarks',
          label: '备注',
          width: 90
        },
        {
          prop: 'executorName',
          label: '执行人',
          width: 80
        }
      ],
      button: {
        width: 370,
        buttonList: [
          {
            name: '跟进',
            type: 'primary',
            click: 'handleChange',
            condition: params => {
              if (params.status === '1' || params.status === '3') {
                return true
              }
            }
          },
          {
            name: '延期计划',
            type: 'primary',
            click: 'handleCancelPlan',
            condition: params => {
              if (params.status === '1') {
                return true
              }
            }
          },
          {
            name: '取消计划',
            type: 'primary',
            click: 'handlePostponelPlan',
            condition: params => {
              if (params.status === '1' || params.status === '3') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                this.$store.getters.userInfo.name === params.executorName ||
                this.$store.getters.userInfo.lev === '10' ||
                params.status === '1'
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
      this.fromValiData = { ...this.fromValiData, ...this.$route.query }
      getCrmVisitorQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.status === '1') {
              xdd.statusName = '未跟进'
            } else if (xdd.status === '2') {
              xdd.statusName = '已跟进'
            } else if (xdd.status === '3') {
              xdd.statusName = '延期'
            } else if (xdd.status === '4') {
              xdd.statusName = '取消'
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
    // 查询
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
    // 重置
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.startTime = ''
      this.endTime = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    // 添加
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: add, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
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
          }
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
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
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmVisitorDelCrmVisitorIds({ ids: row.id }).then(res => {
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            that.getListData()
          })
        }
      })
    },

    handleChange(params) {
      this.$layer.iframe({
        content: {
          content: go, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '跟进记录',
        maxmin: true,
        shadeClose: false
      })
    },
    handlePostponelPlan(params, title) {
      params.status = '4'
      let index = '是否将跟进状态调整为取消计划?'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          getCrmVisitorAddOrModify(params).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
          this.getListData()
        })
    },
    handleCancelPlan(params) {
      this.$layer.iframe({
        content: {
          content: postpone, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '延期计划',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdds() {
      this.$layer.iframe({
        content: {
          content: adds, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '批量添加访客计划',
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
        area: this.$layer_Size.Max,
        title: '访客计划详情',
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
    this.LEV = JSON.parse(sessionStorage.getItem('userInfo')).lev
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped>
</style>
