<template>
  <div class="pc-container" style="height: calc(100vh - 180px);">
    <el-form :inline="true" :model="fromValiData" class="demo-form-inline" ref="fromValiData" style="display: flex;align-items: center;justify-content: center;">
      <el-form-item label="">
        <el-select v-model="fromValiData.time" @change="changeTime" placeholder="请选择" style="width: 160px;">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="times"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :clearable="false"
          @change="rangeTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-cascader
          ref="cascaderDept"
          v-model="deptValue"
          @change="changeDeptValue"
          :options="deptOptions"
          :props="{ value: 'id' ,label: 'name',multiple: true, checkStrictly: true}"
          :show-all-levels="false"
          collapse-tags
          placeholder="请选择部门"
          :style="{width:$layer_Size.inputSelfNorWidth}"></el-cascader>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="fromValiData.contractState" @change="changeState" placeholder="请选择合同状态" clearable style="width: 160px;">
          <el-option v-for="item in stateptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="userDataValue" multiple filterable clearable placeholder="请选择人员" :style="{width:$layer_Size.inputSelfNorWidth}">
          <el-option v-for="item in userDataList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" :size="$layer_Size.buttonSize" @click="doSearch" :loading="searchLoading">查询</el-button>
    </el-form>
    <!-- 概况统计 -->
    <template v-if="firstList.length > 0">
      <el-row>
        <div style="font-size: 17px;text-align: left;font-weight: 700;margin-bottom: 15px;">概况统计</div>
        <div style="padding: 0 15px;">
          <el-col :span="6" v-for="(item,index) in firstList" :key="index" class="gaiKuang">
            <div class="title">
              {{item.name}}
            </div>
            <div class="content" :class="{borderRight:(index + 1) % 4 === 0}" style="border-top: 1px solid #EBEEF5">
              <!-- <a @click="getRouteJump(item)">{{item.crmSum}}</a> -->
              <span>{{item.crmSum}}</span>
            </div>
          </el-col>
          <transition name="draw">
            <div v-show="boxshow">
              <el-col :span="6" v-for="(item,index) in allList" :key="index" class="gaiKuang">
                <div class="title">
                  {{item.name}}
                </div>
                <div class="content" :class="{borderRight: (index + 1) % 4 === 0 || index === allList.length-1}">
                  <!-- <a @click="getRouteJump(item)">{{item.crmSum}}</a> -->
                  <span>{{item.crmSum}}</span>
                </div>
              </el-col>
            </div>
          </transition>
        </div>
        <loading :loading="listLoading"></loading>
      </el-row>
      <span class="iconfont" @click="boxshow = !boxshow" v-show="!boxshow">&#xec0d;</span>
      <span class="iconfont" @click="boxshow = !boxshow" v-show="boxshow">&#xec0e;</span>
    </template>

    <!-- 业绩对比 -->
    <el-row type="flex" v-if="this.$store.getters.userInfo.lev > 1">
      <div style="position: absolute;right: 2%;top:25px;z-index: 2;">
        <el-select v-model="userYpeValue" @change="changeUserType" placeholder="请选择类型" style="width: 140px;">
          <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <myEchart :id="'echart_user'" :data="option_user" :loading="userLoading" :style="{height:echartHeight}" style="width: 100%;margin: 15px 0;"></myEchart>
    </el-row>

    <!-- 销售机会 业绩目标-->
    <el-row type="flex" style="margin-bottom: 10px;">
      <el-col :span="16">
        <myEchart :id="'echart_chance'" :data="option_chance" :loading="chanceLoading" :style="{height:echartHeight}" style="width: 100%;"></myEchart>
      </el-col>
      <el-col :span="8">
        <div style="position: absolute;right: 2%;top:10px;z-index: 2;">
          <el-date-picker v-model="targetMonthValue" @change="changeTargetMonth" value-format="yyyy-MM" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" style="width: 240px;">
          </el-date-picker>
        </div>
        <myEchart :id="'echart_target'" :data="option_target" :loading="targetLoading" :style="{height:echartHeight}" style="width: 100%;"></myEchart>
      </el-col>
    </el-row>

    <!-- 客户统计 -->
    <el-row type="flex" style="margin-bottom: 10px;">
      <div style="position: absolute;right: 2%;top:10px;z-index: 2;">
        <el-date-picker
          v-model="yearValue"
          type="year"
          placeholder="选择年份"
          value-format="yyyy"
          @change="changeYear"
          :clearable="false"
          style="width: 140px;">
        </el-date-picker>
      </div>
      <myEchart :id="'echart_month'" :data="option_month" :loading="monthLoading" :style="{height:echartHeight}" style="width: 100%;height: 250px;"></myEchart>
    </el-row>
  </div>
