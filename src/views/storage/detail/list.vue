<template>
  <div class="pc-container nodeDefend">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="即将过期" name="first">
        <el-row :gutter="20">
          <el-col :span="3" style="overflow-y: auto;height: calc(98vh - 200px);">
            <el-steps direction="vertical" :space="60">
              <el-step v-for="(item,index) in dateList" :key="index">
                <span slot="title" style="cursor: pointer;" @click="clickStep(item,index)" :style="{color:index === activeColor ? '#018CCF' :''}">
                  {{item}}
                </span>
              </el-step>
            </el-steps>
          </el-col>
          <el-col :span="21">
            <tableItem :obj="this" :tableData="tableData1" :tableHeader="tableHeader" :dataSum='fromOtherValiData.dataSum1' :button="button" :loading="loading" @handleSizeChange="handleSizeChange1"></tableItem>
          </el-col>

        </el-row>
      </el-tab-pane>
      <el-tab-pane label="送检仪器" name="second">
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" :size="$layer_Size.buttonSize" class="btn" icon="el-icon-s-claim" @click="AllInspect" v-if="activeName==='first'">批量送检</el-button>
    <el-button type="primary" :size="$layer_Size.buttonSize" class="btn" icon="el-icon-check" @click="inspectEnd" v-if="activeName==='second'">完成送检</el-button>
  </div>
</template>

<script>
import edit from '../equipment/edit.vue'
import file from '../equipment/file.vue'
import {
  getMachineQueryMachineItemPage,
  getMachineQueryYxrqList,
  getMachineToCheck
} from '../../../api/storage/equipment.js'
export default {
  data() {
    return {
      activeName: 'first',
      id: '',
      loading: false,
      multipleSelection: [],
      dateList: [],
      activeColor: null,
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '7'
      },
      fromOtherValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '0,1,2,3'
      },
      tableData: [],
      tableData1: [],

      tableHeader: [
        {
          prop: 'fatherName',
          label: '仪器名称',
          width: 80
        },
        {
          prop: 'yqbh',
          label: '仪器编号',
          width: 80
        },
        {
          prop: 'yqxh',
          label: '仪器型号',
          width: 80
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 80
        },
        {
          prop: 'yxrq',
          label: '有效时间',
          width: 80
        }
      ],

      button: {
        buttonList: [
          { name: '编辑', type: 'primary', click: 'handleEdit' },
          { name: '附件上传', type: 'primary', click: 'handleFile' }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getMachineQueryMachineItemPage(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.status === '7') {
              xdd.statusName = '送检'
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
    getOtherListData() {
      this.loading = false
      getMachineQueryMachineItemPage(this.fromOtherValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            if (xdd.status === '0') {
              xdd.statusName = '闲置'
            } else if (xdd.status === '1') {
              xdd.statusName = '出借'
            } else if (xdd.status === '2') {
              xdd.statusName = '预约'
            } else if (xdd.status === '3') {
              xdd.statusName = '维修'
            }
          })
          this.tableData1 = res.result.pageList
          this.fromOtherValiData.dataSum1 = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },

    AllInspect() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要送检的列表数据', 'warning')
        return
      }
      let ids = { id: '', type: '1' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.inspect(ids)
    },
    inspect(params, title) {
      let index = '是否将样品送检？'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          let obj = {}
          obj.ids = params.id
          obj.type = '1'
          params.type = '1'
          getMachineToCheck(obj).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getOtherListData()
            this.getDateList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
          this.getOtherListData()
        })
    },

    inspectEnd() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选完成送检的列表数据', 'warning')
        return
      }
      let ids = { id: '', type: '2' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.endList(ids)
    },

    endList(params, title) {
      let index = '是否完成送检？'
      if (title) {
        index = title
      }
      this.$confirm(index, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          let obj = {}
          obj.ids = params.id
          obj.type = '2'
          getMachineToCheck(obj).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
            this.getDateList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
          this.getListData()
        })
    },

    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFile(params) {
      this.$layer.iframe({
        content: {
          content: file, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '上传附件',
        maxmin: true,
        shadeClose: false
      })
    },
    handleClick(tab, event) {
      this.tableData1 = []
      this.activeColor = ''
      this.fromOtherValiData.dataSum1 = 0
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleSizeChange1(val, pageSize) {
      this.fromOtherValiData.pageNow = val
      if (pageSize) {
        this.fromOtherValiData.pageSize = pageSize
      }
      this.getOtherListData()
    },
    // 获取时间
    getDateList() {
      getMachineQueryYxrqList({}).then(res => {
        this.dateList = res.result
      })
    },
    clickStep(params, index) {
      this.activeColor = index
      this.fromOtherValiData.yxrq = params
      this.getOtherListData(params)
    }
  },
  mounted() {
    this.getListData()
    this.getDateList()
  },
  created() {}
}
</script>

<style scoped lang='scss'>
.nodeDefend .el-steps--simple {
  padding: 15px !important;
}
.nodeDefend /deep/ .el-step__title {
  line-height: 40px !important;
}
.btn {
  position: absolute;
  top: 10px;
  right: 250px;
  z-index: 1;
}
</style>
