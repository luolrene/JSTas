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
            采样开始日期
          </template>
          <el-date-picker
            v-model="fromValiData.cyStartTime"
            :disabled="!isEdit"
            @change="changeCyStartTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 90%">
          </el-date-picker>
          <el-tooltip class="item" effect="dark" content="保存" placement="top" v-if="isEdit">
            <span class="icon iconfont inputIconClass" @click="getConserve('采样开始日期')">&#xec09;</span>
          </el-tooltip>
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
            采样完成日期
          </template>
          {{fromValiData.cyEndTime}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            记录审核时间
          </template>
          {{fromValiData.checkTime}}
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
            当前处理人
          </template>
          <span style="margin-right: 15px;" v-if="this.fromValiData.opermanName !== null">{{fromValiData.opermanName}}</span>
          <el-button type="primary" plain size="mini" @click="doInputPerson">人员分配</el-button>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">
            仪器
          </template>
          <span style="margin-right: 15px;" v-if="this.fromValiData.leaseTask !== null">{{fromValiData.leaseTask}}</span>
          <el-button type="primary" plain size="mini" @click="handleLeaseTask" v-if="this.fromValiData.leaseTask === null">仪器指派任务</el-button>
          <el-button type="primary" plain size="mini" @click="handleLeaseTask_add" v-if="this.fromValiData.leaseTask === null">添加租赁任务</el-button>
          <el-button type="primary" plain size="mini" @click="handleLeaseTask_edit" v-if="this.fromValiData.leaseTask !== null">修改租赁任务</el-button>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">
            方案
          </template>
          <el-button type="primary" plain size="mini" v-if="this.fromValiData.status !== '4'" @click="handlePoint">方案选择</el-button>
          <el-button type="primary" plain size="mini" v-if="isEdit" @click="handlePlan">方案修改</el-button>
        </el-descriptions-item>
        <el-descriptions-item :span="3">
          <template slot="label">
            操作
          </template>
          <el-button type="primary" plain size="mini" @click="handleTaskFile()">任务单下载</el-button>
          <el-button type="primary" plain size="mini" @click="handleTaskList">仪器明细下载</el-button>
          <!-- <el-button type="primary" plain size="mini" @click="handleEdit" v-if="isEdit">编辑</el-button> -->
        </el-descriptions-item>
      </el-descriptions>
    </div>
 <!--   <div>
      <div style="display: flex;justify-content: center;margin:30px 0 10px 0">
        <div class="titleImg">采样任务信息</div>
      </div>
      <sampLing :params="params" :isPage="false" customHeight="1000" style="padding: 0;"></sampLing>
    </div> -->
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
      <remark :params="{id:params.contId}"></remark>
    </div>
  </div>
</template>

<script>
import pointList from './point_list.vue'
import reportEdit from './report_edit.vue'
import planList from '../sampTask/plan_list.vue'
import inputPerson from '../reportTask/input_person.vue'
import sampLing from '../reportTask/sampling_list.vue'
import leaseTaskAdd from './leaseTask_edit.vue'
import leaseTaskEdit from '../leaseTask/edit.vue'
import leaseTask from '../leaseTask/list.vue'
import contract from '@/views/contract/msg/details/contract.vue'
import remark from '@/views/contract/msg/details/remark.vue'
import {
  getReportTaskAddOrModifyReport,
  getLeaseTaskQueryTaskById
} from '../../../api/sampling/majorTask.js'
import {
  getReportTaskToOper,
  getReportTaskStartReportTask,
  getReportTaskQueryTaskByReportNo
} from '../../../api/sampling/reportTask.js'
import { getContractQueryContractById } from '../../../api/contract/msg.js'
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
      conTractparams: {},
      remarkParams: {}
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
    changeCyStartTime(e) {
      if (e === null) {
        this.fromValiData.cyStartTime = ''
      }
    },
    changeTerm(e) {
      if (e === null) {
        this.fromValiData.term = ''
      }
    },
    // 人员分配
    doInputPerson() {
      let data = []
      data.push(this.fromValiData)
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1', // 只能看到自己组及以下的人
            data: data
          } // props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
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
    // 仪器指派
    handleLeaseTask() {
      let data = []
      data.push(this.fromValiData)
      this.$layer.iframe({
        content: {
          content: leaseTask, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportData: data
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '仪器指派列表',
        maxmin: true,
        shadeClose: false
      })
    },
    // 添加租赁任务
    handleLeaseTask_add() {
      this.$layer.iframe({
        content: {
          content: leaseTaskAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNos: this.fromValiData.reportNo
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '添加租赁任务',
        maxmin: true,
        shadeClose: false
      })
    },
    handleLeaseTask_edit() {
      let ids = {}
      ids.taskId = this.params.leaseTaskId
      getLeaseTaskQueryTaskById(ids).then(res => {
        this.$layer.iframe({
          content: {
            content: leaseTaskEdit, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '修改租赁任务',
          maxmin: true,
          shadeClose: false
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
            pointType: '1'
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
    // 任务单
    handleTaskFile() {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/samplingTask/downTaskPaper?reportNo=' +
          this.fromValiData.reportNo +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    // 仪器明细
    handleTaskList() {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/samplingTask/downTaskPaper?reportNo=' +
          this.fromValiData.reportNo +
          '&token=' +
          this.$store.getters.userInfo.token +
          '&type=0'
      )
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
      // if (this.fromValiData.cyStartTime === null || this.fromValiData.cyStartTime === '') {
      //   this.$share.message('请编辑采样开始日期', 'warning')
      //   return
      // }
      // if (this.fromValiData.opermanName === null || this.fromValiData.opermanName === '') {
      //   this.$share.message('人员未分配', 'warning')
      //   return
      // }
      // if (this.fromValiData.leaseTask === null || this.fromValiData.leaseTask === '') {
      //   this.$share.message('仪器未指派', 'warning')
      //   return
      // }
      this.$share.confirm({
        message: '此操作将启动报告任务, 是否继续?',
        type: 'success',
        confirm: () => {
          let ids = {}
          ids.reportNo = this.fromValiData.reportNo
          this.loading_start = true
          getReportTaskStartReportTask(ids).then(res => {
            if (res.code === 0) {
              this.getListData()
              this.$share.message('启动成功', 'success')
            } else {
              this.$share.message('请先对报告任务指派仪器', 'warning')
            }
            this.loading_start = false
          }).catch(err => {
            this.loading_start = false
          })
        }
      })
    },
    handleWithdraw() {
      this.$share.confirm({
        message: '此操作将撤回报告任务, 是否继续?',
        type: 'success',
        confirm: () => {
          let ids = {...this.fromValiData}
          ids.status = '2'
          getReportTaskAddOrModifyReport(ids).then(res => {
            this.getListData()
            this.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleGiveUp() {
      this.$share.confirm({
        message: '此操作将放弃报告任务, 是否继续?',
        type: 'success',
        confirm: function() {
          let ids = {...this.fromValiData}
          ids.status = '4'
          getReportTaskAddOrModifyReport(ids).then(res => {
            this.getListData()
            this.$share.message('放弃成功', 'success')
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
>>> .el-input__icon{
  line-height: 34px;
}
</style>
