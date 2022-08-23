<!-- 报告编辑 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-s-custom" @click="doInputPerson()">人员分配</el-button>
      <!-- <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh-left" @click="handleBatchReturn()" v-if="getIsReturn">批量退回</el-button> -->
    </fromSearch>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :button="button"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :pageSize="50"
    @handleSizeChange="handleSizeChange">
      <template v-slot:button="slotParams">
        <el-upload
          v-if="slotParams.scope.row.status==='3' && slotParams.scope.row.isLoadQR !== '1'"
          class="upload-demo"
          accept=".jpg,.jpeg,.png"
          :action="uploadAction"
          :headers="headers"
          :on-success="onSuccess"
          :on-error="onError"
          :data="{reportNo:slotParams.scope.row.reportNo}"
          :show-file-list="false"
          :limit="1"
          style="display: flex;align-items: center;justify-content: center;">
          <el-button
            size="mini"
            type="primary"
            plain
            >上传二维码</el-button>
          <span slot="tip" class="el-upload__tip" style="margin-top: 0;color: #999999;margin-left: 5px;">(限上传一次)</span>
        </el-upload>
      </template>
    </tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import details2 from './details.vue'
import generateList from './generate_list.vue'
import edit from './edit.vue'
import returnReport from './return.vue'
import userList from './user-list.vue'
import inputPerson from '../../common/input_person.vue'
import {getReportEditQueryPageList, getReportEditCommitToCheck, getReportEditModifyData} from '../../../api/report/edit.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  components: {

  },
  data () {
    return {
      loading: false,

      fromValiData: {
        pageSize: 50,
        pageNow: 1,
        status: '0', // 0待编辑 1_1一审审核中 1_2二审审核中 2退回 3审核通过 4变更审核
        isCheck: '0'
      },
      fromData: [
        {type: 'input', prop: 'reportNo', label: '报告编号'},
        {type: 'select',
          prop: 'status',
          label: '状态',
          data: [
            {id: '0', name: '待编辑'},
            {id: '1_1', name: '一审审核中'},
            {id: '1_2', name: '二审审核中'},
            {id: '2', name: '退回'},
            {id: '3', name: '审核通过'},
            {id: '4', name: '变更审核'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'proName',
        label: '项目名称',
        type: 'view',
        width: 180,
        condition: function (params) {
          if (params.taskLev === '2') {
            return '#E6A23C'
          } else if (params.taskLev === '3') {
            return 'red'
          }
        }
      }, {
        prop: 'reportNo',
        label: '报告编号',
        type: 'view2',
        width: 90
      }, {
        prop: 'custName',
        label: '客户名称',
        width: 90
      }, {
        prop: 'firstCheckName',
        label: '一审审核人员',
        width: 110
      }, {
        prop: 'secondCheckName',
        label: '二审审核人员',
        width: 110
      }, {
        prop: 'operName',
        label: '当前处理人',
        width: 120
      }, {
        prop: 'term',
        label: '报告期限',
        width: 110
      }, {
        prop: 'statusName',
        label: '状态',
        width: 90
      }, {
        prop: 'startTime',
        label: '检测完成时间',
        width: 120
      }, {
        prop: 'xcEndTime',
        label: '现场完成时间',
        width: 120
      }],
      button: {
        width: 330,
        buttonList: [
          {name: '报告生成',
            type: 'primary',
            click: 'handleGenerate',
            condition: (params) => {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '提交审核',
            type: 'primary',
            click: 'handleReview',
            condition: (params) => {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '附件管理',
            type: 'primary',
            click: 'handleEdit',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          },
          {name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: function (params) {
              if (params.status === '0' || params.status === '2') {
                return true
              }
            }
          }
        ]
      },

      multipleSelection: [],
      tempParams: {},
      slotParams:{},
      uploadAction: process.env.BASE_API + process.env.JS_Server + '/reportEdit/uploadQRcode',
      headers: { token: this.$store.getters.userInfo.token }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getReportEditQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '待编辑'
              break
            case '1_1':
              xdd.statusName = '一审审核中'
              break
            case '1_2':
              xdd.statusName = '二审审核中'
              break
            case '2':
              xdd.statusName = '退回'
              break
            case '3':
              xdd.statusName = '审核通过'
              break
            case '4':
              xdd.statusName = '变更审核'
              break
          }
          if (xdd.returnReason !== null && xdd.returnReason !== '') {
            xdd.statusName = xdd.statusName + '( ' + xdd.returnReason + ' )'
          }
        })
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    onSuccess(response, file, fileList) {
      this.$share.message('上传成功')
      this.getListData()
    },
    onError() {
      this.$share.message('上传失败', '请联系管理员')
    },
    handleGenerate(params) {
      this.$layer.iframe({
        content: {
          content: generateList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: this.$layer_Size.Normal,
        title: '报告模板列表',
        maxmin: true,
        shadeClose: false
      })
    },
    doInputPerson () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选报告任务', 'warning')
        return
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            isFenp: '1' // 只能看到自己组及以下的人
          }// props
        },
        area: this.$layer_Size.Max,
        title: '人员列表',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson (params) {
      return new Promise((resolve, reject) => {
        let ids = {id: ''}
        this.multipleSelection.forEach(xdd => {
          ids.id += xdd.id + ','
        })
        ids.oper = params.mobile
        ids.operName = params.name
        ids.id = ids.id.substring(0, ids.id.length - 1)
        getReportEditModifyData(ids).then(res => {
          this.getListData()
          resolve(true)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleReturn(params) {
      this.$layer.iframe({
        content: {
          content: returnReport, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params.id,
            returnReason: params.returnReason
          }// props
        },
        area: ['600px', '400px'],
        title: '报告退回',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchReturn () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要退回得报告', 'warning')
        return
      }
      let params = ''
      this.multipleSelection.forEach(xdd => {
        params += xdd.id + ','
      })
      params = params.substring(0, params.length - 1)

      this.$layer.iframe({
        content: {
          content: returnReport, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['500px', '300px'],
        title: '报告退回',
        maxmin: true,
        shadeClose: false
      })
    },
    getUserData (params, layerid) {
      this.tempParams.firstCheck = params.mobile
      this.tempParams.firstCheckName = params.name
      getReportEditCommitToCheck(this.tempParams).then(res => {
        this.$share.message('提交成功')
        this.getListData()
        this.$layer.close(layerid)
      })
    },
    doSearch () {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset (formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            dictData: this.positionData
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails (params) {
      getContractQueryContractById({contId: params.contId}).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            }// props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleDetails2 (params) {
      this.$layer.iframe({
        content: {
          content: details2, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['900px', this.$layer_Size.layerSelfHeight],
        title: '查看详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleReview (params, title) {
      this.tempParams = params
      this.$confirm('此操作将提交审核, 是否选择一审人员', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        distinguishCancelAndClose: true,
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$layer.iframe({
          content: {
            content: userList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              checkType: '1'
            }// props
          },
          area: this.$layer_Size.Max,
          title: '添加',
          maxmin: true,
          shadeClose: false
        })
      }).catch(err => {
        if (err === 'cancel') {
          getReportEditCommitToCheck(this.tempParams).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功'
            })
            this.getListData()
          })
        }
      })
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
