<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData">
        <el-button
          @click="handleAdd()"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-plus"
          style="margin-left: 10px;">添加</el-button>
      </fromSearch>
    </el-form>
    <tableRecord
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    :isPage="false"
    @getCellClick="getCellClick"></tableRecord>
  </div>
</template>

<script>
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData} from '@/api/sampling/original.js'
export default {
  inject: [
    'reload'
  ],
  props: {
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      loading: false,
      fromValiData: {
        fileName: ''
        // type:'' 1通用 2列表
      },

      tableData: [],

      tableHeader: [{
        prop: 'zd50',
        label: '样品编号',
        fixed: 'left',
        type: 'input',
        width: 160
      }, {
        label: '测定结果',
        data: [
          {
            prop: 'zd2',
            label: '实测浓度(mg/m³)',
            type: 'input',
            width: 100
          }, {
            prop: 'zd3',
            label: '排放浓度(mg/m³)',
            type: 'input',
            width: 100
          }, {
            prop: 'zd4',
            label: '排放速率(kg/h)',
            type: 'input',
            width: 90
          }, {
            prop: 'zd5',
            label: '氧含量(%)',
            type: 'input',
            width: 90
          }, {
            prop: 'zd6',
            label: '吨产品排放量(kg/t)',
            type: 'input',
            width: 110
          }
        ]
      }],
      button: {
        width: 140,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              return params.edit
            }
          },
          {name: '复制',
            type: 'primary',
            click: 'handleCopy',
            condition: (params) => {
              return params.id !== null
            }
          },
          {name: '删除', type: 'danger', click: 'handleDelete'}
        ]
      }
    }
  },
  methods: {
    getListData() {
      let ids = {}
      ids.type = '2'
      ids.reportNo = this.fromValiData.reportNo
      ids.father = this.fromValiData.id
      getOxcQueryList(ids).then(res => {
        this.tableData = res.result
      })
    },
    getCellClick(params) {
      this.$set(params, 'edit', true)
    },
    handleAdd() {
      this.tableData.push({id: null, zd1: '', edit: true})
    },
    handleEdit(params) {
      let ids = {...params}
      ids.father = this.fromValiData.id
      ids.type = '2'
      ids.reportNo = this.fromValiData.reportNo
      getOxcAddOrModifyData(ids).then(res => {
        this.$set(params, 'edit', false)
        this.$set(params, 'id', res.result)
        this.$share.message()
      })
    },
    handleCopy(params) {
      this.$prompt('请填入要复制的数量', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$|^\d+[.]?\d+$/,
        inputErrorMessage: '请填入数字'
      }).then(({ value }) => {
        let ids = {...params}
        ids.copyNum = value
        ids.father = this.fromValiData.id
        ids.type = '2'
        ids.reportNo = this.fromValiData.reportNo
        getOxcCopyData(ids).then(res => {
          this.$share.message('成功复制' + value + '条')
          this.getListData()
        })
      })
    },
    handleDelete(params, index) {
      let ids = {}
      ids.ids = params.id
      if (ids.ids === null) {
        this.tableData.splice(index, 1)
      } else {
        getOxcDelData({ids: params.id}).then(res => {
          this.$share.message('删除成功')
          this.tableData.splice(index, 1)
          // this.getListData()
        })
      }
    }
  },
  mounted () {
    this.fromValiData = {...this.params}
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
