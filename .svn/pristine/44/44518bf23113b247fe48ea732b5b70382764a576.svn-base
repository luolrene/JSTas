<!-- 分包合同管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import spcList from './spc_list.vue'
import details from '../../contract/msg/details.vue'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
import {getSubContQuerySubCont, getSubContAddOrModifySubCont} from '../../../api/verity/contractVerity.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '2'
      },
      fromData: [
        {type: 'input', prop: 'proName', label: '项目名称'},
        {type: 'input', prop: 'custName', label: '客户名称'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '初始'},
            {id: '1', name: '进行中'},
            {id: '2', name: '交付'},
            {id: '3', name: '完成'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        type: 'view',
        width: 180,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'custName',
        label: '客户',
        width: 90
      }, {
        prop: 'detail',
        label: '分包明细',
        width: 90
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }],
      button: {
        width: 180,
        buttonList: [
          {name: '完成',
            type: 'primary',
            click: 'handleFinish',
            condition: (params) => {
              if (params.status === '2') {
                return true
              }
            }
          },
          {name: '分包明细',
            type: 'primary',
            click: 'handleSpc',
            condition: (params) => {
              if (params.status === '2') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getSubContQuerySubCont(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '初始'
              break
            case '1':
              xdd.statusName = '进行中'
              break
            case '2':
              xdd.statusName = '交付'
              break
            case '3':
              xdd.statusName = '完成'
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
    handleFinish (params) {
      let that = this
      this.$share.confirm({
        message: '此操作将完成分包任务, 是否继续?',
        type: 'success',
        confirm: function () {
          params.status = '3'
          getSubContAddOrModifySubCont(params).then(res => {
            that.getListData()
            that.$share.message('完成成功', 'success')
          })
        }
      })
    },
    handleSpc (params) {
      this.$layer.iframe({
        content: {
          content: spcList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Max,
        title: '任务明细',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails (params) {
      getContractQueryContractById({contId: params.contId}).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            }// props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
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
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
