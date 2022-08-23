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
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :isSelection="false" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>
<script>
import edit from './edit.vue'
import verity from './verity.vue'
import detail from '../linkmanVerity/details'
import {
  getCrmBillIngToExamineQueryPageData,
  getCrmResponsibilityDelLaCrmTrackIds
} from '@/api/client/verity.js'
export default {
  data() {
    return {
      loading: false,
      startTime: '',
      endTime: '',
      boxshow: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        state:'0',
        targetTime: '',
        targetTimeEnd: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'contName', label: '项目名称' },
        { type: 'input', prop: 'contNo', label: '合同编号' },
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
          prop: 'createUserName',
          label: '申请人',
          width: 90
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 90,
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
          prop: 'createTime',
          label: '申请时间',
          width: 90
        },
        {
          prop: 'stateName',
          label: '处理结果',
          width: 90
        }
      ],
      button: {
        buttonList: [
          {
            name: '审批',
            type: 'primary',
            click: 'handleVerity',
            condition: params => {
              if (
                params.state === '0' &&
                Number(this.$store.getters.userInfo.lev) > 1
              ) {
                return true
              }
            }
          },
          {
            name: '开票',
            type: 'primary',
            click: 'handleBilling',
            condition: params => {
              if (params.state === '4') {
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
      getCrmBillIngToExamineQueryPageData(this.fromValiData)
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
          let newData = res.result.pageList.filter(xdd => {
            return xdd.sum === xdd.sumNow
          })
          this.tableData = newData
          this.fromValiData.dataSum = newData.length
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleVerity(params) {
      this.$layer.iframe({
        content: {
          content: verity, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '审核',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBilling(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '开票信息',
        maxmin: true,
        shadeClose: false
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
    // 单行删除
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCrmResponsibilityDelLaCrmTrackIds({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
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
      delete this.fromValiData.groupId
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.targetTimeValue = []
      this.getListData()
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
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
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
