<!-- 质控列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()" :disabled="params.status === '1'">添加</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="params.status === '1'">批量保存</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="params.status === '1'">批量删除</el-button>
      </fromSearch>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import controlEdit from './control_edit.vue'
import {
  getLaboratoryZkQueryPageData,
  getLaboratoryZkDelLaboratoryZkByIds,
  getLaboratoryZkAddOrModify
} from '../../../api/check/checkTask.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        type: '1'
      },
      fromData: [
        {
          type: 'select',
          prop: 'type',
          label: '质控类别',
          data: [
            { id: '1', name: '质控' },
            { id: '2', name: '平行' },
            { id: '3', name: '加标回收' }
          ],
          isNoClear: true,
          click: 'getChangeType'
        }
      ],
      tableData: [],
      tableHeader: [],
      tableHeader_1: [
        {
          prop: 'checkPro',
          label: '检测项目',
          width: 130
        },
        {
          prop: 'sampNoZk',
          label: '质控样品',
          width: 130
        },
        {
          prop: 'danwei',
          label: '单位',
          type: 'input',
          placeholder: '单位',
          width: 90
        },
        {
          prop: 'checkValue',
          label: '测定值',
          type: 'input',
          placeholder: '测定值',
          width: 90
        },
        {
          prop: 'realValue',
          label: '真值',
          type: 'input',
          placeholder: '真值',
          width: 90
        },
        {
          prop: 'xdwc',
          label: '相对误差(%)',
          type: 'input',
          placeholder: '相对误差(%)',
          width: 120
        },
        {
          prop: 'yxXdwc',
          label: '允许相对误差(%)',
          type: 'input',
          placeholder: '允许相对误差(%)',
          width: 140
        },
        {
          prop: 'bzfw',
          label: '标准值范围',
          type: 'input',
          placeholder: '例:1.0-3.8',
          width: 140
        }
      ],
      tableHeader_2: [
        {
          prop: 'checkPro',
          label: '检测项目',
          width: 130
        },
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 130
        },
        {
          prop: 'danwei',
          label: '单位',
          type: 'input',
          placeholder: '单位',
          width: 90
        },
        {
          prop: 'sampResult',
          label: '样品结果',
          type: 'input',
          placeholder: '样品结果',
          width: 90
        },
        {
          prop: 'sampPxResult',
          label: '样品平行结果',
          type: 'input',
          placeholder: '样品平行结果',
          width: 120
        },
        {
          prop: 'jdxc',
          label: '绝对相差(%)',
          type: 'input',
          placeholder: '绝对相差(%)',
          width: 140
        },
        {
          prop: 'yxjdxc',
          label: '允许绝对相差(%)',
          type: 'input',
          placeholder: '允许绝对相差(%)',
          width: 140
        },
        {
          prop: 'xdpc',
          label: '相对偏差(%)',
          type: 'input',
          placeholder: '相对偏差(%)',
          width: 140
        },
        {
          prop: 'xdbzPc',
          label: '相对标准偏差(%)',
          type: 'input',
          placeholder: '相对标准偏差(%)',
          width: 160
        },
        {
          prop: 'xdbzPcKzfw',
          label: '相对标准偏差控制范围(%)',
          type: 'input',
          placeholder: '相对标准偏差控制范围(%)',
          width: 220
        }
      ],
      tableHeader_3: [
        {
          prop: 'checkPro',
          label: '检测项目',
          width: 130
        },
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 130
        },
        {
          prop: 'danwei',
          label: '单位',
          type: 'input',
          placeholder: '单位',
          width: 90
        },
        {
          prop: 'sampNd',
          label: '样品浓度',
          type: 'input',
          placeholder: '样品结果',
          width: 90
        },
        {
          prop: 'jb',
          label: '加标量(μg)',
          type: 'input',
          placeholder: '加标量(μg)',
          width: 120
        },
        {
          prop: 'hsl',
          label: '回收率(%)',
          type: 'input',
          placeholder: '回收率(%)',
          width: 140
        },
        {
          prop: 'hslFw',
          label: '回收率范围(%)',
          type: 'input',
          placeholder: '回收率范围(%)',
          width: 140
        }
      ],
      button: {
        width: 120,
        buttonList: [{ name: '删除', type: 'danger', click: 'handleDelete' }]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.reportNo = this.params.reportNo
      getLaboratoryZkQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.statusName = xdd.status === '1' ? '已完成' : '进行中'
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
    getChangeType(params) {
      switch (params) {
        case '1':
          this.tableHeader = this.tableHeader_1
          break
        case '2':
          this.tableHeader = this.tableHeader_2
          break
        case '3':
          this.tableHeader = this.tableHeader_3
          break
      }
      this.getListData()
    },
    handleAdd() {
      // 根据报告编号获取报告任务中的点位列表
      this.$layer.iframe({
        content: {
          content: controlEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            addParams: this.params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchEdit() {
      getLaboratoryZkAddOrModify(this.tableData).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: controlEdit, // 传递的组件对象
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getLaboratoryZkDelLaboratoryZkByIds({ ids: row.id }).then(res => {
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
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    }
  },
  mounted() {
    this.getListData()
  },
  created() {
    this.tableHeader = this.tableHeader_1
  }
}
</script>

<style scoped lang="scss">
</style>
