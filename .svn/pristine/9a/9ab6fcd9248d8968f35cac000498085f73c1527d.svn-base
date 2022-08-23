<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="4">
      <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
    </el-col>
    <el-col :span="20">
     <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-search"
          @click="doSearch()">查询</el-button>
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-refresh"
          @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary"
          v-if="presentLevel === '顶级' || presentLevel === '点位'"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-plus"
          @click="handleAdd()">添加</el-button>
        <el-button type="danger"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-delete"
          @click="handleBatchDel()">批量删除</el-button>
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          @click="handleTrial()">试算</el-button>
      </fromSearch>
      <tableItem
        :obj="this"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :button="button"
        :loading="loading"
        :dataSum='fromValiData.dataSum'
        @handleSizeChange="handleSizeChange"/>
      <div style="display: flex;margin-top: -45px;">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import pointEdit from './point_edit.vue'
import targetAdd from './target_add.vue'
import targetEdit from './target_edit.vue'
import trial from './trial.vue'
import {getCrmOfferPointQueryPointTree, getCrmOfferPointQueryPointPage, getCrmOfferPointDelPoints,
  getCrmOfferPointQueryTargetPage, getCrmOfferPointDelTargets, getCrmOfferPointCopyPoint} from '@/api/client/quotationRecord.js'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: '',
        father: '0'
      },
      fromValiData_T: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'name', label: '名称' }
      ],
      props: {
        label: 'name',
        children: 'children'
      },
      treeData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'pointName',
          label: '点位名称',
          width: 140
        }, {
          prop: 'pointNum',
          label: '点位数量',
          width: 90
        }, {
          prop: 'proTypeName',
          label: '类型名称',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {name: '复制',
            type: 'primary',
            click: 'handleCopy',
            condition: (params) => {
              if (this.presentLevel === '顶级') {
                return true
              }
            }
          },
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          },
          {name: '删除',
            type: 'danger',
            click: 'handleDelete'
          }
        ]
      },
      presentLevel: '顶级',
      presentNode: ''
    }
  },
  watch: {
    presentLevel(newVal, oldval) {
      if (newVal === '顶级') {
        this.tableHeader = [
          {
            prop: 'pointName',
            label: '点位名称',
            width: 140
          }, {
            prop: 'pointNum',
            label: '点位数量',
            width: 90
          }, {
            prop: 'proTypeName',
            label: '类型名称',
            width: 90
          }
        ]
      } else if (newVal === '点位') {
        this.tableHeader = [
          {
            prop: 'targetName',
            label: '指标名称',
            width: 140
          },
          {
            prop: 'targetSysPrice',
            label: '指标系统单价',
            width: 110
          },
          {
            prop: 'checkDays',
            label: '检测天数',
            width: 110
          },
          {
            prop: 'pc',
            label: '频次(次/天)',
            width: 110
          }
        ]
      }
    }
  },
  methods: {
    getListData () {
      if (this.presentLevel === '顶级') {
        this.loading = true
        this.fromValiData.offerId = this.params.id
        getCrmOfferPointQueryPointPage(this.fromValiData).then(res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      } else if (this.presentLevel === '点位') {
        this.loading = true
        this.fromValiData_T.name = this.fromValiData.name
        getCrmOfferPointQueryTargetPage(this.fromValiData_T).then(res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        }).catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
      }
    },
    getTreeData () {
      let ids = {}
      ids.offerId = this.params.id
      getCrmOfferPointQueryPointTree(ids).then(res => {
        res.result.forEach(xdd => {
          xdd.name = xdd.pointName
          xdd.children.forEach(arc => {
            arc.name = arc.targetName
          })
        })
        this.treeData = res.result
      })
    },
    handleAdd () {
      if (this.presentLevel === '顶级') {
        this.$layer.iframe({
          content: {
            content: pointEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.fromValiData
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      } else if (this.presentLevel === '点位') {
        this.$layer.iframe({
          content: {
            content: targetAdd, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              pointId: this.fromValiData_T.pointId,
              offerId: this.params.id
            } // props
          },
          area: this.$layer_Size.Max,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleCopy(params) {
      this.$prompt('请填入要复制的数量', '提示', {
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$|^\d+[.]?\d+$/,
        inputErrorMessage: '请填入数字'
      }).then(({ value }) => {
        let num = Number(value)
        if (num < 1) {
          this.$share.message('数量必须大于0', 'warning')
          return
        }
        let ids = {}
        ids.pointId = params.id
        ids.copyNum = Number(value)
        getCrmOfferPointCopyPoint(ids).then(res => {
          this.$share.message('成功复制' + value + '条')
          this.getListData()
        })
      })
    },
    handleEdit (params) {
      if (this.presentLevel === '顶级') {
        params.fatherName = this.fromValiData.fatherName
        this.$layer.iframe({
          content: {
            content: pointEdit, // 传递的组件对象
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
      } else if (this.presentLevel === '点位') {
        this.$layer.iframe({
          content: {
            content: targetEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              pointId: this.fromValiData_T.pointId,
              offerId: this.params.id
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleTrial() {
      this.$layer.iframe({
        content: {
          content: trial, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            offerId: this.params.id
          } // props
        },
        area: this.$layer_Size.Min,
        title: '试算',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete (row) {
      if (this.presentLevel === '顶级') {
        this.$share.confirm({
          message: '此操作将永久删除该数据, 是否继续?',
          confirm: () => {
            getCrmOfferPointDelPoints({ids: row.id}).then(res => {
              let ids = row.id.split(',')
              if (ids.length > 0) {
                ids.forEach(xdd => {
                  this.$refs.myTree.$refs.elTree.remove(xdd)
                })
              } else {
                this.$refs.myTree.$refs.elTree.remove(row.id)
              }
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getListData()
            })
          }
        })
      } else if (this.presentLevel === '点位') {
        this.$share.confirm({
          message: '此操作将永久删除该数据, 是否继续?',
          confirm: () => {
            getCrmOfferPointDelTargets({ids: row.id}).then(res => {
              let ids = row.id.split(',')
              if (ids.length > 0) {
                ids.forEach(xdd => {
                  this.$refs.myTree.$refs.elTree.remove(xdd)
                })
              } else {
                this.$refs.myTree.$refs.elTree.remove(row.id)
              }
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getListData()
            })
          }
        })
      }
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
    getNodeClick (data, node, now) {
      this.fromValiData.name = ''
      if (node.level === 1) {
        this.presentLevel = '点位'
        this.fromValiData.father = data.id
        this.fromValiData.fatherName = data.name
        this.fromValiData_T.pointId = data.id
        this.presentNode = node
        this.getListData()
      } else if (node.level === 2) {
        this.presentLevel = '指标'
      }
    },
    appendTree (params) {
      this.$refs.myTree.$refs.elTree.append(params, this.presentNode)
    },
    editTree (params) {
      let xdd = this.$refs.myTree.$refs.elTree.getNode(params.id)
      xdd.data.father = params.father
      xdd.data.id = params.id
      xdd.data.name = params.name
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    doBackToTop () {
      this.fromValiData.father = '0'
      this.presentLevel = '顶级'
      this.getTreeData()
      this.doReset('fromValiData')
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
    this.getTreeData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
