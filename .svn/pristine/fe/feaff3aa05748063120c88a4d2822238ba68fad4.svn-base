<!-- 报告任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="报告开始日期:" prop="reportTime">
            <el-date-picker v-model="reportTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报告结束日期:" prop="completeTime">
            <el-date-picker v-model="completeTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采样开始日期:" prop="cyStartTime">
            <el-date-picker v-model="cyStartTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="采样完成日期:" prop="cyEndTime">
            <el-date-picker v-model="cyEndTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="记录审核日期:" prop="checkTime">
            <el-date-picker v-model="checkTime" type="daterange" :clearable="false" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 240px;">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" class="default-btn" :size="$layer_Size.buttonSize" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :dataSum='fromValiData.dataSum'
      :fromValiData="fromValiData"
      :button="button"
      :loading="loading"
      :isSelection="false"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import samplingList from './sampling_list.vue'
import cycle from '../majorTask/cycle.vue'
import reportDetails from './reportDetails.vue'
import majorReport from '../majorTask/major_report.vue'
import sampleReportList from './sample_report_list.vue'
import { getReportTaskQueryPageList } from '../../../api/sampling/majorTask.js'
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
        reportNo: null,
        proName: null,
        custName: null,
        taskName: null,
        type: '1' // 1采样 2送样
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'name', label: '监测计划' },
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'isCycle',
          label: '是否周期',
          data: [
            {id: '0', name: '否'},
            {id: '1', name: '是'}
          ]},
        { type: 'input', prop: 'custName', label: '客户名称' },
        {
          type: 'select',
          prop: 'status',
          label: '报告任务状态',
          data: [
            { id: '0', name: '未启动' },
            { id: '1', name: '启动' },
            { id: '2', name: '撤回' },
            { id: '3', name: '完成' },
            { id: '4', name: '放弃' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 260,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'name',
          label: '监测计划',
          width: 90,
          type: 'view3'
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          sort: 'custom',
          width: 140
        },
        {
          prop: 'custName',
          label: '客户名称',
          sort: 'custom',
          width: 260
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          type: 'view2',
          width: 90,
          condition: params => {
            if (params.isCycle === '1') {
              return '#F56C6C'
            }
          }
        },
        {
          prop: 'opermanName',
          label: '现场负责人',
          width: 140
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 120
        },
        {
          prop: 'creatTime',
          label: '创建时间',
          sort: 'custom',
          width: 120
        },
        {
          prop: 'cyStartTime',
          label: '采样开始时间',
          sort: 'custom',
          width: 130
        },
        {
          prop: 'cyEndTime',
          label: '采样完成时间',
          sort: 'custom',
          width: 130
        },
        {
          prop: 'checkTime',
          label: '记录审核时间',
          sort: 'custom',
          width: 130
        }
      ],
      button: {
        width: 320,
        buttonList: [
          { name: '任务单下载',
            type: 'primary',
            click: 'handleTaskFile',
            condition: params => {
              if (params.status !== '4') {
                return true
              }
            }
          },
          // {
          //   name: '采样任务',
          //   type: 'primary',
          //   click: 'handleSampling',
          //   condition: function(params) {
          //     if (params.status === '1') {
          //       return true
          //     }
          //   }
          // },
          {
            name: '样品管理',
            type: 'primary',
            click: 'handleSample',
            condition: params => {
              if (params.status !== '4') {
                return true
              }
            }
          }
        ]
      },
      reportTime: [],
      completeTime: [],
      cyStartTime: [],
      cyEndTime: [],
      checkTime: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.type = '1'
      getReportTaskQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '未启动'
              break
            case '1':
              xdd.statusName = '启动'
              break
            case '2':
              xdd.statusName = '撤回'
              break
            case '3':
              xdd.statusName = '完成'
              break
            case '4':
              xdd.statusName = '放弃'
              break
          }
          switch (xdd.contStatus) {
            case '00':
              xdd.contStatusName = '草稿'
              break
            case '01':
              xdd.contStatusName = '审核中'
              break
            case '02':
              xdd.contStatusName = '审核通过'
              break
            case '03':
              xdd.contStatusName = '审核退回'
              break
            case '04':
              xdd.contStatusName = '放弃'
              break
            case '05':
              xdd.contStatusName = '已完成'
              break
            case '06':
              xdd.contStatusName = '进行中'
              break
            case '07':
              xdd.contStatusName = '变更审核'
              break
          }
          switch (xdd.isCycle) {
            case '1':
              xdd.isCycleName =
                '是' +
                (xdd.checkDetail === null ? '' : '(' + xdd.checkDetail + ')')
              break
            case '0':
              xdd.isCycleName = '否'
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
    handleSampling(params) {
      this.$layer.iframe({
        content: {
          content: samplingList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '采样任务列表',
        maxmin: true,
        shadeClose: false
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
    handleDetails2(params) {
      if (params.isCycle === '1') {
        this.$layer.iframe({
          content: {
            content: cycle, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '周期检测内容',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleDetails3(params) {
      if (this.$store.getters.userInfo.lev > 2) {
        this.$layer.iframe({
          content: {
            content: majorReport, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '报告任务',
          maxmin: true,
          shadeClose: false
        })
      } else {
        getContractQueryContractById({ contId: params.contId }).then(res => {
          this.$layer.iframe({
            content: {
              content: reportDetails, // 传递的组件对象
              parent: this, // 当前的vue对象
              data: {
                params: res.result,
                reportParams: params
              } // props
            },
            area: this.$layer_Size.Max,
            title: '报告任务详情',
            maxmin: true,
            shadeClose: false
          })
        })
      }
    },
    handleTaskFile(params) {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/samplingTask/downTaskPaper?reportNo=' +
          params.reportNo +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    handleSample(params) {
      this.$layer.iframe({
        content: {
          content: sampleReportList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '报告任务样品',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      if (this.reportTime.length > 0) {
        this.fromValiData.reportStart = this.reportTime.join(',')
      }
      if (this.completeTime.length > 0) {
        this.fromValiData.reportEnd = this.completeTime.join(',')
      }
      if (this.cyStartTime.length > 0) {
        this.fromValiData.cyStartTime = this.cyStartTime.join(',')
      }
      if (this.cyEndTime.length > 0) {
        this.fromValiData.cyEndTime = this.cyEndTime.join(',')
      }
      if (this.checkTime.length > 0) {
        this.fromValiData.checkTime = this.checkTime.join(',')
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.reportTime = []
      this.completeTime = []
      this.cyStartTime = []
      this.cyEndTime = []
      this.checkTime = []
      delete this.fromValiData.reportStart
      delete this.fromValiData.reportEnd
      delete this.fromValiData.cyStartTime
      delete this.fromValiData.cyEndTime
      delete this.fromValiData.checkTime

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
