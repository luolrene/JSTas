<template>

  <div class="operate-container" style="position:relative">

    <el-steps :active="active1" class="title" v-if="logList ">
      <el-step :title="item.name" v-for="(item,index) in steps" :key="index" icon="el-icon-s-custom"></el-step>
    </el-steps>

    <el-row :gutter="20" class="header">
      <el-col :span="8" style="padding-left:30px">任务节点</el-col>
      <el-col :span="6" style="padding-left:80px">任务时间</el-col>
    </el-row>
    <el-steps direction="vertical" :space="100" :active="active" style="padding: 0 20px;">
      <el-step v-for="(item,index) in assembleData" :key="index">
        <div slot="title">
          <el-row :gutter="20">
            <!-- 任务节点 -->
            <el-col :span="8" class="common">{{item.jdName}}</el-col>
            <!-- 任务时间 -->
            <el-col :span="8" class="common" align="center" style="padding-right: 22%;">
              <span v-if="item.jdTime">{{item.jdTime}}</span>
              <span v-else>无</span>
            </el-col>
            <!-- 备注信息 -->
            <el-col class="common">
              <span v-if="item.logList && item.logList.length > 0" style="cursor: pointer;">
                <el-row :gutter="20">
                  <el-col>
                  </el-col>
                </el-row>
                <transition name="slide-fade">
                  <el-row :gutter="20" style="padding: 10px; margin-top:50px" v-show="true">
                    <div class="content">
                      <div v-for="(item,index) in item.logList" :key="index" class="border" :color="item.optinColor">
                        <div>
                          <span>{{item.oper}}</span>
                          <span style="margin-left:20px">{{item.operTime}}</span>
                          <span id='text' :style="{color:item.optinColor}">{{item.option}}</span>
                          <div style="width:500px;white-space:normal">意见：{{item.exp}}</div>
                        </div>
                      </div>
                    </div>
                  </el-row>
                </transition>
              </span>
            </el-col>
          </el-row>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import { getContGetJdInfo } from '@/api/contract/msg.js'
import { getPathQueryPathItems } from '@/api/jcxxgl/exmProcess.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      btnLoading: false,
      assembleData: [],
      fromVailData: {},
      steps: [],
      logList: [],
      active: 0,
      active1: 0
    }
  },
  methods: {
    getListData(logList) {
      getPathQueryPathItems({ mainId: this.params.checkPath }).then(res => {
        res.result.forEach(item => {
          this.steps.push({
            id: item.oper,
            name: item.operName,
            mobile: item.oper
          })
        })
      })
      getContGetJdInfo({ contId: this.params.id }).then(res => {
        this.assembleData = res.result
        this.active1 = Number(this.assembleData[1].checkStep)
        this.assembleData[1].logList.forEach(item => {
          if (item.option === '1') {
            item.option = '同意'
            item.optinColor = '#01AB91'
          } else {
            item.option = '拒绝'
            item.optinColor = '#FF798D'
          }
        })
        this.assembleData.forEach((xdd, index) => {
          xdd.isLogShow = false
          if (xdd.isNowStep === '1') {
            this.active = index
          }
          if (res.result && res.result.length > 0) {
            res.result.forEach(arc => {
              if (xdd.id === arc.jdNo) {
                xdd.jdNo = arc.jdNo
                xdd.jdTime = arc.jdTime
              }
            })
          }
          if (logList && logList.length > 0) {
            logList.forEach(arc => {
              if (xdd.id === arc.jdNo) {
                xdd.logList.push(arc)
                this.logList.push(arc)
              }
            })
          }
        })
      })
    },
    getTitle(index) {
      if (this.params.checkTaskStatus === '1') {
        if (index === this.steps.length - 1) {
          return '流程结束'
        }
      }
      return '步骤' + (index + 1)
    }
  },
  mounted() {
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
.title {
  position: absolute;
  width: 500px;
  top: 195px;
  left: 108px;
}
.common {
  color: #333333;
  white-space: nowrap;
  overflow: hidden;
  word-break: break-all;
  font-size: 15px;
}
#text {
  margin-left: 20px;
  font-size: 14px;
}
.header {
  margin: 0 20px 15px 20px !important;
  color: #333333;
  font-weight: 700;
  border-bottom: 1px solid #bcbcbc;
  padding-bottom: 6px;
}
.content {
  width: 650px;
  border: 1px solid #bcbcbc;
  text-align: left;
  border-radius: 10px;
  padding: 15px 20px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  color: #333333;
  font-size: 13px;
}
.content .border {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 2px;
}
.content .list {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #bcbcbc;
  display: flex;
  margin: 5px 10px 5px 5px;
}
.el-steps {
  display: flex;
  justify-content: space-between;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(20px);
  opacity: 0;
}
</style>
