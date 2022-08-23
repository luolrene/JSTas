<!-- 收样任务管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :button="button" :loading="loading" :isSelection="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import planList from './plan_list.vue'
import sampleList from './sample_list.vue'
import sampleListDetail from './sample_list_detail.vue'
import upload from '../../consult/task/upload.vue'
import {getChangeContCaseErrorSy} from '../../../api/sampling/majorTask.js'
import {getSubSampQueryTaskPage, getSubSampAddOrModifyTask, getSubSampCallBack} from '../../../api/contract/task.js'
import {getContractQueryContractById} from '../../../api/contract/msg.js'
export default {
  components: {},
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        proName: '',
        custName: '',
        reportNo: '',
        status: '1'
      },
      fromData: [
        { type: 'input', prop: 'proName', label: '项目名称' },
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'reportNo', label: '报告编号' },
        {
          type: 'select',
          prop: 'status',
          label: '任务状态',
          data: [
            { id: '0', name: '草稿' },
            { id: '1', name: '收样中' },
            { id: '2', name: '收样完成' },
            { id: '3', name: '退回' }
          ]
        },
        {
          type: 'select',
          prop: 'type',
          label: '任务类型',
          data: [
            { id: '1', name: '采样' },
            { id: '2', name: '送样' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'proName',
          label: '项目名称',
          type: 'view',
          width: 180,
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          }
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          width: 120
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 160
        },
        {
          prop: 'typeName',
          label: '任务类型',
          width: 90
        },
        {
          prop: 'statusName',
          label: '任务状态',
          width: 90
        }
      ],
      button: {
        width: 470,
        buttonList: [
          {
            name: '任务撤回',
            type: 'primary',
            click: 'handleRecall',
            condition: function(params) {
              if (params.status === '2') {
                return true
              }
            }
          }, {
            name: '附件上传',
            type: 'primary',
            click: 'handleUpload',
            condition: params => {
              if (params.type === '2') {
                return true
              }
            }
          }, {
            name: '方案报错',
            type: 'primary',
            click: 'handleErrors',
            condition: function(params) {
              if (params.status === '1' && params.contStatus !== '07' && params.type === '2') {
                return true
              }
            }
          }, {
            name: '方案确认',
            type: 'primary',
            click: 'handleConfirm',
            condition: function(params) {
              if (params.status === '1' && params.funIsOk === '0') {
                return true
              }
            }
          }, {
            name: '任务单下载',
            type: 'primary',
            click: 'handleTaskFile'
          }, {
            name: '样品管理',
            type: 'primary',
            click: 'handleSample'
          }, {
            name: '退回',
            type: 'primary',
            click: 'handleReturn',
            condition: function(params) {
              if (params.status === '1' && params.type === '1') {
                return true
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSubSampQueryTaskPage(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
          switch (xdd.status) {
            case '0':
              xdd.statusName = '草稿'
              break
            case '1':
              xdd.statusName = '收样中'
              break
            case '2':
              xdd.statusName = '收样完成'
              break
            case '3':
              xdd.statusName = '退回'
              break
          }
          switch (xdd.type) {
            case '1':
              xdd.typeName = '采样'
              break
            case '2':
              xdd.typeName = '送样'
              break
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
    handleRecall(params) {
      this.$share.confirm({
        message: '此操作将撤回收样任务, 是否继续?',
        confirm: () => {
          getSubSampCallBack(params).then(res => {
            this.getListData()
            this.$share.message('撤回成功', 'success')
          })
        }
      })
    },
    handleTaskFile(params) {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/samplingTask/downTaskPaper?reportNo=' +
          params.reportNo +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    handleErrors(params) {
      let that = this
      this.$prompt('请输入修改明细', '报错处理', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = {}
        ids.cahngeDetail = value
        ids.reportNo = params.reportNo
        ids.contId = params.contId
        getChangeContCaseErrorSy(ids).then(res => {
          that.getListData()
          that.$share.message('处理成功', 'success')
        })
      })
    },
    handleConfirm(params) {
      this.$layer.iframe({
        content: {
          content: planList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '方案列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleUpload (params) {
      this.$layer.iframe({
        content: {
          content: upload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: params.id,
            delType: '',
            format: ['jpg', 'jpeg', 'png'],
            accept: '.jpg,.jpeg,.png'
          } // props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '附件上传',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSample(params) {
      if (params.status === '1' && params.funIsOk === '1') {
        this.$layer.iframe({
          content: {
            content: sampleList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Max,
          title: '样品列表',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: sampleListDetail, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Max,
          title: '样品列表',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleCollection(params) {
      this.$share.confirm({
        message: '此操作将收样样品, 是否继续?',
        confirm: () => {
          let ids = {...params}
          ids.status = '2'
          getSubSampAddOrModifyTask(ids).then(res => {
            this.$share.message('收样成功')
            this.getListData()
          })
        }
      })
    },
    handleReturn(ids) {
      let that = this
      this.$prompt('请输入退回原因', '退回', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        ids.status = '3'
        ids.returnReason = value
        getSubSampAddOrModifyTask(ids).then(res => {
          that.getListData()
          that.$share.message('退回成功', 'success')
        })
      })
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
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
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
