<!-- 方案列表 -->
<template>
  <div class="operate-container">
   <!-- <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
        <el-button type="danger" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()">批量删除</el-button>
      </el-form-item>
    </el-form> -->
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :button="button"
    customHeight="450"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"
    @getCellClick="getCellClick"></tableItem>
  </div>
</template>

<script>
import detail from './plan_detail.vue'
import {getContProgramQueryPageData, getContProgramAddOrModifyProgram} from '../../../api/contract/msg.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '1,2,3,4'
      },
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '方案名称',
        type: 'view'
      }, {
        prop: 'statusName',
        label: '状态'
      }, {
        prop: 'exp',
        label: '备注'
      } ],
      button: {
        width: 120,
        buttonList: [
          {name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: (params) => {
              if (params.status === '1') {
                return true
              }
            }},
          {name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: (params) => {
              if (params.status === '1') {
                return true
              }
            }},
          {name: '放弃',
            type: 'danger',
            click: 'handleGiveUp',
            condition: (params) => {
              if (params.status === '1') {
                return true
              }
            }}
        ]
      },
      multipleSelection: []
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getContProgramQueryPageData(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '待处理'
              break
            case '2':
              xdd.statusName = '完成'
              break
            case '3':
              xdd.statusName = '放弃'
              break
            case '4':
              xdd.statusName = '退回'
              break
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleDetails (params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Min,
        title: '附件',
        maxmin: true,
        shadeClose: false
      })
    },
    handleFinish (params) {
      this.$confirm('此操作将完成方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        params.status = '2'
        getContProgramAddOrModifyProgram(params).then(res => {
          this.$message({
            type: 'success',
            message: '完成成功'
          })
          this.getListData()
          this.$parent.getListData()
        })
      })
    },
    handleReturn (params) {
      let that = this
      this.$prompt('请输入退回原因', '一键退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        params.status = '4'
        params.exp = value
        getContProgramAddOrModifyProgram(params).then(res => {
          that.getListData()
          that.$parent.getListData()
          that.$share.message('退回成功', 'success')
        })
      })
    },
    handleGiveUp (params) {
      this.$confirm('此操作将放弃方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        params.status = '3'
        getContProgramAddOrModifyProgram(params).then(res => {
          this.$message({
            type: 'success',
            message: '放弃成功'
          })
          this.getListData()
          this.$parent.getListData()
        })
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs[formName].resetFields()
      this.getListData()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getCellClick (params) {
      this.$parent.getSellerData(params)
      this.$layer.close(this.layerid)
    }
  },
  mounted () {
    this.fromValiData.contId = this.params.id
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
