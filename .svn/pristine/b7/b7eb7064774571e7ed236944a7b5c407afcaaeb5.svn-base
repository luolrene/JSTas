<template>
  <div class="" style="margin-top: 15px;">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData" style="padding-left: 15px;">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData">
        <el-button
          @click="handleAdd()"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-plus">添加</el-button>
        <el-button
          v-if="params.id !==null"
          @click="handleBatchSave()"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn">批量保存</el-button>
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
    :isOrder="true"
    @getCellClick="getCellClick"></tableRecord>
  </div>
</template>

<script>
import {getOxcQueryList, getOxcAddOrModifyData, getOxcCopyData, getOxcDelData, getOxcSaveDatas} from '@/api/sampling/original.js'
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
        prop: 'zd1',
        label: '检测井编号',
        fixed: 'left',
        type: 'input',
        width: 200
      }, {
        prop: 'zd8',
        label: '井管深度(m)',
        type: 'input',
        width: 120
      }, {
        prop: 'zd2',
        label: '水位(m)',
        type: 'input',
        width: 100
      }, {
        prop: 'zd3',
        label: '井水深度(m)',
        type: 'input',
        width: 120
      }, {
        prop: 'zd4',
        label: '高程(m)',
        type: 'input',
        width: 100
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
      ids.type = '3'
      ids.reportNo = this.fromValiData.reportNo
      ids.father = this.fromValiData.id
      getOxcQueryList(ids).then(res => {
        this.tableData = res.result
      })
    },
    handleBatchSave() {
      this.tableData.forEach(xdd => {
        if (xdd.id === null) {
          xdd.father = this.fromValiData.id
          xdd.type = '3'
          xdd.reportNo = this.fromValiData.reportNo
        }
      })
      getOxcSaveDatas(this.tableData).then(res => {
        this.getListData()
        this.$share.message('批量保存成功')
      })
    },
    getCellClick(params) {
      this.$set(params, 'edit', true)
    },
    handleAdd() {
      this.tableData.push(
        {id: null, zd1: '', edit: true}
      )
    },
    handleEdit(params) {
      let ids = {...params}
      ids.father = this.fromValiData.id
      ids.type = '3'
      ids.reportNo = this.fromValiData.reportNo
      getOxcAddOrModifyData(ids).then(res => {
        this.getListData()
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
        ids.type = '3'
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
  watch: {
    'params.id': {
      handler (newName, oldName) {
        if (newName !== undefined && newName !== '' && newName !== null) {
          this.fromValiData = {...this.params}
          this.getListData()
        } else {
          this.tableData = []
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted () {

  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
