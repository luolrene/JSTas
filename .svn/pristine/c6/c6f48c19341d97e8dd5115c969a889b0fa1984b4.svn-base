<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">

        <el-form-item label="统计时间">
          <el-date-picker v-model="fromValiData.totalTime" type="month" value-format='yyyy-MM' placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="部门名称:" v-if="Number(this.$store.getters.userInfo.lev)===10">
          <el-cascader v-model="groupIds" :options="groupOption" :show-all-levels="false" @change="getGroupChange" :props="props" placeholder=""></el-cascader>
        </el-form-item>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-order" @click="handleNorm()" v-if="Number(this.$store.getters.userInfo.lev)===10">报告室数据设定</el-button>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import norm from './norm.vue'
import group from './group.vue'
import detail from './detail.vue'
import score from './score.vue'
import sampling from '../manage/sampling.vue'
import {
  getCrmAchievementSumQueryPageData
} from '@/api/performance/statistics.js'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
import { zzData } from '@/utils/public.js'
export default {
  data() {
    return {
      loading: false,
      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      groupOptions: [],
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        groupId: '',
        totalTime: ''
      },
      fromData: [{ type: 'input', prop: 'userName', label: '执行人' }],
      tableData: [],
      tableHeader: [
        {
          prop: 'userName',
          label: '执行人',
          width: 90
        },
        {
          prop: 'groupName',
          label: '部门',
          width: 70,
          type: 'view'
        },
        // {
        //   prop: 'totalTypeName',
        //   label: '业务类型',
        //   width: 70
        // },
        {
          prop: 'positionName',
          label: '职务',
          width: 70
        },
        {
          prop: 'projectSumNum',
          label: '参与项目数',
          width: 60
        },
        {
          prop: 'personalQuota',
          label: '个人提成',
          width: 80
        },
        {
          prop: 'totalTime',
          label: '统计时间',
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '绩效明细',
            type: 'primary',
            click: 'handleQuota',
            condition: params => {
              if (params.totalType === '1') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '样品查询',
            type: 'primary',
            click: 'handleSample',
            condition: params => {
              if (params.totalType === '2') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '评分评价',
            type: 'primary',
            click: 'handleScore',
            condition: params => {
              if (
                (params.totalType === '1' || params.totalType === '3') &&
                Number(this.$store.getters.userInfo.lev) > 1
              ) {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      multipleSelection: [],
      positionData: [],
      groupOption: [],
      groupIds: []
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCrmAchievementSumQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.totalType === '1') {
              item.totalTypeName = '报告室'
            } else if (item.totalType === '2') {
              item.totalTypeName = '实验室'
            } else if (item.totalType === '3') {
              item.totalTypeName = '现场部'
            }
            if (item.projectSum === '0') {
              item.projectSumNum = '-'
            } else {
              item.projectSumNum = item.projectSum
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
    handleNorm() {
      this.$layer.iframe({
        content: {
          content: norm, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '报告室数据设定',
        maxmin: true,
        shadeClose: false
      })
    },
    handleScore(params) {
      this.$layer.iframe({
        content: {
          content: score, // 传递的组件对象
          parent: this, // 当前的vue对象\
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '评分评价',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSample(params) {
      this.$layer.iframe({
        content: {
          content: sampling, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          }
        },
        area: this.$layer_Size.Max,
        title: '样品详细',
        maxmin: true,
        shadeClose: false
      })
    },
    handleQuota(params) {
      this.$layer.iframe({
        content: {
          content: detail, // 传递的组件对象
          parent: this, // 当前的vue对象\
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '绩效明细',
        maxmin: true,
        shadeClose: false
      })
    },
    getGroupListData() {
      getGroupQueryAllGroupsTree().then(res => {
        this.groupOption = zzData(res.result)
      })
    },
    getGroupChange(params) {
      this.fromValiData.groupId = params[params.length - 1]
    },
    doSearch() {
      this.fromValiData.pageNow = 1

      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.groupIds = []
      this.fromValiData.groupId = ''
      this.fromValiData.achievementType = ''
      this.fromValiData.userName = ''
      this.fromValiData.totalTime = ''
      delete this.fromValiData.totalTime
      delete this.fromValiData.userName
      delete this.fromValiData.achievementType
      this.getListData()
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: group, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '部门明细',
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
    },
    getTime() {
      let getNowDate = new Date()
      getNowDate.setMonth(getNowDate.getMonth() - 1);
      let thirtyYear = getNowDate.getFullYear();
      let thirtyMonth = getNowDate.getMonth() + 1;
      if (thirtyMonth >= 1 && thirtyMonth <= 9) {
        thirtyMonth = '0' + thirtyMonth;
      }
      let monthDate = thirtyYear + '-' + thirtyMonth;
      this.fromValiData.totalTime = monthDate
    }
  },
  mounted() {
    this.getTime()
    this.getListData()
    this.getGroupListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
