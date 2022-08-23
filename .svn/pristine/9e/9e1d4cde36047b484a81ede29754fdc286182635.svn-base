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

      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../client/contactManage/details'

import edit from './edit.vue'
import {
  getCrmProjectTipsQueryPageData,
  getCrmProjectTipsDelCrmProjectTipsIds,
  getCrmProjectTipsAddOrModify
} from '@/api/client/cooperationExpire.js'

import { getCrmSysGetUserAll } from '@/api/client/info.js'
export default {
  data() {
    return {
      loading: false,
      boxshow: false,

      startTime: '',
      endTime: '',
      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'contactsName', label: '联系人' },
        {
          type: 'select',
          prop: 'status',
          label: '项目状态',
          data: [
            { id: '即将到期', name: '即将到期' },
            { id: '已到期', name: '已到期' },
            { id: '即将提醒', name: '即将提醒' }
          ]
        },
        {
          type: 'select',
          prop: 'implementStatus',
          label: '跟进状态',
          data: [{ id: '1', name: '未跟进' }, { id: '2', name: '已跟进' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 140,
          type: 'view'
        },
        {
          prop: 'contactsName',
          label: '联系人',
          width: 90
        },
        {
          prop: 'projectSectionName',
          label: '项目板块',
          width: 90
        },
        {
          prop: 'projectCategory',
          label: '项目类别',
          width: 90
        },
        {
          prop: 'status',
          label: '项目状态',
          width: 90
        },
        {
          prop: 'quota',
          label: '金额',
          width: 90
        },
        {
          prop: 'expireTime',
          label: '到期时间',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '创建人',
          width: 90
        },
        {
          prop: 'implementStatusName',
          label: '跟进状态',
          condition: params => {
            if (params.implementStatus === '1') {
              return '#F56C6C'
            } else {
              return '#67C23A'
            }
          },
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '跟进',
            type: 'primary',
            click: 'handleFollow',
            condition: params => {
              if (params.implementStatus === '1') {
                return true
              } else {
                return false
              }
            }
          },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
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
      affiliationValue: '',
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmProjectTipsQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.projectSection) {
              case '0':
                xdd.projectSectionName = '环境'
                break
              case '1':
                xdd.projectSectionName = '农业'
                break
              case '2':
                xdd.projectSectionName = '土壤'
                break
            }
            switch (xdd.implementStatus) {
              case '1':
                xdd.implementStatusName = '未跟进'
                break
              case '2':
                xdd.implementStatusName = '已跟进'
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
          getCrmProjectTipsDelCrmProjectTipsIds({ ids: row.id }).then(res => {
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
    doSearch() {
      if (this.startTime.length > 0) {
        this.fromValiData.startTime = this.startTime
      }
      if (this.endTime.length > 0) {
        this.fromValiData.endTime = this.endTime
      }
      this.getListData()
    },
    doReset(formName) {
      this.startTime = ''
      this.endTime = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
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
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFollow(row, title) {
      let index = '是否将跟进状态调整为已跟进?'
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
          row.implementStatus = '2'
          getCrmProjectTipsAddOrModify(row).then(res => {
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
