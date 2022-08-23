<template>
  <div class="pc-container nodeShowList" style="width: 100%;" v-if="assembleData.length > 0">
    <el-row :gutter="20" class="header">
      <el-col :span="5" style="padding-left: 40px;">任务节点</el-col>
      <el-col :span="7" align="center">任务时间</el-col>
      <el-col :span="12" align="center">备注信息</el-col>
    </el-row>
    <el-steps direction="vertical" :space="60" :active="active"  style="padding: 0 20px;">
      <el-step v-for="(item,index) in assembleData" :key="index">
        <div slot="title">
          <el-row :gutter="20">
            <el-col :span="5" class="common" @click.native="clickNode(item)" style="cursor: pointer;">{{item.jdName}}</el-col>
            <el-col :span="7" class="common" align="center" style="padding-right: 5%;">
              <span v-if="item.jdTime">{{item.jdTime}}</span>
              <span v-else>无</span>
            </el-col>
            <el-col :span="12" class="common" align="center" style="padding-right: 1%;">
              <span v-if="item.logData && item.logData.length > 0" style="cursor: pointer;">
                <span v-show="!item.isLogShow" @click="item.isLogShow = true">展开<i class="el-icon-caret-bottom"></i></span>
                <span v-show="item.isLogShow" @click="item.isLogShow = false">隐藏<i class="el-icon-caret-top"></i></span>
              </span>
            </el-col>
          </el-row>
          <transition name="slide-fade">
            <el-row :gutter="20" style="padding: 10px;" v-show="item.isLogShow">
              <div class="content">
                <div v-for="(xdd,index) in item.logData" :key="index" class="border">
                  <div class="list"></div>
                  <div>
                    <div>{{xdd.creater}},{{xdd.createTime}}</div>
                    <div>{{xdd.text}}</div>
                  </div>
                </div>
              </div>
            </el-row>
          </transition>
        </div>
      </el-step>
    </el-steps>
  </div>
  <div v-else style="font-size: 15px;">
    暂无咨询日志
  </div>
</template>

<script>
import {getConSultGetJdInfo} from '../../../../api/consult/task.js'
import {getReportTaskLogQueryPageData} from '../../../../api/jcxxgl/nodeDefend.js'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      assembleData: [],
      active: -1
    }
  },
  methods: {
    getlistData () {
      let ids = {}
      ids.contId = this.params.id
      getConSultGetJdInfo(ids).then(res => {
        let params = {}
        params.pageNow = 1
        params.pageSize = 99999
        params.reportNo = this.params.id
        if (res.code === 33) {
          return
        }
        getReportTaskLogQueryPageData(params).then(res2 => {
          let logData = res2.result.pageList

          res.result.forEach((xdd, index) => {
            xdd.logData = []
            xdd.isLogShow = false
            if (xdd.isNowStep === '1') {
              this.active = index
            }

            if (logData && logData.length > 0) {
              logData.forEach(arc => {
                if (xdd.jdNo === arc.jdNo) {
                  xdd.logData.push(arc)
                }
              })
            }
          })
          this.assembleData = res.result
        })
      }).catch(() => {
        this.btnLoading = false
      })
    }
  },
  mounted () {
    console.log(this.params)
    this.getlistData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .nodeShowList .common{
    color: #333333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    font-size: 15px;
  }
  .nodeShowList .header{
    margin:0 20px 15px 20px !important;
    color: #333333;
    font-weight: 700;
    border-bottom: 1px solid #BCBCBC;
    padding-bottom: 6px;
  }
  .nodeShowList .content{
    border: 1px solid #BCBCBC;
    border-radius: 10px;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    color: #333333;
    font-size: 13px;
  }
  .nodeShowList .content .border{
    display: flex;
    border-bottom: 1px solid #BCBCBC;
    margin-bottom: 15px;
    padding-bottom: 2px;
  }
  .nodeShowList .content .list{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid #BCBCBC;
    display: flex;
    margin: 5px 10px 5px 5px;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
