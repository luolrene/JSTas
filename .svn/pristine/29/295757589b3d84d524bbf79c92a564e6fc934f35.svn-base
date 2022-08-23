<!-- 工作报告 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="报告状态" v-if="Number(this.$store.getters.userInfo.lev)<2">
            <el-select v-model="submitType" placeholder="" clearable>
              <el-option v-for="item in submitTypepOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属" v-if="Number(this.$store.getters.userInfo.lev)>1">
            <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags clearable :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="开始日期:" prop="reportTimeK">
            <el-date-picker v-model="reportTimeK" value-format='yyyy-MM-dd' type="date" placeholder="开始日期" style="width: 200px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="reportTimeJ">
            <el-date-picker v-model="reportTimeJ" value-format='yyyy-MM-dd' type="date" placeholder="结束时间" style="width: 200px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>

      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-promotion" @click="handleAssign()" v-if="this.$store.getters.userInfo.lev > 1">工作指派</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum='fromValiData.dataSum' :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import details from './details'
import assignList from './assign_list.vue'
import { getCrmSysGetUserAll } from '@/api/client/info.js'
import {
  getCrmReportQueryPageData,
  getCrmReportAddOrModify
} from '@/api/client/report.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      reportTimeK: '',
      reportTimeJ: '',
      submitType: '',
      submitTypepOptions: [
        { value: '1', label: '已提交' },
        { value: '2', label: '未提交' }
      ],
      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        submitType: '',
        reportTimeK: '',
        reportTimeJ: '',
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'reportName', label: '报告名称' },
        { type: 'input', prop: 'createUserName', label: '执行人' },
        {
          type: 'select',
          prop: 'reportType',
          label: '报告类型',
          data: [
            { id: '1', name: '日报' },
            { id: '2', name: '周报' },
            { id: '3', name: '月报' },
            { id: '4', name: '季报' },
            { id: '5', name: '年报' },
            { id: '6', name: '其他' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'reportName',
          label: '报告名称',
          type: 'view',
          width: 140
        },
        {
          prop: 'reportTypeName',
          label: '报告类型',
          width: 90
        },
        {
          prop: 'reportContent',
          label: '报告内容',
          width: 90
        },
        {
          prop: 'reportTime',
          label: '报告时间',
          width: 90
        },
        {
          prop: 'submitTypeName',
          label: '报告状态',
          width: 90
        },
        {
          prop: 'createUserName',
          label: '执行人',
          width: 90
        }
      ],
      button: {
        width: 140,
        buttonList: [
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (
                this.$store.getters.userInfo.name === params.createUserName ||
                this.$store.getters.userInfo.lev === '10'
              ) {
                return true
              } else {
                return false
              }
              if (params.submitType === '2') {
                return true
              }
            }
          },
          {
            name: '提交',
            type: 'primary',
            click: 'handleReview',
            condition: params => {
              if (params.submitType === '2') {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: [],
      props_affiliation: {
        multiple: true
      },
      optionsAffiliation: [
        {
          label: '我的',
          value: '2'
        },
        {
          label: '下属的',
          value: '3',
          children: []
        }
      ],
      affiliationValue: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmReportQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.submitType) {
              case '1':
                xdd.submitTypeName = '已提交'
                break
              case '2':
                xdd.submitTypeName = '未提交'
                break
            }
            switch (xdd.reportType) {
              case '1':
                xdd.reportTypeName = '日报'
                break
              case '2':
                xdd.reportTypeName = '周报'
                break
              case '3':
                xdd.reportTypeName = '月报'
                break
              case '4':
                xdd.reportTypeName = '季报'
                break
              case '5':
                xdd.reportTypeName = '年报'
                break
              case '6':
                xdd.reportTypeName = '其他'
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
    changeCascaderAffiliation() {
      getCrmSysGetUserAll({ id: this.$store.getters.userInfo.orgId }).then(
        res => {
          this.optionData = res.result
          let arr = this.optionData.map(item => {
            return {
              label: item.name,
              value: item.userId
            }
          })
          this.optionsAffiliation[1].children = arr
        }
      )
    },
    changeAffiliation(params) {
      if (params[0]) {
        if (params[0][0] === '2') {
          this.fromValiData.other = params[0][0]
          this.doSearch()
        }
      }
      let list = []
      params.forEach(item => {
        list.push(item[1])
      })
      this.fromValiData.subordinateIds = list.join(',')
      this.doSearch()
    },

    doSearch() {
      if (this.reportTimeK.length > 0) {
        this.fromValiData.reportTimeK = this.reportTimeK
      }
      if (this.reportTimeJ.length > 0) {
        this.fromValiData.reportTimeJ = this.reportTimeJ
      }
      if (this.submitType.length > 0) {
        this.fromValiData.submitType = this.submitType
      }
      this.getListData()
    },
    doReset(formName) {
      this.reportTimeK = ''
      this.reportTimeJ = ''
      this.submitType = ''
      delete this.fromValiData.submitType
      delete this.fromValiData.reportTimeK
      delete this.fromValiData.reportTimeJ
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
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
        area: this.$layer_Size.Max,
        title: '工作报告详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview(params) {
      if (params.reportType === null || params.reportType === '') {
        this.$share.message('请编辑报告类型', 'warning')
        return
      }
      this.$confirm('此操作将提交报告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      })
        .then(() => {
          let ids = JSON.parse(JSON.stringify(params))
          ids.submitType = '1'
          getCrmReportAddOrModify(ids).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
    },
    handleAssign() {
      this.$layer.iframe({
        content: {
          content: assignList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {} // props
        },
        area: this.$layer_Size.Max,
        title: '工作指派',
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
    }
  },
  mounted() {
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
