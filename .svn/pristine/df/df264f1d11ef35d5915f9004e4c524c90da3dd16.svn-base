
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
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader"  :button="button" :dataSum='fromValiData.dataSum' :isSelection="false" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './billingInfo_edit.vue'
import {
  getCrmBillIngQueryPageData,
  getGroupQueryAllGroupsTreeById,
  getCrmBillIngSubmitAuditing
} from '@/api/client/billingInfo.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
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
      boxshow: false,
      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        targetTime: '',
        targetTimeEnd: ''
      },
      fromData: [
        { type: 'input', prop: 'contName', label: '项目名称' },
        {
          type: 'select',
          prop: 'state',
          label: '状态',
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
          width: 140
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
      this.fromValiData.custId = this.params.id
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
          data: {
            params: this.params
          } // props
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
            datas: params
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
    changeMonth(e) {
      this.fromValiData.targetTime = e[0]
      this.fromValiData.targetTimeEnd = e[1]
      this.getListData()
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
    this.changeGroupValue()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
