<template>
  <div class="">
    <el-divider>未标记</el-divider>
    <tableItem
    :obj="this"
    :tableData="tableData_A"
    :tableHeader="tableHeader_A"
    :button="button"
    :loading="loading"
    :isPage="false"
    :isSelection="false"></tableItem>

    <el-divider><span style="color: red;">已标记</span></el-divider>
    <tableItem
    :obj="this"
    :tableData="tableData_B"
    :tableHeader="tableHeader_B"
    :button="button"
    :loading="loading"
    :isPage="false"
    :isSelection="false"></tableItem>
  </div>
</template>

<script>
import preview from '../../common/preview.vue'
import {getOriginalCyQueryFileList, getOriginalCySignFile} from '../../../api/check/checkTask.js'
export default {
  props: {
    params: Object
  },
  data () {
    return {
      loading: false,
      fromValiData: {},
      tableData_A: [],
      tableData_B: [],
      tableHeader_A: [{
        prop: 'loadName',
        label: '原始记录名称',
        width: 240
      }, {
        prop: 'fileNo',
        label: '编号',
        width: 120
      }, {
        prop: 'operName',
        label: '上传人/电话号码',
        width: 140
      }, {
        prop: 'loadTime',
        label: '上传时间',
        width: 120
      }],
      tableHeader_B: [{
        prop: 'loadName',
        label: '原始记录名称',
        width: 240
      }, {
        prop: 'fileNo',
        label: '编号',
        width: 120
      }, {
        prop: 'returnReason',
        label: '标记描述',
        width: 120,
        condition: params => {
          return 'red'
        }
      }, {
        prop: 'operName',
        label: '上传人/电话号码',
        width: 140
      }, {
        prop: 'loadTime',
        label: '上传时间',
        width: 120
      }],
      button: {
        width: 250,
        buttonList: [
          {name: '预览',
            type: 'primary',
            click: 'handlePreview'
          },
          {name: '下载',
            type: 'primary',
            click: 'handleDownLoad'
          },
          {name: '标记',
            type: 'primary',
            click: 'handleSignFile',
            condition: function(params) {
              if (params.sign === '0') {
                return true
              }
            }
          }
        ]
      },
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    getListData_A() {
      this.loading = true
      let ids = {...this.fromValiData}
      ids.sign = '0'
      ids.status = '1,2,3,4'
      getOriginalCyQueryFileList(ids).then(res => {
        this.tableData_A = res.result
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getListData_B() {
      this.loading = true
      let ids = {...this.fromValiData}
      ids.sign = '1'
      getOriginalCyQueryFileList(ids).then(res => {
        this.tableData_B = res.result
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handlePreview(params) {
      this.$layer.iframe({
        content: {
          content: preview, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            Interface: '/originalCy/download'
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '预览',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDownLoad(params) {
      window.open(this.host + '/originalCy/download?' + 'fileId=' + params.id + '&token=' + this.$store.getters.userInfo.token)
    },
    handleSignFile(params) {
      let that = this
      this.$prompt('请输入描述', '标记', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea'
      }).then(({ value }) => {
        let ids = {...params}
        ids.returnReason = value
        ids.sign = '1'
        getOriginalCySignFile(ids).then(res => {
          that.getListData_A()
          that.getListData_B()
          that.$share.message('标记成功', 'success')
        })
      })
    }
  },
  mounted () {
    this.getListData_A()
    this.getListData_B()
  },
  created () {
    this.fromValiData.reportNo = this.params.reportNo
  }
}
</script>

<style scoped lang="scss">

</style>
