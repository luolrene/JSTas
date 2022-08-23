<!-- 客户跟进记录 -->
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
import {
  getCrmTrackQueryPageData,
  getCrmTrackDelLaCrmTrackIds,
  getCrmTrackAddOrModify
} from '@/api/client/followRecords.js'
import { getCrmSysGetUserAll } from '@/api/client/info.js'
import edit from './edit.vue'
import add from './add.vue'
import check from './check.vue'
import next from './next.vue'
import next1 from './next1.vue'
import details from './details'
export default {
  data() {
    return {
      loading: false,
      boxshow: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        startTime: '',
        endTime: '',
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'trackPersonnel', label: '跟进人' },
        {
          type: 'select',
          prop: 'trackMode',
          label: '跟进方式',
          data: [{ name: '当面拜访', id: '1' }, { name: '电话拜访', id: '2' }]
        },
        {
          type: 'select',
          prop: 'track',
          label: '是否下次跟进',
          data: [{ name: '是', id: '1' }, { name: '否', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view',
          width: 130
        },
        {
          prop: 'contactsName',
          label: '联系人',
          width: 90
        },

        {
          prop: 'trackMode',
          label: '跟进方式',
          width: 90
        },
        {
          prop: 'trackResult',
          label: '跟进结果',
          width: 90
        },
        {
          prop: 'trackTime',
          label: '拜访时间',
          width: 90
        },
        {
          prop: 'trackName',
          label: '是否下次跟进',
          type: 'view2',
          condition: params => {
            if (params.track === '1') {
              return '#F56C6C'
            }
          },
          width: 120
        },
        {
          prop: 'trackPersonnelName',
          label: '跟进人',
          width: 90
        }
      ],
      button: {
        width: 270,
        buttonList: [
          {
            name: '复制',
            type: 'success',
            click: 'handleCopy',
            condition: params => {
              if (
                this.$store.getters.userInfo.name === params.trackPersonnelName
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '查看',
            type: 'success',
            click: 'handleCheck',
            condition: params => {
              if (
                this.$store.getters.userInfo.name !==
                  params.trackPersonnelName ||
                Number(this.$store.getters.userInfo.lev) >
                  Number(this.$store.getters.userInfo.lev) + 1
              ) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '下次跟进',
            type: 'primary',
            click: 'handleNext1',
            condition: params => {
              if (
                (params.track === '1' &&
                  this.$store.getters.userInfo.name ===
                    params.trackPersonnelName) ||
                Number(this.$store.getters.userInfo.lev) === 10
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
                this.$store.getters.userInfo.name ===
                  params.trackPersonnelName ||
                Number(this.$store.getters.userInfo.lev) === 10
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
      endTime: '',
      startTime: '',
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
      getCrmTrackQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.trackMode === '1') {
              item.trackMode = '当面拜访'
            } else if (item.trackMode === '2') {
              item.trackMode = '电话拜访'
            }
            if (item.track === '1') {
              item.trackName = '是'
            } else if (item.track === '2') {
              item.trackName = '否'
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
      this.fromValiData.pageNow = 1
      this.getListData()
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
    doReset(formName) {
      this.startTime = ''
      this.endTime = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: add, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {}
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
          }
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleCheck(params) {
      this.$layer.iframe({
        content: {
          content: check, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '查看',
        maxmin: true,
        shadeClose: false
      })
    },
    handleNext1(params) {
      this.$layer.iframe({
        content: {
          content: next1, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '下次跟进',
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
          getCrmTrackDelLaCrmTrackIds({ ids: row.id }).then(res => {
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
    handleCopy(params, title) {
      params.id = null
      let index = '是否复制本条数据?'
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
          getCrmTrackAddOrModify(params).then(res => {
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
      if (params.track === '1') {
        this.$layer.iframe({
          content: {
            content: next, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '下次跟进信息',
          maxmin: true,
          shadeClose: false
        })
      }
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
<style scoped>
</style>
