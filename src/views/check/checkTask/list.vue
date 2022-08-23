<!-- 实验室-检测任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="完成时间:" prop="endTime" v-show="fromValiData.status === '1'">
            <el-date-picker v-model="endTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
        </template>
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
      </template>

      <!-- <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="" @click="handleTemplate_target">指标数据导入模板下载</el-button> -->
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon=""
        @click="handleTemplate_control">质控数据导入模板下载</el-button>
      <el-button type="primary"
        :size="$layer_Size.buttonSize"
        class="default-btn"
        icon=""
        @click="original_temp">原始记录模板</el-button>
    <!--  <el-upload class="upload-demo" style="display: inline-block;margin-right: 15px;" :action="importTargetAction" :headers="headers" :show-file-list="false" :on-success="onSuccess" :on-error="onError" :limit="30">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn">指标数据导入</el-button>
      </el-upload> -->
      <el-upload
        class="upload-demo"
        :action="importControlAction"
        :headers="headers"
        :show-file-list="false"
        :on-success="onSuccess"
        :on-error="onError"
        :limit="30"
        style="display: inline-block;margin:0 10px">
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn">质控数据导入</el-button>
      </el-upload>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :button="button"
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import controlList from './control_list'
import originalList from './original_list.vue'
import targetList from './target_list.vue'
import { getDetectionQueryPageTask } from '../../../api/check/checkTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        isScene: '0',
        status: '0',
        proName: '',
        custName: '',
        reportNo: '',
        targetStatus: '0,3' // 0初始 1审核中 2审核通过 3退回
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' },
        {
          type: 'select',
          prop: 'status',
          label: '任务状态',
          data: [
            { id: '-1', name: '未启动' },
            { id: '0', name: '进行中' },
            { id: '1', name: '完成' },
            { id: '2', name: '放弃' }
          ],
          click: 'getChangeStatus'
        }
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
        }, {
          prop: 'reportNo',
          label: '报告任务编号',
          width: 120
        }, {
          prop: 'statusName',
          label: '状态',
          width: 110
        }, {
          prop: 'contStatusName',
          label: '合同状态',
          width: 110
        }, {
          prop: 'startTime',
          label: '收样时间',
          width: 110
        }, {
          prop: 'endTime',
          label: '完成时间',
          isShow: true,
          width: 110
        }, {
          prop: 'term',
          label: '报告期限',
          width: 110
        }
      ],
      button: {
        width: 160,
        buttonList: [
          {
            name: '质控',
            type: 'primary',
            click: 'handleControl',
            condition: function(params) {
              if (
                (params.status === '0' || params.status === '1') &&
                params.contStatus !== '07'
              ) {
                return true
              }
            }
          }, {
            name: '样品管理',
            type: 'primary',
            click: 'handleTarget',
            condition: function(params) {
              if (params.status === '0' || params.status === '1') {
                return true
              }
            }
          }
        ]
      },
      endTime: [],

      host: process.env.BASE_API + process.env.JS_Server,
      importTargetAction:
        process.env.BASE_API +
        process.env.JS_Server +
        '/targetResult/loadinTarget',
      importControlAction: process.env.BASE_API + process.env.JS_Server + '/LaboratoryZk/loadinZk',
      headers: { token: this.$store.getters.userInfo.token }
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
    getChangeStatus(params) {
      if (params === '1') {
        this.fromValiData.targetStatus = '2'
        this.tableHeader.forEach(xdd => {
          if (xdd.prop === 'endTime') {
            xdd.isShow = false
          }
        })
        this.doSearch()
      } else {
        this.endTime = []
        delete this.fromValiData.endTime
        this.tableHeader.forEach(xdd => {
          if (xdd.prop === 'endTime') {
            xdd.isShow = true
          }
        })
        this.fromValiData.targetStatus = '0'
        this.doSearch()
      }
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
    handleControl(params) {
      this.$layer.iframe({
        content: {
          content: controlList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '质控列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleTarget(params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: this.fromValiData.isScene // 是否现场1是0否
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
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
    // 原始记录模板
    original_temp() {
      this.$layer.iframe({
        content: {
          content: originalList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '原始记录模板列表',
        maxmin: true,
        shadeClose: false
      })
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
      if (this.endTime.length > 0) {
        this.fromValiData.endTime = this.endTime.join(',')
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.endTime = []
      delete this.fromValiData.endTime

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
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
