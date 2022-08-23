<!-- 采样设备管理 -->
<template>
  <div class="pc-container">
    <el-row type="flex" class="row-bg" justify="center" :gutter="16">
      <el-col :span="5">
        <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
      </el-col>
      <el-col :span="19">
        <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
          <template v-if="boxshow">
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
            <template slot="other">
              <el-form-item label="仪器类别" prop="name" v-if="level === 0">
                <el-input v-model="fromValiData.name" placeholder="" />
              </el-form-item>
              <el-form-item label="仪器名称" prop="name" v-else-if="level === 1">
                <el-input v-model="fromValiData.name" placeholder="" />
              </el-form-item>
              <el-form-item label="场地" prop="type">
                <el-select v-model="fromValiData.type" placeholder="" @change="changeSelect">
                  <el-option v-for="item in typeData" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
          </template>

          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
          <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-download" @click="handleDownload()">仪器附件下载</el-button>
          <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
          <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
        </fromSearch>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :loading="loading" :dataSum='fromValiData.dataSum' @handleSizeChange="handleSizeChange">
        </tableItem>
        <div style="display: flex;margin-top: -45px;">
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import edit from './edit.vue'
import file from './file.vue'
import detail from './detail.vue'
import download from './download.vue'
import editType from './edit_type.vue'
import {
  getMachineQueryMachinePage,
  getMachineDelMachineData,
  getMachineQueryMachineTree,
  getMachineQueryMachineItemPage
} from '../../../api/storage/equipment.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      presentNode: '',
      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        father: '0',
        type: '2'
      },
      fromData: [],
      paramsData: {
        father: 0
      },
      tableData: [],
      treeData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '仪器类别',
          width: 250
        }
      ],
      button: {
        width: 250,
        buttonList: [
          {
            name: '上传附件',
            type: 'primary',
            click: 'handleFile',
            condition: params => {
              if (this.level === 0 || this.level === 1) {
                return false
              } else {
                return true
              }
            }
          },
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: [],
      typeData: [
        { id: '1', name: '实验室' },
        { id: '2', name: '现场' },
        { id: '3', name: '綦江' },
        { id: '4', name: '辅助' },
        { id: '5', name: '玻璃管' }
      ],
      level: 0
    }
  },
  watch: {
    level(val, oldVal) {
      if (val === 0) {
        this.tableHeader = [
          {
            prop: 'name',
            label: '仪器类别',
            width: 250
          }
        ]
      } else if (val === 1) {
        this.tableHeader = [
          {
            prop: 'name',
            label: '仪器名称',
            width: 250
          }
        ]
      } else {
        this.tableHeader = [
          {
            prop: 'name',
            label: '仪器编号',
            width: 250,
            type: 'view'
          },
          {
            prop: 'yqxh',
            label: '仪器型号',
            width: 250
          },
          {
            prop: 'statusName',
            label: '状态',
            width: 250
          },
          {
            prop: 'yxrq',
            label: '有效日期',
            width: 250
          }
        ]
      }
    }
  },
  methods: {
    getListData(id) {
      this.loading = true
      if (id) this.fromValiData.father = id
      if (this.level === 2) {
        getMachineQueryMachineItemPage(this.fromValiData)
          .then(res => {
            res.result.pageList.forEach(xdd => {
              switch (xdd.status) {
                case '0':
                  xdd.statusName = '闲置'
                  break
                case '1':
                  xdd.statusName = '出借'
                  break
                case '2':
                  xdd.statusName = '预约'
                  break
                case '3':
                  xdd.statusName = '维修'
                  break
                case '4':
                  xdd.statusName = '损坏'
                  break
                case '5':
                  xdd.statusName = '停用'
                  break
                case '6':
                  xdd.statusName = '报废'
                  break
                case '7':
                  xdd.statusName = '送检'
                  break
              }
              xdd.name = xdd.yqbh
            })
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        getMachineQueryMachinePage(this.fromValiData)
          .then(res => {
            this.tableData = res.result.pageList
            this.fromValiData.dataSum = res.result.dataSum
            this.loading = false
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      }
    },
    getTreeData() {
      let ids = {}
      ids.type = this.fromValiData.type
      getMachineQueryMachineTree(ids).then(res => {
        this.treeData = res.result
      })
    },
    getNodeClick(data, node, now) {
      this.paramsData.fatherName = data.name
      this.paramsData.father = data.id
      this.paramsData.type = data.type
      this.presentNode = node
      this.level = node.level
      this.getListData(data.id)
    },
    appendTree(params) {
      if (params.type === this.fromValiData.type) {
        this.$refs.myTree.$refs.elTree.append(params, this.presentNode)
      }
    },
    editTree(params) {
      let xdd = this.$refs.myTree.$refs.elTree.getNode(params.id)
      xdd.data.exp = params.exp
      xdd.data.father = params.father
      xdd.data.id = params.id
      xdd.data.name = params.name
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    doBackToTop() {
      this.fromValiData.father = '0'
      this.paramsData = { father: 0 }
      this.level = 0
      delete this.fromValiData.dataSum
      this.doReset('fromValiData')
      this.getTreeData()
    },
    changeSelect() {
      this.getListData()
      this.getTreeData()
    },
    handleAdd() {
      if (this.level === 2) {
        this.$layer.iframe({
          content: {
            content: edit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.paramsData
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加仪器明细',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: editType, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: this.paramsData,
              type: this.paramsData.type
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '添加仪器类别',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleFile(params) {
      this.$layer.iframe({
        content: {
          content: file, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '上传附件',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      params.fatherName = this.paramsData.fatherName
      if (this.level === 2) {
        this.$layer.iframe({
          content: {
            content: edit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '编辑仪器明细',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: editType, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '编辑仪器类别',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleDownload() {
      this.$layer.iframe({
        content: {
          content: download, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          } // props
        },
        area: this.$layer_Size.Max,
        title: '仪器附件下载',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        message:
          '此操作将永久删除该数据及其' +
          '<span style="color:red;font-weight:700">子数据</span>' +
          ', 是否继续?',
        confirm: function() {
          let ids = {}
          ids.ids = row.id
          ids.type = that.level === 2 ? '2' : '1'
          getMachineDelMachineData(ids).then(res => {
            let ids = row.id.split(',')
            if (ids.length > 0) {
              ids.forEach(xdd => {
                that.$refs.myTree.$refs.elTree.remove(xdd)
              })
            } else {
              that.$refs.myTree.$refs.elTree.remove(row.id)
            }
            that.$message({
              type: 'success',
              message: '删除成功'
            })
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
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '仪器详情',
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
    }
  },
  mounted() {
    this.getListData()
    this.getTreeData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
