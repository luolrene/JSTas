<!-- 客户信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template v-slot:other>
        <el-form-item label="区域选择">
          <el-cascader ref="cascader_city" v-model="areaValue" :options="options" @change="changeCascaderCity($event)" :separator="'/'"></el-cascader>
        </el-form-item>
        <el-form-item label="行业选择">
          <el-cascader ref="cascader_msgDefend" v-model="msgDefendValue" :show-all-levels="false" :props="props_msgDefend" :options="optionsMsgDefend" @change="changeCascaderMsgDefend($event)" :separator="'/'"></el-cascader>
        </el-form-item>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import detail from './detail.vue'
import user from './user.vue'
import followPrs from './followPrs.vue'
import options from '../../../utils/country-data.js'
import {getCustQueryPageData, getCustDelCusts} from '../../../api/contract/customer.js'
import {getIndusQueryIndusTree} from '../../../api/jcxxgl/msgDefend.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        {type: 'input', prop: 'name', label: '客户名称'}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '客户名称',
        type: 'view',
        width: 180
      }, {
        prop: 'industryName',
        label: '行业',
        width: 90
      }, {
        prop: 'cityCode',
        label: '省-市-区',
        width: 160
      }, {
        prop: 'address',
        label: '详细地址',
        width: 130
      }, {
        prop: 'createTime',
        label: '创建时间',
        width: 130
      }],
      button: {
        width: 280,
        buttonList: [
          {name: '联系人', type: 'primary', click: 'handleUser'},
          {name: '跟进人', type: 'primary', click: 'handleFollowPrs'},
          {name: '编辑', type: 'primary', click: 'handleEdit'},
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      },
      multipleSelection: [],
      props_msgDefend: {
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true
      },
      options: options, // 存放城市数据
      optionsMsgDefend: [],
      areaValue: '',
      msgDefendValue: ''
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getCustQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getMsgDefendData () {
      getIndusQueryIndusTree({}).then(res => {
        this.optionsMsgDefend = res.result
      })
    },
    changeCascaderCity (params) {
      this.fromValiData.area = params[2]
      this.doSearch()
    },
    changeCascaderMsgDefend (params) {
      if (params.length > 0) {
        this.fromValiData.industry = params[params.length - 1]
        this.doSearch()
      }
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      delete this.fromValiData.area
      delete this.fromValiData.industry
      this.areaValue = ''
      this.msgDefendValue = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleUser (params) {
      this.$layer.iframe({
        content: {
          content: user, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '联系人列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFollowPrs (params) {
      this.$layer.iframe({
        content: {
          content: followPrs, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '跟进人列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Normal,
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
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails (params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getCustDelCusts({id: row.id}).then(res => {
            if (res.code === '0') {
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
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = {id: ''}
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
    this.getMsgDefendData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
