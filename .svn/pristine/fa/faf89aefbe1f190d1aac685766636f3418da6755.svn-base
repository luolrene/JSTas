<!-- 开票信息 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="开始日期:" prop="startTime">
            <el-date-picker v-model="startTime" value-format='yyyy-MM-dd' type="date" placeholder="开始日期" style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="endTime">
            <el-date-picker v-model="endTime" value-format='yyyy-MM-dd' type="date" placeholder="结束时间" style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="部门:">
            <el-cascader :options="groupOptions" @change="changeGroupValue" v-model="fromValiData.groupId" placeholder="请选择部门" :show-all-levels="false" :style="{width:$layer_Size.inputSelfNorWidth}"></el-cascader>
          </el-form-item> -->
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import detail from './details.vue'
import details from '../contactManage/details.vue'
import {
  getCrmBillIngQueryPageData,
  getCrmBillIngDelByIds,
  getGroupQueryAllGroupsTreeById,
  getCrmBillIngSubmitAuditing
} from '@/api/client/billingInfo.js'
export default {
  data() {
    return {
      handleData: function(data) {
        let newData = data.map(item => {
          let option = {
            value: item.id,
            label: item.name
          }
          if (item.children && item.children !== []) {
            option.children = this.handleData(item.children)
          }
          return option
        })
        return newData
      },
      handelOption(options) {
        options.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          } else {
            this.handelOption(item.children)
          }
        })
      },
      loading: false,
      startTime: '',
      endTime: '',
      groupOptions: [], // 部门
      groupId: '',
      boxshow: false,
      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        targetTime: '',
        targetTimeEnd: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'contName', label: '项目名称' },
        {
          type: 'select',
          prop: 'billType',
          label: '开票类型',
          data: [
            { name: '电子普票', id: '1' },
            { name: '纸质普票', id: '2' },
            { name: '纸质专票', id: '3' }
          ]
        },
        {
          type: 'select',
          prop: 'state',
          label: '开票状态',
          data: [
            { name: '待审核', id: '1' },
            { name: '审核中', id: '0' },
            { name: '未开票', id: '4' },
            { name: '已开票', id: '2' },
            { name: '退回', id: '3' }
          ]
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
          prop: 'contName',
          label: '项目名称',
          width: 90
        },
        {
          prop: 'contNo',
          label: '合同编号',
          width: 90
        },
        {
          prop: 'billTypeName',
          label: '开票类型',
          width: 90
        },
        {
          prop: 'billMoney',
          label: '开票金额',
          width: 90
        },
        {
          prop: 'stateName',
          label: '状态',
          width: 90,
          type: 'view2'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 90
        }
      ],
      button: {
        width: 140,
        buttonList: [
          {
            name: '提交审核',
            type: 'primary',
            click: 'handleCheck',
            condition: params => {
              if (params.state === '1') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.state === '1') {
                return true
              }
            }
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (
                Number(this.$store.getters.userInfo.lev) > 3 &&
                params.state === '1'
              ) {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: [],
      targetTimeValue: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmBillIngQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.state) {
              case '0':
                xdd.stateName = '审核中'
                break
              case '1':
                xdd.stateName = '待审核'
                break
              case '2':
                xdd.stateName = '已开票'
                break
              case '3':
                xdd.stateName = '退回' + '(' + xdd.reviewComments + ')'
                break
              case '4':
                xdd.stateName = '未开票'
            }
            switch (xdd.billType) {
              case '1':
                xdd.billTypeName = '电子普票'
                break
              case '2':
                xdd.billTypeName = '纸质普票'
                break
              case '3':
                xdd.billTypeName = '纸质专票'
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
      delete this.fromValiData.groupId
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.targetTimeValue = []
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
    handleCheck(params) {
      getCrmBillIngSubmitAuditing(params).then(res => {
        this.$share.message()
        this.getListData()
      })
    },
    changeMonth(e) {
      this.fromValiData.targetTime = e[0]
      this.fromValiData.targetTimeEnd = e[1]
      this.getListData()
    },
    // 单行删除
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmBillIngDelByIds({ ids: row.id }).then(res => {
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
    // 批量删除
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
    // 获取部门信息
    changeGroupValue() {
      getGroupQueryAllGroupsTreeById({
        id: this.$store.getters.userInfo.groupId
      }).then(res => {
        this.typeData = res.result
        let datas = this.handleData(this.typeData)
        this.handelOption(datas)
        this.groupOptions = datas
      })
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
            layerid: '',
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '项目详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted() {
    this.changeGroupValue()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
