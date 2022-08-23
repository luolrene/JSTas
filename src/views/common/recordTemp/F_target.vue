<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData">
        <el-button
          @click="handleAdd()"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-plus">添加</el-button>
        <el-button
          @click="handleBatchEdit(true)"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-edit-outline">批量保存</el-button>
        <el-button
          @click="handleBatchDel()"
          type="danger"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-delete">批量删除</el-button>
      </fromSearch>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="500"
    :isPage="false"
    :isQuantity="true"></tableItem>
  </div>
</template>

<script>
import {getOxcSaveDatas, getOxcQueryList, getOxcDelData} from '@/api/sampling/original.js'
export default {
  props: {
    params: Object, // 主表实体
    targetData: Array, // 默认指标数据
    tableHeader: {
      type: Array,
      default: () => []
    },
    dw: {
      type: String,
      default: undefined
    } // 单位
  },
  data () {
    return {
      loading: false,
      fromValiData: {},
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      let ids = {}
      ids.type = '2'
      ids.reportNo = this.params.reportNo
      ids.father = this.params.id
      getOxcQueryList(ids).then(res => {
        if (res.result.length === 0) {
          this.tableData = []
          this.targetData.forEach((xdd, index) => {
            this.tableData.push({
              zd1: xdd.name,
              zd2: '',
              zd3: '',
              father: this.params.id,
              type: '2',
              reportNo: this.params.reportNo
            })
          })
          this.handleBatchEdit()
        } else {
          this.tableData = res.result
        }
      })
    },
    handleAdd() {
      let ids = []
      ids.push({
        father: this.params.id,
        type: '2',
        reportNo: this.params.reportNo
      })
      getOxcSaveDatas(ids).then(res => {}).then(res => {
        this.getListData()
      })
    },
    handleBatchEdit (judge) {
      if (judge) {
        getOxcSaveDatas(this.tableData).then(res => {
          this.getListData()
          this.$share.message()
        })
      } else {
        getOxcSaveDatas(this.tableData).then(res => {
          this.getListData()
        })
      }
    },
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的指标', 'warning')
        return
      }
      let ids = {ids: ''}
      this.multipleSelection.forEach(xdd => {
        ids.ids += xdd.id + ','
      })
      ids.ids = ids.ids.substring(0, ids.ids.length - 1)
      this.$share.confirm({
        confirm: () => {
          getOxcDelData(ids).then(res => {
            this.$share.message('删除成功')
            this.getListData()
          })
        }
      })
    }
  },
  mounted () {
    if (this.dw !== undefined) {
      let obj = this.tableHeader.find(xdd => xdd.prop === 'zd3')
      obj.label = '污染物浓度' + '(' + this.dw + ')'
    }
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