</template>

<script>
import {
  getCrmSysOutline,
  getCrmSysChartOne,
  getCrmSysChartTwo,
  getCrmSysChartThree,
  getCrmSysSalesStatistics,
  getCrmSysGetUserAll,
  getCrmSysDepartmentTree
} from '../../../api/client/home.js'
import { zzData } from '../../../utils/public.js'
export default {
  data() {
    return {
      userLoading: false,
      chanceLoading: false,
      monthLoading: false,
      targetLoading: false,
      listLoading: false,
      fromValiData: {
        time: '4',
        groupId: '',
        userMobile: ''
      },
      fromData: [{ type: 'input', prop: 'reportName', label: '报告名称' }],
      boxshow: false,
      firstList: [],
      allList: [],
      deptOptions: [],
      deptValue: [],
      stateptions: [
        { value: '02', label: '审核通过' },
        { value: '05', label: '已完成' },
        { value: '06', label: '项目启动' },
        { value: '07', label: '挂起' },
        { value: '08', label: '方案录入' }
      ],
      size: '',
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      },
      option_all: {},
      option_user: {},
      option_chance: {},
      option_month: {},
      option_target: {},

      timeOptions: [
        { value: '1', label: '本日' },
        { value: '2', label: '本周' },
        { value: '3', label: '本月' },
        { value: '4', label: '本年' }
      ],
      times: [],
      userYpeValue: '1',
      userTypeList: [
        { value: '1', label: '客户' },
        { value: '2', label: '跟进' },
        { value: '3', label: '合同' },
        { value: '4', label: '销售机会' },
        { value: '5', label: '跟进方式' }
      ],
      userDataList: [], // 当前登陆人所在部门下的人员
      userDataValue: [], // 选择的人员数据
      targetMonthValue: [], // 业绩目标-选择的月份
      yearValue: '', // 客户统计-年份

      // 图标高度
      echartHeight: '50vh'
    }
  },
  watch: {
    userDataValue: {
      handler(newValue, oldValue) {
        this.fromValiData.userIds = newValue.join(',')
        this.fromValiData.userMobile = ''
        this.userDataList.forEach(xdd => {
          newValue.forEach(arc => {
            if (xdd.id === arc) {
              this.fromValiData.userMobile += xdd.mobile + ','
            }
          })
        })
        this.fromValiData.userMobile = this.fromValiData.userMobile.substring(0, this.fromValiData.userMobile.length - 1)
      },
      deep: true
    }
  },
  computed: {
    searchLoading: {
      get() {
        if (
          !this.userLoading &&
          !this.chanceLoading &&
          !this.monthLoading &&
          !this.targetLoading &&
          !this.listLoading
        ) {
          return false
        } else {
          return true
        }
      },
      set(e) {
        return e
      }
    }
  },
  methods: {
    getEchartData_all() {
      this.firstList = []
      this.allList = []
      let ids = {}
      ids = JSON.parse(JSON.stringify(this.fromValiData))
      getCrmSysOutline(ids)
        .then(res => {
          res.result.forEach((xdd, index) => {
            if (index <= 7) {
              this.firstList.push(xdd)
            } else {
              this.allList.push(xdd)
            }
          })
        })
        .catch(() => { })
    },
    getEchartData_user() {
      let ids = {}
      ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.oneType = this.userYpeValue
      this.userLoading = true
      getCrmSysChartOne(ids)
        .then(res => {
          let option = {
            title: {
              text: '业绩对比',
              left: '0',
              top: '4%'
            },
            tooltip: {},
            dataZoom: [
              {
                type: 'slider',
                realtime: true, // 拖动滚动条时是否动态的更新图表数据
                height: 16,
                start: 0,
                end: 100
              }
            ],
            legend: {
              top: '6%'
            },
            color: ['#67E0E3', '#FF9F7F'],
            grid: {
              left: '1%',
              right: '1%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: [],
              axisLabel: {
                interval: 0,
                rotate: 10
              }
            },
            yAxis: {},
            series: []
          }
          if (
            Array.isArray(res.result[0].data) &&
            res.result[0].data.length > 0
          ) {
            res.result[0].data.forEach((xdd, index) => {
              option.series.splice(index, 0, {
                name: xdd.name,
                type: 'bar',
                data: []
              })
            })
          }
          res.result.forEach((xdd, index) => {
            option.xAxis.data.push(xdd.name)
            xdd.data.forEach((arc, num) => {
              option.series[num].data.splice(index, 0, arc.sum)
            })
          })
          this.option_user = option
          this.userLoading = false
        })
        .catch(() => {
          this.userLoading = false
        })
    },
    getEchartData_chance() {
      this.chanceLoading = true
      let ids = {}
      ids = JSON.parse(JSON.stringify(this.fromValiData))
      getCrmSysChartTwo(ids)
        .then(res => {
          let option = {
            title: [
              {
                text: '销售机会统计',
                top: '4%',
                left: '0'
              },
              {
                subtext: '数量',
                left: '18.5%',
                top: '15%',
                subtextStyle: {
                  color: '#000000',
                  fontWeight: '700'
                }
              },
              {
                subtext: '金额',
                right: '28.5%',
                top: '15%',
                subtextStyle: {
                  color: '#000000',
                  fontWeight: '700'
                }
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '10%'
            },
            color: ['#67E0E3', '#FF9F7F', '#9FE6B8', '#FFDB5C', '#D48FFF'],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '数量',
                type: 'pie',
                radius: '60%',
                center: ['20%', '55%'],
                data: []
              },
              {
                name: '金额',
                type: 'pie',
                radius: '60%',
                center: ['70%', '55%'],
                data: []
              }
            ]
          }
          res.result.forEach((xdd, index) => {
            option.series[0].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.data1
            })
            option.series[1].data.splice(index, 0, {
              name: xdd.name,
              value: xdd.data2
            })
          })
          this.option_chance = option
          this.chanceLoading = false
        })
        .catch(() => {
          this.chanceLoading = false
        })
    },
    getEchartData_month() {
      let ids = {}
      ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.timeYear = this.yearValue
      this.monthLoading = true
      getCrmSysChartThree(ids)
        .then(res => {
          let option = {
            title: {
              text: '客户统计',
              top: '4%',
              left: '0'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [],
              top: '6%'
            },
            grid: {
              left: '80px',
              right: '4%'
            },
            xAxis: {
              type: 'category',
              data: []
            },
            color: ['#67E0E3', '#FF9F7F', '#9FE6B8', '#D48FFF'],
            yAxis: {
              type: 'value'
            },
            series: []
          }
          if (res.result && res.result.length > 0) {
            res.result[0].forEach(xdd => {
              option.legend.data.push(xdd.name)
              option.series.push({
                name: xdd.name,
                data: [],
                type: 'line'
              })
            })
            option.legend.data.forEach((xdd, index) => {
              res.result.forEach((xdd, index2) => {
                option.series[index].data.push(0)
              })
            })
          }
          res.result.forEach((xdd, index) => {
            option.xAxis.data.push(index + 1 + '月')
            xdd.forEach((arc, num) => {
              option.series[num].data[index] = arc.data
            })
          })
          this.option_month = option
          this.monthLoading = false
        })
        .catch(() => {
          this.monthLoading = false
        })
    },
    getEchartData_target() {
      let ids = {}
      ids = JSON.parse(JSON.stringify(this.fromValiData))
      this.targetLoading = true
      getCrmSysSalesStatistics(ids)
        .then(res => {
          let option = {
            title: [
              {
                text: '业绩目标',
                top: '4%',
                left: '0'
              }
            ],
            tooltip: {
              trigger: 'item',
              formatter: '{a}: {c}({d}%)'
            },
            legend: {
              top: '14%'
            },
            color: ['#FF9F7F', '#67E0E3', '#9FE6B8', '#FFDB5C', '#D48FFF'],
            grid: {
              left: '1%',
              right: '1%'
            },
            series: [
              {
                name: '金额',
                type: 'pie',
                radius: '60%',
                center: ['50%', '55%'],
                data: [
                  {
                    value: '',
                    name: '未完成金额'
                  },
                  {
                    value: '',
                    name: '完成金额'
                  }
                ]
              }
            ]
          }

          option.series[0].data[0].value =
            Number(res.result.target) - Number(res.result.actual)
          option.series[0].data[1].value = Number(res.result.actual)
          // res.result
          this.option_target = option
          this.targetLoading = false
        })
        .catch(() => {
          this.targetLoading = false
        })
    },
    // 业绩目标-月份范围
    changeTargetMonth(e) {
      this.fromValiData.targetTime = e[0]
      this.fromValiData.targetTimeEnd = e[1]
      this.getEchartData_target()
    },
    // 总体-本年-本月查询
    changeTime(e) {
      delete this.fromValiData.timeStart
      delete this.fromValiData.timeEnd
      this.times = []
      this.getListData()
    },
    // 总体-合同状态
    changeState() {
      this.getListData()
    },
    // 总体-时间范围
    rangeTime(e) {
      this.fromValiData.timeStart = e[0]
      this.fromValiData.timeEnd = e[1]
      delete this.fromValiData.time
      this.getListData()
    },
    // 业绩对比-类型
    changeUserType() {
      this.getEchartData_user()
    },
    // 切换年份
    changeYear() {
      this.getEchartData_month()
    },
    // 概况统计跳转
    getRouteJump(params) {
      this.$router.push(params.path)
    },
    // 获取今年
    getYear() {
      let date = new Date()
      let y = date.getFullYear()
      this.yearValue = y.toString()
      this.getEchartData_month()
    },
    // 获取当月
    getMonth() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      if (m < 10) {
        m = '0' + m
      }
      this.fromValiData.targetTime = y + '-' + m
      this.fromValiData.targetTimeEnd = y + '-' + m
      this.targetMonthValue.push(this.fromValiData.targetTime)
      this.targetMonthValue.push(this.fromValiData.targetTimeEnd)
      this.getEchartData_target()
    },
    // 获取部门数据
    getDeptData() {
      getCrmSysDepartmentTree().then(res => {
        if (res.result.length > 0) {
          res.result.forEach(xdd => {
            this.fromValiData.groupId += xdd.id + ','
            this.deptValue.push(xdd.id)
          })
          this.fromValiData.groupId = this.fromValiData.groupId.substring(0, this.fromValiData.groupId.length - 1)
          this.getUserData(this.fromValiData.groupId)
        }
        zzData(res.result)
        this.deptOptions = res.result

        this.getListData()
      })
    },
    // 切换部门
    changeDeptValue(e) {
      let data = this.$refs.cascaderDept.getCheckedNodes(false)
      let groupId = ''
      data.forEach(xdd => {
        groupId += xdd.value + ','
      })
      this.fromValiData.groupId = groupId.substring(0, groupId.length - 1)
      this.userDataValue = []
      this.userDataList = []
      this.getUserData(this.fromValiData.groupId)
    },
    // 获取人员数据
    getUserData(deptId) {
      let ids = {}
      ids.deptId = deptId
      getCrmSysGetUserAll(ids).then(res => {
        this.userDataList = res.result
      })
    },
    doSearch() {
      if (this.deptValue.length === 0) {
        this.$share.message('请选择一个部门', 'warning')
        return
      }
      this.searchLoading = true
      this.getListData()
    },
    getListData() {
      this.getEchartData_all()
      this.getEchartData_user()
      this.getEchartData_chance()
      this.getEchartData_target()
      this.getEchartData_month()
    }
  },
  mounted() {
    this.getYear()
    this.getMonth()
    this.getDeptData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
.draw-enter-active {
  transition: all 0.3s ease;
}
.draw-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.draw-enter, .draw-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.iconfont {
  font-size: 30px;
  color: #018cce;
  cursor: pointer;
}
.gaiKuang {
  display: flex;
  height: 40px;
  align-items: center;

  .title {
    width: calc(100% - 120px);
    text-align: left;
    border: 1px solid #ebeef5;
    background-color: #fafafa;
    height: 100%;
    line-height: 40px;
    padding-left: 10px;
    font-size: 14px;
    color: #666666;
  }

  .content {
    width: 120px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    height: 100%;
    line-height: 40px;
    padding-left: 10px;

    a {
      font-size: 14px;
      color: #018dcf;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .borderRight {
    border-right: 1px solid #ebeef5;
  }
}
.el-form-item {
  margin-bottom: 0;
}

>>> .el-range-editor.el-input__inner{
  padding: 0 10px;
}
</style>
