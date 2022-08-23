<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="归属">
          <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
        </el-form-item>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange">
    </tableItem>
  </div>
</template>

<script>
import edit from './edit'
import detail from './detail'
import details from './details'
import {
  getCustContactsQueryPageData,
  getCustDelContacts,
  getCrmSysGetUserAll
} from '@/api/client/info.js'
export default {
  data() {
    return {
      loading: true,
      props: {},
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        mobile: null,
        custname: null,
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'name', label: '联系人' },
        { type: 'input', prop: 'operManName', label: '跟进人' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          type: 'view2',
          width: 140
        },
        {
          prop: 'name',
          label: '联系人',
          type: 'view',
          width: 90
        },
        {
          prop: 'mobile',
          label: '联系人电话',
          width: 90
        },
        {
          prop: 'sex',
          label: '性别',
          width: 90
        },
        {
          prop: 'opermanName',
          label: '跟进人',
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                this.$store.getters.userInfo.name === params.opermanName ||
                this.$store.getters.userInfo.lev === '10'
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
      this.loading = false
      getCustContactsQueryPageData(this.fromValiData)
        .then(res => {
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
      if (params[0][0] === '2') {
        this.fromValiData.other = params[0][0]
        this.doSearch()
      }
      let list = []
      params.forEach(item => {
        list.push(item[1])
      })
      this.fromValiData.subordinateIds = list.join(',')
      this.doSearch()
    },

    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.groupIds = []
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
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
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCustDelContacts({ ids: row.id }).then(res => {
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
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '姓名详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
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
    }
  },
  mounted() {
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scopsd>
</style>
