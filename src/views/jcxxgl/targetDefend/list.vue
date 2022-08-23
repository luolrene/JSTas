<!-- 行业信息维护 -->
<template>
  <div class="pc-container">
    <el-tabs>
      <el-tab-pane label="指标信息">
        <el-row type="flex" class="row-bg" justify="center" :gutter="16">
          <el-col :span="5">
            <treeItem ref="myTree" :props="props" :treeData="treeData" @getNodeClick="getNodeClick"></treeItem>
          </el-col>
          <el-col :span="19">
            <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
              <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
              <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
            </fromSearch>
            <tableItem
            :obj="this"
            :tableData="tableData"
            :tableHeader="tableHeader"
            :button="button"
            :loading="loading"
            :dataSum='fromValiData.dataSum'
            @handleSizeChange="handleSizeChange"
            :isSelection='false'>
            </tableItem>
            <div style="display: flex;margin-top: -45px;">
              <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="doBackToTop">返回顶级</el-button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="价格维护" lazy>
        <targetPrice></targetPrice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import edit from './edit.vue'
import targetPrice from './target_price.vue'
import {getTargetQueryTarget} from '../../../api/contract/task.js'
import {getTargetQueryAllTarget} from '../../../api/contract/target.js'
// import {getTargetUpdateFun} from '../../../api/jcxxgl/targetDefend.js'
import {getTargetQueryFuns} from '../../../api/jcxxgl/targetDefend.js'
export default {
  components: {
    targetPrice
  },
  data () {
    return {
      loading: false,

      presentNode: '指标',
      activeName: '指标信息',

      props: {
        label: 'name',
        children: 'children'
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        father: '0'
      },
      fromData: [
        { type: 'input', prop: 'name', label: '名称' }
      ],
      fromValiDataB: {
        pageSize: 10,
        pageNow: 1
      },
      paramsData: {
        father: 0
      },
      tableData: [],
      treeData: [],
      tableHeader: [],
      tableHeader_default: [{
        prop: 'name',
        label: '名称',
        width: 250
      }],
      tableHeader_method: [
        {
          prop: 'name',
          label: '名称',
          width: 250
        },
        {
          prop: 'statusName',
          label: '是否默认'
        }
      ],
      button: {},
      button_default: {
        buttonList: []
      },
      button_method: {
        width: 140,
        buttonList: [
          {name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: (params) => {
              if (this.presentNode === '方法') {
                return true
              }
            }}
          // {name: '设为默认',
          //   type: 'primary',
          //   click: 'handleEdit',
          //   condition: (params) => {
          //     if (this.presentNode === '方法' && params.isDefault === '0') {
          //       return true
          //     }
          //   }},
          // {name: '取消默认',
          //   type: 'primary',
          //   click: 'handleEdit',
          //   condition: (params) => {
          //     if (this.presentNode === '方法' && params.isDefault === '1') {
          //       return true
          //     }
          //   }}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData (id) {
      this.loading = true
      if (id) this.fromValiData.father = id
      getTargetQueryTarget(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getMethodData (id) {
      this.fromValiDataB.targetId = id
      getTargetQueryFuns(this.fromValiDataB).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.statusName = xdd.isDefault === '1' ? '是' : '否'
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getTreeData () {
      getTargetQueryAllTarget({}).then(res => {
        this.treeData = res.result
      })
    },
    // handleEdit (params) {
    //   params.isDefault = params.isDefault === '1' ? '0' : '1'
    //   getTargetUpdateFun(params).then(res => {
    //     this.getMethodData(params.targetId)
    //     this.$share.message('操作成功')
    //   })
    // },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    getNodeClick (data, node, now) {
      if (node.level === 1) {
        this.paramsData.fatherName = data.name
        this.paramsData.father = data.id
        this.getListData(data.id)
        this.presentNode = '指标'
        this.button = this.button_default
        this.tableHeader = this.tableHeader_default
      } else if (node.level === 2) {
        this.presentNode = '方法'
        this.button = this.button_method
        this.tableHeader = this.tableHeader_method
        this.getMethodData(data.id)
      }
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
    this.button = this.button_default
    this.tableHeader = this.tableHeader_default
  }
}
</script>

<style scoped lang="scss">

</style>
