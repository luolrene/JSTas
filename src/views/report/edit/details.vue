<template>
  <div class="operate-container">
    <el-tabs tab-position="left">
      <el-tab-pane label="电子版报告">
        <div class="content">
          <div v-if="fileList.length === 0">无</div>
          <fileList :fileList="fileList" style="padding:0;" v-else></fileList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实验室记录" lazy>
        <div class="content">
          <div v-if="fileList_shiyan.length === 0">无</div>
          <fileList :fileList="fileList_shiyan" Interface="/originalCy/download" style="padding:0;" v-else></fileList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="现场记录" lazy>
        <div class="content">
          <div v-if="fileList_xianchang.length === 0">无</div>
          <fileList :fileList="fileList_xianchang" Interface="/file/downloadOriginalXcFile" style="padding:0;" v-else></fileList>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流程明细" v-if="params.checkTask">
        <el-row :gutter="20">
          <el-col :span="10" style="justify-content: flex-end;align-items: center;display: flex;">
            <el-steps :space="80" direction="vertical" style="width: 80%;" :active="active">
              <el-step :title="getTitle(index)" :description="item.name" v-for="(item,index) in steps" :key="index"></el-step>
            </el-steps>
          </el-col>
          <el-col :span="14" style="padding: 0;">
            <el-timeline style="padding-right: 20px;padding-left: 0;">
              <el-timeline-item :timestamp="item.operTime" placement="top" v-for="(item,index) in checkLogList" :key="index" :color="optinColor">
                <el-card>
                  <h4 class="content_a">
                    <span style="margin-right: 15px;">步骤{{item.step}}</span><span :style="{color:optinColor}">{{item.option}}</span>
                  </h4>
                  <div class="content_a">
                    <span>{{item.oper}}</span>
                    <span>{{item.operMobile}}</span>
                  </div>
                  <div v-if="item.exp !== null && item.exp !==''" class="content_b">
                    审核备注：{{item.exp}}
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import fileList from '../../common/fileList.vue'
import {getFileQueryFileList} from '../../../api/file.js'
import {getOxcQueryList} from '@/api/sampling/original.js'

import {getPathQueryPathItems} from '../../../api/jcxxgl/exmProcess.js'
import {getCheckTaskQueryLogs} from '../../../api/verity/contractVerity.js'
import {getOriginalCyQueryFileList} from '@/api/check/checkTask.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  components: {
    fileList
  },
  data () {
    return {
      fileList: [],
      fileList_shiyan: [],
      fileList_xianchang: [],

      active: 0,
      steps: [],
      optinColor: '#01AB91',
      checkLogList: [] // 审核日志列表
    }
  },
  methods: {
    getFileListData () {
      getFileQueryFileList({id: this.params.reportNo, type: '2'}).then(res => {
        this.fileList = res.result
      })

      getOriginalCyQueryFileList({reportNo: this.params.reportNo, sign: '0'}).then(res => {
        this.fileList_shiyan = res.result
      })

      this.fileList_xianchang = []
      getOxcQueryList({type: '1', reportNo: this.params.reportNo, father: '0'}).then(res => {
        res.result.forEach((xdd, index) => {
          xdd.fileId = xdd.id
          xdd.loadName = xdd.fileUrl.substring(xdd.fileUrl.lastIndexOf('/') + 1)
          xdd.saveName = xdd.fileUrl.substring(xdd.fileUrl.lastIndexOf('/') + 1)
          xdd.fullfilename = xdd.fileUrl.substring(xdd.fileUrl.lastIndexOf('/') + 1)
        })
        this.fileList_xianchang = res.result
      })
    },

    getListData () {
      getPathQueryPathItems({mainId: this.params.checkPath}).then(res => {
        res.result.forEach(xdd => {
          this.steps.push({
            id: xdd.oper,
            name: xdd.operName,
            mobile: xdd.oper
          })
        })
      })
    },
    getTitle (index) {
      return '步骤' + (index + 1)
    }
  },
  mounted () {
    this.getFileListData()

    if (this.params.checkTask) {
      this.getListData()
      getCheckTaskQueryLogs({taskId: this.params.checkTask}).then(res => {
        res.result.logList.forEach(xdd => {
          if (xdd.option === '1') {
            xdd.option = '同意'
            this.optinColor = '#01AB91'
          } else {
            xdd.option = '拒绝'
            this.optinColor = '#FF798D'
          }
        })
        this.active = Number(res.result.step) - 1
        this.checkLogList = res.result.logList
      })
    }
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .el-descriptions :not(.is-bordered) td, .el-descriptions :not(.is-bordered) th{
    width: 200px;
  }
  .contractDetail{
    .modular{
      display: flex;
      margin:15px 0 30px 0;
      .title{
        width: 80px;
        font-weight: 600;
      }
      .content{
        width: calc(100% - 80px);
      }
    }
    .my-label {
      background-color: #E1F3D8 !important;
    }
  }
</style>
