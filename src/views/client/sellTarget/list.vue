<!-- 销售目标设定 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="目标月份:" prop="targetTime">
            <el-date-picker
              v-model="targetTimeValue"
              type="monthrange"
              value-format="yyyy-MM"
              @change="changeMonth"
              placeholder="选择目标月份">
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
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    @handleSizeChange="handleSizeChange"
    ></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import {
  getCrmTargetQueryPageData,
  getCrmTargetDelCrmTargetIds
} from '../../../api/client/sellTarget.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        targetTime: '',
        targetTimeEnd: ''
      },
      fromData: [
        { type: 'input', prop: 'userName', label: '执行人名称' },
        { type: 'input', prop: 'createUserName', label: '创建人名称' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'userName',
          label: '执行人名称',
          width: 140
        },
        {
          prop: 'targetQuota',
          label: '销售目标金额',
          width: 90
        },
        {
          prop: 'targetTime',
          label: '目标开始时间',
          width: 90
        },
        {
          prop: 'targetTimeEnd',
          label: '目标结束时间',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '创建人名称',
          width: 90
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
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                this.$store.getters.userInfo.name === params.createUserName ||
                Number(this.$store.getters.userInfo.lev) > 3
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
              if (Number(this.$store.getters.userInfo.lev) > 3) {
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
      getCrmTargetQueryPageData(this.fromValiData)
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
    doSearch() {
      this.getListData()
    },
    doReset(formName) {
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
          getCrmTargetDelCrmTargetIds({ ids: row.id }).then(res => {
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
