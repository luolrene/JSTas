<!--招标管理 -->
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
          <el-form-item label="结束日期:" prop="endTime">
            <el-date-picker v-model="endTime" value-format='yyyy-MM-dd' type="date" placeholder="结束日期" style="width: 220px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-user" @click="handleUse()" v-if="Number(this.$store.getters.userInfo.lev)===10">抄送人</el-button>
      </template>
      <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import use from '../../client/quotationRecord/use.vue'
import log from './log.vue'
import edit from './edit.vue'
import success from './success.vue'
import upload from './upload.vue'
import details from '../../client/contactManage/details'
import detail from './details'
import {
  getCrmBiddingQueryPageData,
  getCrmBiddingAddOrModify,
  getCrmBiddingDelLByIds
} from '@/api/bid/bid.js'
import { getCrmSysGetUserAll } from '@/api/client/info.js'
export default {
  data() {
    return {
      loading: false,
      boxshow: false,
      startTime: '',
      endTime: '',
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        startTime: '',
        endTime: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'opportunityName', label: '项目名称' },
        {
          type: 'select',
          prop: 'projectNode',
          label: '项目节点',
          data: [
            { name: '编辑', id: '0' },
            { name: '退回', id: '1' },
            { name: '审核中', id: '2' },
            { name: '文件编制', id: '3' },
            { name: '现场投标', id: '4' },
            { name: '已完成', id: '5' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          width: 90
        },
        {
          prop: 'opportunityName',
          label: '项目名称',
          type: 'view2',
          width: 90
        },
        {
          prop: 'fixedPrice',
          label: '项目限价',
          width: 90
        },
        {
          prop: 'startTime',
          label: '开标时间',
          width: 90
        },
        {
          prop: 'projectNodeName',
          label: '项目节点',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '创建人',
          width: 90
        },
        {
          prop: 'commissionerName',
          label: '招投标专员',
          width: 50
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '提交审核',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (
                (this.$store.getters.userInfo.userId === params.createUser &&
                  params.projectNode === '0') ||
                params.projectNode === '1'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '上传文件',
            type: 'primary',
            click: 'handleUpload',
            condition: params => {
              if (
                this.$store.getters.userInfo.position === 'ZW_100' &&
                params.projectNode === '3'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '进行投标',
            type: 'primary',
            click: 'handleBid',
            condition: params => {
              if (
                this.$store.getters.userInfo.position === 'ZW_100' &&
                params.projectNode === '3'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '审核日志',
            type: 'primary',
            click: 'handleLog',
            condition: params => {
              if (
                this.$store.getters.userInfo.userId === params.createUser &&
                params.projectNode === '1'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '完成',
            type: 'primary',
            click: 'handleSuccess',
            condition: params => {
              if (
                this.$store.getters.userInfo.userId === params.createUser &&
                params.projectNode === '4'
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                (this.$store.getters.userInfo.userId === params.createUser &&
                  params.projectNode === '0') ||
                params.projectNode === '1'
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
        },
        {
          label: '抄送给我',
          value: '4'
        }
      ],
      affiliationValue: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmBiddingQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.projectNode) {
              case '0':
                xdd.projectNodeName = '编辑'
                break
              case '1':
                xdd.projectNodeName = '退回'
                break
              case '2':
                xdd.projectNodeName = '审核中'
                break
              case '3':
                xdd.projectNodeName = '文件编制'
                break
              case '4':
                xdd.projectNodeName = '现场投标'
                break
              case '5':
                xdd.projectNodeName = '已完成'
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
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
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
          }
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleUpload(params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '上传文件',
        maxmin: true,
        shadeClose: false
      })
    },
    handleLog(params) {
      this.$layer.iframe({
        content: {
          content: log, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '审核日志',
        maxmin: true,
        shadeClose: false
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
        if (params[0][0] === '2' || params[0][0] === '4') {
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
      this.fromValiData.pageNow = 1
      this.startTime = []
      this.endTime = []
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleUse() {
      this.$layer.iframe({
        content: {
          content: use, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: 'TBGL'
          } // props
        },
        area: this.$layer_Size.Max,
        title: '抄送人',
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
          getCrmBiddingDelLByIds({ ids: row.id }).then(res => {
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
    // 审核
    handleReview(params, title) {
      let index = '此操作将提交审核, 是否继续?'
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
          params.projectNode = '2'
          getCrmBiddingAddOrModify(params).then(res => {
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
            message: '已取消提交审核'
          })
        })
    },
    // 进行投标
    handleBid(params, title) {
      let index = '此操作将状态改变为现场投标, 是否继续?'
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
          params.projectNode = '4'
          getCrmBiddingAddOrModify(params).then(res => {
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
            message: '已取消改变状态'
          })
        })
    },
    // 完成
    handleSuccess(params) {
      this.$layer.iframe({
        content: {
          content: success, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '完成',
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
        title: '客户详情',
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
