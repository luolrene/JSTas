<template>
  <div class="pc-container nodeShowList" style="width: 100%;">
    <div style="text-align: left;margin-bottom: 10px;">
      <el-button type="primary" @click="addLog" size="mini">添加节点日志</el-button>
      <span style="font-size: 14px;color: #FF798D;">(点击节点设置为当前节点)</span>
    </div>
    <el-row :gutter="20" class="header">
      <el-col :span="5" style="padding-left: 40px;">任务节点</el-col>
      <el-col :span="7" align="center">任务时间</el-col>
      <el-col :span="12" align="center">备注信息</el-col>
    </el-row>
    <el-steps direction="vertical" :space="60" :active="active"  style="padding: 0 20px;height: 450px;">
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
import {getConSultGetJdInfo, getConSultSetNowJd} from '../../../api/consult/task.js'
import {getReportTaskLogQueryPageData, getReportTaskLogAdd} from '../../../api/jcxxgl/nodeDefend.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      dialogJdShow: false,
      fromValiData: {
        text: ''
      },
      rules: {
        text: [
          { required: true, message: '请填写备注内容', trigger: 'blur' }
        ]
      },
      fromItemList: [
        {label: '节点名称', prop: 'jdName', value: '', type: 'input', disabled: true},
        {label: '备注内容', prop: 'text', value: '', type: 'input', isRqd: true}
      ],

      assembleData: [],
      active: -1
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs.myForm.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.fromValiData.reportNo = this.params.contId
          getReportTaskLogAdd(this.fromValiData).then(res => {
            this.getlistData()
            this.$share.message()
            this.btnLoading = false
            this.dialogJdShow = false
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },
    addLog () {
      if (this.active === -1) {
        this.$share.message('请设置当前节点', 'warning')
        return
      }
      this.fromValiData.text = ''
      this.dialogJdShow = true
    },
    clickNode (params) {
      this.$confirm('此操作将设置为当前节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        let ids = {}
        ids.contId = this.params.contId
        ids.nowJd = params.jdNo
        getConSultSetNowJd(ids).then(res => {
          this.getlistData()
          this.$share.message('设置成功')
        })
      })
    },
    getlistData () {
      let ids = {}
      ids.contId = this.params.contId
      getConSultGetJdInfo(ids).then(res => {
        let params = {}
        params.pageNow = 1
        params.pageSize = 99999
        params.reportNo = this.params.contId
        getReportTaskLogQueryPageData(params).then(res2 => {
          let logData = res2.result.pageList

          res.result.forEach((xdd, index) => {
            xdd.logData = []
            xdd.isLogShow = false
            if (xdd.isNowStep === '1') {
              this.active = index
              this.fromValiData.jdName = xdd.jdName
              this.fromValiData.jdNo = xdd.jdNo
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
    this.getlistData()
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
