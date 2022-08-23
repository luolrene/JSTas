<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template slot="other">
        <el-form-item label="部门名称:" v-if="Number(this.$store.getters.userInfo.lev)===10">
          <el-cascader v-model="groupIds" :options="groupOption" :show-all-levels="false" @change="getGroupChange"  placeholder=""></el-cascader>
        </el-form-item>
        <el-form-item label="完成时间:">
          <el-date-picker v-model="times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
    </fromSearch>
    <tableItem :obj="this" :isSelection="false" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getCrmAchievementQueryPageData } from '@/api/performance/manage.js'
import { getGroupQueryAllGroupsTree } from '@/api/jcxxgl/group.js'
import { zzData } from '@/utils/public.js'
import sampling from './sampling.vue'
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
      groupOption: [],
      groupIds: [],
      startTime: '',
      endTime: '',
      achievementType: '',
      times: '',
      achievementTypeOptions: [
        { label: '报告室', value: '1' },
        { label: '实验室', value: '2' },
        { label: '现场部', value: '3' }
      ],
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'userName', label: '部门人员' }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 90
        },
        {
          prop: 'contName',
          label: '合同项目',
          width: 90
        },
        {
          prop: 'plateName',
          label: '项目板块',
          width: 90
        },
        // {
        //   prop: 'samplingTaskName',
        //   label: '采样任务',
        //   width: 90
        // },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 110
        },
        {
          prop: 'achievementQuota',
          label: '部门绩效',
          width: 90
        },
        {
          prop: 'userName',
          label: '部门人员',
          width: 90
        },
        {
          prop: 'groupName',
          label: '部门',
          width: 90
        },
        {
          prop: 'achievementTime',
          label: '完成时间',
          width: 90
        }
      ],
      button: {
        width: 120,
        buttonList: [
          {
            name: '样品查询',
            type: 'primary',
            click: 'handleSample',
            condition: params => {
              if (params.achievementType === '2') {
                return true
              } else {
                return false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmAchievementQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(item => {
            switch (item.achievementType) {
              case '1':
                item.achievementTypeName = '报告室'
                break
              case '2':
                item.achievementTypeName = '实验室'
                break
              case '3':
                item.achievementTypeName = '现场部'
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
    handleSample(params) {
      this.$layer.iframe({
        content: {
          content: sampling, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params,
            manage: true
          }
        },
        area: this.$layer_Size.Max,
        title: '样品详细',
        maxmin: true,
        shadeClose: false
      })
    },
    doSearch() {
      if (this.times.length > 0) {
        this.fromValiData.startTime = this.times[0]
        this.fromValiData.endTime = this.times[1]
      }
      if (this.achievementType.length > 0) {
        this.fromValiData.achievementType = this.achievementType
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },

    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.achievementType = ''
      this.fromValiData.userName = ''
      this.times = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.endTime
      delete this.fromValiData.userName
      delete this.fromValiData.custName
      delete this.fromValiData.achievementType
      this.getListData()
    },

    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '合同详情',
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
    this.getGroupListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
