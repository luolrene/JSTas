<template>
  <div class="operate-container">
    <el-row class="row-bg" justify="center" style="border: 1px solid #A3A3A3;height: 100%">
      <el-col :span="4" style="border-right: 1px solid #A3A3A3;height: 100%">
        <div class="title">
          <span style="margin-right: 4px;">原始记录列表</span>
          <el-tooltip
            class="item"
            effect="light"
            content="新建原始记录"
            placement="top">
            <i class="el-icon-circle-plus-outline addRecordClass" @click="addRecord"></i>
          </el-tooltip>
        </div>
        <div style="margin-bottom: 10px;">
          <el-input
            placeholder="请输入记录名称进行搜索"
            v-model="fromValiData.fileName"
            class="input-with-select"
            @input="handleSearch">
          </el-input>
        </div>
        <el-scrollbar class="page-component__scroll" :native="false" style="height: 88%">
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
              <span
                @mouseenter.stop="visibilityChange($event,index)"
                @click="getClickRecord(item)"
                class="over-flow">
                <i
                  @click.stop="getDeleteRecord(item)"
                  class="el-icon-delete deleteRecordClass"></i>
                <i
                  v-if="isSign"
                  :class="(item.fileSign === '1' || item.fileSign === '2') ? 'el-icon-warning' : 'el-icon-warning-outline'"
                  :style="{color:(item.fileSign === '1' || item.fileSign === '2') ? '#FF798D' : '#0195DB'}"
                  class="deleteRecordClass"></i>
                <span class="recordClass">{{item.fileName}}</span>
              </span>
            </el-tooltip>
          </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="20" style="height: 100%;">
        <div
          v-if="isSign"
          v-showTips
          style="width: 18vw;position: absolute;top: 10px;margin-left: 20px;font-size: 14px;color:#FF798D">
          {{signParams.signReason === null ? '无' : signParams.signReason}}</div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOxcQueryList, getOxcDelData} from '@/api/sampling/original.js'
import {getOriginalQueryAllModels} from '../../../api/check/checkTask.js'
import templateList from './template_list.vue'
export default {
  props: {
    params: Object,
    routerPath: {
      type: String,
      default: '/sampling/original'
    },
    // 从记录退回菜单打开 含有标记信息
    isSign: {
      type: Boolean,
      default: false
    },
    operName: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      reload: this.getListData
    }
  },
  data () {
    return {
      tooltipDisabled: false,
      showRouterView: true,
      fromValiData: {
        type: '1',
        father: '0'
      },
      signParams: {},

      recordList: [],
      allRecordList: [],
      templateList: [] // 原始记录模板数据
    }
  },
  methods: {
    getListData() {
      this.fromValiData.reportNo = this.params.reportNo
      getOxcQueryList(this.fromValiData).then(res => {
        this.recordList = res.result
        this.allRecordList = res.result
      })
    },
    // 获取原始记录模板数据
    getTemplateList() {
      let ids = {type: '1'}
      getOriginalQueryAllModels(ids).then(res => {
        this.templateList = res.result
      })
    },
    getClickRecord(params) {
      this.signParams = params
      let ids = {...params}
      ids.operName = this.operName
      ids.sampTaskId = this.params.sampTaskId
      this.$router.push({name: params.fileNo, params: ids})
    },
    // 新建一个原始记录
    addRecord() {
      this.$layer.iframe({
        content: {
          content: templateList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            reportNo: this.params.reportNo,
            templateList: this.templateList
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '原始记录模板',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSearch() {
      this.recordList = this.allRecordList.filter(data =>
        data.fileName.toLowerCase().includes(this.fromValiData.fileName.toLowerCase())
      )
    },
    getDeleteRecord(params) {
      let ids = {}
      ids.ids = params.id
      this.$share.confirm({
        confirm: () => {
          getOxcDelData({ids: params.id}).then(res => {
            this.$share.message('删除成功')
            this.getListData()
          })
        }
      })
    },
    // 获取选中的原始记录模板
    getRadioValue(params) {
      let ids = {...params}
      ids.reportNo = this.params.reportNo
      ids.operName = this.operName
      ids.sampTaskId = this.params.sampTaskId
      ids.custName = this.params.custName
      ids.contacts = this.params.contacts
      ids.contactsMobile = this.params.contactsMobile
      ids.address = this.params.address
      ids.id = null
      ids.father = '0'
      ids.type = '1'
      this.$router.push({name: params.fileNo, params: ids})
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
    // 获取原始记录模板数据
    this.getTemplateList()
    this.getListData()
  },
  created () {

  },
  destroyed() {
    this.$router.push(this.routerPath)
  }
}
</script>

<style scoped lang="scss">
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background-color: #53A7CE;
    color:#FFFFFF;
    padding:10px 0
  }
  .deleteRecordClass{
    color: #0195DB;
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
