<template>
  <div class="operate-container">
    <el-row class="row-bg" justify="center" style="border: 1px solid #A3A3A3;height: 100%">
      <el-col :span="4" style="border-right: 1px solid #A3A3A3;height: 100%">
        <div class="title">
          <span style="margin-right: 4px;">原始记录列表</span>
        </div>
        <el-scrollbar class="page-component__scroll" :native="false" style="height: 90%">
          <div style="display: flex;flex-direction: column;">
            <el-tooltip
              :ref="'tlp' + index"
              class="item"
              effect="light"
              :content="item.fileName"
              :disabled="!tooltipDisabled"
              :open-delay="1000"
              v-for="(item,index) in recordList"
              :key="index"
              placement="top">
              <span class="over-flow" @mouseenter="visibilityChange($event,index)" @click="getClickRecord(item)">
                <i
                  :class="item.fileSign === fileSign ? 'el-icon-warning' : 'el-icon-warning-outline'"
                  :style="{color:item.fileSign === fileSign ? '#FF798D' : '#0195DB'}"
                  class="deleteRecordClass"
                  @click.stop="getSignRecord(item)"></i>
                <span class="recordClass">{{item.fileName}}</span>
              </span>
            </el-tooltip>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="20" style="height: 100%;">
        <div
          v-showTips
          style="width: 800px;margin:5px 10px;font-size: 14px;color:#FF798D">
          {{signParams.signReason}}</div>
        <iframe :src="fileUrl" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes"></iframe>
        <div v-if="fileUrl !== ''" style='position: absolute;bottom:70px;right: 70px;z-index: 999;cursor: pointer;'>
          <img src="static/img/home/download.png" alt="" @click="getDownload">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOxcQueryList, getOxcSignFile} from '@/api/sampling/original.js'
export default {
  props: {
    params: Object,
    fileSign: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      tooltipDisabled: false,
      signParams: {},

      recordList: [],

      host: process.env.BASE_API + process.env.JS_Server,
      Interface: '/file/downloadOriginalXcFile',
      fileUrl: ''
    }
  },
  methods: {
    getListData() {
      let ids = {}
      ids.type = '1'
      ids.reportNo = this.params.reportNo
      ids.father = '0'
      getOxcQueryList(ids).then(res => {
        this.recordList = res.result
      })
    },
    getClickRecord(params) {
      this.signParams = params
      this.fileUrl = process.env.FILE_Server +
      encodeURIComponent(Base64.encode(this.host +
      this.Interface +
      '?fileId=' + params.id +
      '&token=' + this.$store.getters.userInfo.token +
      '&fullfilename=' + params.fileUrl.substring(params.fileUrl.lastIndexOf('/') + 1)))
    },
    getDownload () {
      window.open(this.host + this.Interface + '?fileId=' + this.signParams.id + '&token=' + this.$store.getters.userInfo.token)
    },
    getSignRecord(params) {
      if (params.fileSign === this.fileSign) {
        this.$share.confirm({
          message: '此操作将取消标记, 是否继续?',
          type: 'warning',
          confirm: () => {
            let ids = {}
            ids.id = params.id
            ids.fileSign = '0' // 1是校对的标记  2是审核的标记 0未标记
            getOxcSignFile(ids).then(res => {
              this.$share.message('取消成功')
              this.getListData()
            })
          }
        })
      } else {
        this.$prompt('请输入标记原因', '标记', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea'
        }).then(({ value }) => {
          let ids = {}
          ids.id = params.id
          ids.signReason = value
          ids.fileSign = this.fileSign // 1是校对的标记  2是审核的标记
          getOxcSignFile(ids).then(res => {
            this.$share.message('标记成功')
            this.getListData()
          })
        })
      }
    },
    // 控制tooltip是否显示
    visibilityChange(event, index) {
      const ev = event.target;
      const evWeight = ev.scrollWidth; // 文本的实际宽度
      const contentWeight = this.$refs['tlp' + index][0].$el.parentNode.clientWidth; // 文本容器宽度(父节点)
      // this.tooltipDisabled = true;
      if (evWeight > contentWeight) {
        // 文本宽度 > 实际内容宽度  =》内容溢出
        setTimeout(() => {
          this.tooltipDisabled = true;
        }, 500)
      } else {
        // 否则为不溢出
        setTimeout(() => {
          this.tooltipDisabled = false;
        }, 500)
      }
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  },
  destroyed() {
    this.$parent.getListData()
  }
}
</script>

<style scoped lang="scss">
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 18px;
    background-color: #53A7CE;
    color:#FFFFFF;
    padding:10px 0
  }
  .deleteRecordClass{
    padding-left: 3px;
  }
  .deleteRecordClass:hover{
    color: #F56C6C;
    cursor: pointer;
  }
  .addRecordClass{
    font-size: 20px;
  }
  .addRecordClass:hover{
    cursor: pointer;
    font-size: 24px;
  }

  .over-flow{
    width: 98%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .recordClass:hover{
    color: #0195DB;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
