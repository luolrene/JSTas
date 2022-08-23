<template>
  <div class="pc-container nodeShowList" style="width: 100%;">
    <div style="text-align: left;margin-bottom: 10px;">
      <el-button type="primary" :size="$layer_Size.buttonSize" @click="dialogJdShow = true">添加节点日志</el-button>
    </div>
    <el-row :gutter="20" class="header">
      <el-col :span="3" style="padding-left: 40px;">任务节点</el-col>
      <el-col :span="5" align="center">任务时间</el-col>
      <el-col :span="12" align="center">操作人员</el-col>
      <el-col :span="4" align="center">备注信息</el-col>
    </el-row>
    <el-steps direction="vertical" :space="60" :active="active"  style="padding: 0 20px;">
      <el-step v-for="(item,index) in assembleData" :key="index">
        <div slot="title">
          <el-row :gutter="20">
            <el-col :span="3" class="common">{{item.name}}</el-col>
            <el-col :span="5" class="common" align="center" style="padding-right: 5%;">
              <span v-if="item.jdTime">{{item.jdTime}}</span>
              <span v-else>无</span>
            </el-col>
            <el-col :span="12" class="common" align="center" style="padding-right: 2%;">
              <span v-if="item.operList && item.operList.length > 0">
                <el-tooltip class="item" effect="dark" :content="item.userName" placement="top">
                  <span>{{item.userName}}</span>
                </el-tooltip>
              </span>
              <span v-else>无</span>
            </el-col>
            <el-col :span="4" class="common" align="center" style="padding-right: 1%;">
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

    <el-dialog title="节点日志" :visible.sync="dialogJdShow" :modal="false" width="40%">
      <fromItem
        ref="myForm"
        style="height: 130px;"
        :obj="this"
        :layerid="layerid"
        :fromItemList="fromItemList"
        :fromValiData="fromValiData"
        :btnLoading="btnLoading"
        :rules="rules"
        type="not">
      </fromItem>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogJdShow = false">取 消</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit('fromValiData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getSysQueryDict} from '../../../api/common.js'
import {getReportJdQueryTaskJdShow, getReportTaskLogQueryPageData, getReportTaskLogAdd} from '../../../api/jcxxgl/nodeDefend.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      dialogJdShow: false,
      fromValiData: {},
      rules: {
        text: [
          { required: true, message: '请填写备注内容', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '节点名称', prop: 'jdNoName', value: '', type: 'input', disabled: true},
        {label: '备注内容', prop: 'text', value: '', type: 'input', isRqd: true}
      ],

      assembleData: [],
      active: 0
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs.myForm.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.fromValiData.reportNo = this.params.reportNo
          getReportTaskLogAdd(this.fromValiData).then(res => {
            this.getNodeData()
            this.$share.message()
            this.btnLoading = false
            this.dialogJdShow = false
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },

    getListData (jdData, logData) {
      let ids = {}
      ids.reportNo = this.params.reportNo
      getReportJdQueryTaskJdShow(ids).then(res => {
        jdData.forEach(xdd => {
          xdd.logData = []
          xdd.isLogShow = false

          if (res.result && res.result.length > 0) {
            this.active = res.result.length - 1
            res.result.forEach(arc => {
              if (xdd.id === arc.jdNo) {
                xdd.jdNo = arc.jdNo
                xdd.isNowStep = arc.isNowStep
                xdd.jdTime = arc.jdTime
                xdd.operList = arc.operList
              }
              if (xdd.isNowStep === '1') {
                this.fromValiData.jdNo = xdd.jdNo
                this.fromValiData.jdNoName = xdd.name
              }
            })
          }

          if (logData && logData.length > 0) {
            logData.forEach(arc => {
              if (xdd.id === arc.jdNo) {
                xdd.logData.push(arc)
              }
            })
          }
        })
        this.assembleData = jdData
        this.assembleData.forEach(xdd => {
          xdd.userName = ''
          if (xdd.operList && xdd.operList.length > 0) {
            let userData = xdd.operList
            userData.forEach(arc => {
              if (arc.operName !== null && arc.operMobile !== null) {
                if (arc.type !== null && arc.type !== '') {
                  xdd.userName = xdd.userName + arc.type + '-' + arc.operName + '(' + arc.operMobile + ')' + '、'
                } else {
                  xdd.userName += arc.operName + '(' + arc.operMobile + ')' + '、'
                }
              }
            })
            xdd.userName = xdd.userName.substring(0, xdd.userName.length - 1)
          }
        })
      })
    },
    getNodeData () {
      let ids = {}
      ids.pageNow = 1
      ids.pageSize = 99999
      ids.reportNo = this.params.reportNo
      getSysQueryDict({'type': 'RWJD'}).then(res => {
        getReportTaskLogQueryPageData(ids).then(res2 => {
          this.getListData(res.result, res2.result.pageList)
        })
      })
    }
  },
  mounted () {
    this.getNodeData()
  },
  created () {

  }
}
</script>

<style lang="scss">
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
