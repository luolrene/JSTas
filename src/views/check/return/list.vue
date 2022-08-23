<!-- 检测任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" style="margin-right: 10px;" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
<!--      <el-upload class="upload-demo" style="display: inline-block;margin-right: 10px;" :action="importTargetAction" :headers="headers" :show-file-list="false" :on-success="onSuccess" :on-error="onError" :limit="30">
        <el-button type="primary" :size="$layer_Size.buttonSize">指标数据导入</el-button>
      </el-upload> -->
      <el-upload class="upload-demo" style="display: inline-block;" :action="importControlAction" :headers="headers" :show-file-list="false" :on-success="onSuccess" :on-error="onError" :limit="30">
        <el-button type="primary" :size="$layer_Size.buttonSize">质控数据导入</el-button>
      </el-upload>

    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import targetList from '../checkTask/target_list.vue'
import { getDetectionQueryPageTask } from '../../../api/check/checkTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        status: '0,3',
        targetStatus: '3' // 0初始 1审核中 2审核通过 3退回
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 180,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 120
        },
        {
          prop: 'reportNo',
          label: '报告任务编号',
          width: 120
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 110
        },
        {
          prop: 'contStatusName',
          label: '合同状态',
          width: 110
        }
      ],
      button: {
        width: 120,
        buttonList: [
          { name: '样品管理', type: 'primary', click: 'handleVerity' }
        ]
      },
      host: process.env.BASE_API + process.env.JS_Server,
      importTargetAction:
        process.env.BASE_API +
        process.env.JS_Server +
        '/targetResult/loadinTarget',
      importControlAction:
        process.env.BASE_API + process.env.JS_Server + '/LaboratoryZk/loadinZk',
      headers: { token: this.$store.getters.userInfo.token }
    }
  },
  watch: {
    $route: {
      deep: true,
      handler: function(newV, oldV) {
        if (newV.params.type === '1') {
          this.fromValiData.isScene = '1'
          this.fromValiData.returnType = '2'
        } else if (newV.params.type === '2') {
          this.fromValiData.isScene = '0'
          this.fromValiData.returnType = '1'
        }
        this.getListData()
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getDetectionQueryPageTask(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '-1':
                xdd.statusName = '未启动'
                break
              case '0':
                xdd.statusName = '进行中'
                break
              case '1':
                xdd.statusName = '完成'
                break
              case '2':
                xdd.statusName = '放弃'
                break
              case '3':
                xdd.statusName = '退回'
                break
            }
            switch (xdd.contStatus) {
              case '02':
                xdd.contStatusName = '审核通过'
                break
              case '06':
                xdd.contStatusName = '进行中'
                break
              case '05':
                xdd.contStatusName = '已完成'
                break
              case '07':
                xdd.contStatusName = '变更审核'
                break
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
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleVerity(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            targetStatus: '3' // 0初始 1审核中 2审核通过 3退回
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '样品列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleTemplate_target() {
      window.open(
        this.host +
          '/file/downloadModel?' +
          'type=1' +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    handleTemplate_control() {
      window.open(
        this.host +
          '/file/downloadModel?' +
          'type=2' +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    onSuccess(response, file, fileList) {
      this.$message({
        message: response.result,
        type: 'success',
        duration: 0,
        showClose: true
      })
      this.getListData()
    },
    onError() {
      this.$share.message('导入失败', '请联系管理员')
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {
    if (this.$route.params.type === '1') {
      this.fromValiData.isScene = '1'
      this.fromValiData.returnType = '2'
    } else if (this.$route.params.type === '2') {
      this.fromValiData.isScene = '0'
      this.fromValiData.returnType = '1'
    }
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
