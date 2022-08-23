<template>
  <div class="operate-container">
    <div>
      <div style="display: flex;justify-content: center;margin-bottom: 20px;">
        <div class="titleImg">报告任务信息</div>
      </div>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            项目名称
          </template>
          {{fromValiData.proName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            监测计划
          </template>
          <el-input v-model="fromValiData.name" placeholder="" style="width: 90%" :disabled="!isEdit"></el-input>
          <el-tooltip class="item" effect="dark" content="保存" placement="top" v-if="isEdit">
            <span class="icon iconfont inputIconClass" @click="getConserve('检测计划')">&#xec09;</span>
          </el-tooltip>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            报告编号
          </template>
          {{fromValiData.reportNo}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            报告开始日期
          </template>
          {{fromValiData.reportStart}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            报告完成日期
          </template>
          {{fromValiData.complete}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            报告期限
          </template>
          <el-date-picker
            v-model="fromValiData.term"
            :disabled="!isEdit"
            @change="changeTerm"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 90%">
          </el-date-picker>
          <el-tooltip class="item" effect="dark" content="保存" placement="top" v-if="isEdit">
            <span class="icon iconfont inputIconClass" @click="getConserve('报告期限')">&#xec09;</span>
          </el-tooltip>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            客户名称
          </template>
          {{fromValiData.custName}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            是否周期
          </template>
          {{fromValiData.isCycleName}}
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">
            报告任务状态
          </template>
          <span style="margin-right: 15px;">{{fromValiData.statusName}}</span>
          <el-button
            v-show="isEdit"
            :loading="loading_start"
            @click="handleStart"
            type="primary"
            plain
            size="mini"
            >启动</el-button>
          <el-button
            v-show="this.fromValiData.status === '1'"
            @click="handleWithdraw"
            type="primary"
            plain
            size="mini">撤回</el-button>
          <el-button
            v-show="this.fromValiData.status === '0' || this.fromValiData.status === '1' || this.fromValiData.status === '2'"
            @click="handleGiveUp"
            type="primary"
            plain size="mini">放弃</el-button>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">
            方案
          </template>
          <el-button type="primary" plain size="mini" v-if="this.fromValiData.status !== '4'" @click="handlePoint">方案选择</el-button>
          <el-button type="primary" plain size="mini" v-if="isEdit" @click="handlePlan">方案修改</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <div style="display: flex;justify-content: center;margin:30px 0 10px 0">
        <div class="titleImg">合同信息</div>
      </div>
      <contract :params="conTractparams"></contract>
    </div>
    <div>
      <div style="display: flex;justify-content: center;margin:30px 0 10px 0">
        <div class="titleImg">过程备注</div>
      </div>
      <remark :params="conTractparams"></remark>
    </div>
  </div>
</template>

<script>
import pointList from '@/views/sampling/majorTask/point_list.vue'
import reportEdit from '@/views/sampling/majorTask/report_edit.vue'
import planList from '@/views/sampling/sampTask/plan_list.vue'
import sampLing from '@/views/sampling/reportTask/sampling_list.vue'
import contract from '@/views/contract/msg/details/contract.vue'
import remark from '@/views/contract/msg/details/remark.vue'
import { getReportTaskAddOrModifyReport } from '@/api/sampling/majorTask.js'
import {
  getReportTaskToOper,
  getReportTaskStartReportTask,
  getReportTaskQueryTaskByReportNo
} from '@/api/sampling/reportTask.js'
import { getContractQueryContractById } from '@/api/contract/msg.js'
export default {
  props: {
    params: Object
  },
  components: {
    sampLing,
    contract,
    remark
  },
  data() {
    return {
      loading_start: false,
      fromValiData: {},
      conTractparams: {}
    }
  },
  computed: {
    isEdit() {
      return (
        this.fromValiData.status === '0' || this.fromValiData.status === '2'
      )
    }
  },
  methods: {
    getListData() {
      let ids = {}
      ids.reportNo = this.params.reportNo
      getReportTaskQueryTaskByReportNo(ids).then(res => {
        let params = res.result
        switch (params.status) {
          case '0':
            params.statusName = '未启动'
            break
          case '1':
            params.statusName = '启动'
            break
          case '2':
            params.statusName = '撤回'
            break
          case '3':
            params.statusName = '完成'
            break
          case '4':
            params.statusName = '放弃'
            break
        }
        switch (params.isCycle) {
          case '1':
            params.isCycleName = '是'
            break
          case '0':
            params.isCycleName = '否'
            break
        }
        this.fromValiData = params
      })
    },
    getConserve(name) {
      getReportTaskAddOrModifyReport(this.fromValiData).then(res => {
        this.getListData()
        this.$share.message(name + '编辑成功')
      })
    },
    changeTerm(e) {
      if (e === null) {
        this.fromValiData.term = ''
      }
    },
    getPerson(params) {
      return new Promise((resolve, reject) => {
        let ids = {}
        ids.operman = params.mobile
        ids.opermanName = params.name
        ids.reportNo = this.fromValiData.reportNo
        getReportTaskToOper(ids)
          .then(res => {
            this.getListData()
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 方案选择
    handlePoint(params) {
      this.$layer.iframe({
        content: {
          content: pointList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.fromValiData,
            pointType: '2'
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '点位录入列表',
        maxmin: true,
        shadeClose: false
      })
    },
    // 方案修改
    handlePlan(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.fromValiData,
            reportNo: this.fromValiData.reportNo,
            confirmPlan: false
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: reportEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.fromValiData
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleStart() {
      this.$share.confirm({
        message: '此操作将启动报告任务, 是否继续',
        type: 'success',
        confirm: () => {
          let ids = {}
          ids.reportNo = this.fromValiData.reportNo
          this.loading_start = true
          getReportTaskStartReportTask(ids)
            .then(res => {
              if (res.code === 0) {
                this.getListData()
                this.$share.message('启动成功', 'success')
              } else {
                this.$share.message('请先对报告任务指派仪器', 'warning')
              }
              this.loading_start = false
            })
            .catch(err => {
              this.loading_start = false
            })
        }
      })
    },
    handleWithdraw() {
      let that = this
      this.$share.confirm({
        message: '此操作将撤回报告任务, 是否继续',
        type: 'success',
        confirm: function() {
          let ids = JSON.parse(JSON.stringify(that.fromValiData))
          ids.status = '2'
          getReportTaskAddOrModifyReport(ids).then(res => {
            that.getListData()
            that.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp() {
      let that = this
      this.$share.confirm({
        message: '此操作将放弃报告任务, 是否继续',
        type: 'success',
        confirm: function() {
          let ids = JSON.parse(JSON.stringify(that.fromValiData))
          ids.status = '4'
          getReportTaskAddOrModifyReport(ids).then(res => {
            that.getListData()
            that.$share.message('放弃成功', 'success')
          })
        }
      })
    }
  },
  mounted() {
    getContractQueryContractById({ contId: this.params.contId }).then(res => {
      this.conTractparams = res.result
    })
  },
  created() {
    this.getListData()
  },
  destroyed() {
    this.$parent.$parent.getListData()
  }
}
</script>

<style scoped lang="scss">
.titleImg {
  background-image: url('../../../../static/img/menu/majorReportBK.png');
  width: 250px;
  height: 40px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
