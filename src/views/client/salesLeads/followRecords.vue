<!--客户跟进记录 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()" >查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="450"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import followRecordsEdit from './followRecords_edit'
import fileList from '../../common/fileList.vue'
import { getCrmTrackQueryPageData } from '@/api/client/followRecords.js'
export default {
  components: {
    fileList
  },
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      fileList: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        custName: null,
        contactsName: null
      },
      fromData: [
        { type: 'input', prop: 'contactsName', label: '联系人' },
        { type: 'input', prop: 'trackPersonnelName', label: '跟进人员' },
        {
          type: 'select',
          prop: 'trackMode',
          label: '跟进方式',
          data: [{ name: '当面拜访', id: '1' }, { name: '电话拜访', id: '2' }]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'contactsName',
          label: '联系人'
        },

        {
          prop: 'trackMode',
          label: '跟进方式'
        },
        {
          prop: 'trackContent',
          label: '跟进内容'
        },
        {
          prop: 'trackResult',
          label: '跟进结果'
        },
        {
          prop: 'trackTime',
          label: '拜访时间'
        },
        {
          prop: 'trackPersonnelName',
          label: '跟进人员'
        }
      ]
    }
  },

  methods: {
    getListData() {
      this.loading = true
      getCrmTrackQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.trackMode === '1') {
              item.trackMode = '当面拜访'
            }
            if (item.trackMode === '2') {
              item.trackMode = '电话拜访'
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
          content: followRecordsEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: this.params
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
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
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset() {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    }
  },
  mounted() {
    this.fromValiData.custName = this.params.custName
    this.fromValiData.sale = this.params.id
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
