<template>
  <div class="operate-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="全部反馈" name="first">
        <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
          <el-form-item label="问题:" prop="theme">
            <el-input v-model="fromData.theme" placeholder="请输入需要查询的问题标题" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset()">重置</el-button>
            <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
            <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" style="height:40px" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
          </el-form-item>
        </el-form>
        <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :isPage="false" :button="button" :loading="loading"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="未解决反馈" name="second">
        <tableItem :obj="this" :tableData="tableData1" :isSelection="false" :tableHeader="tableHeader" :isPage="false" :loading="loading"></tableItem>
      </el-tab-pane>
      <el-tab-pane label="已解决反馈" name="third">
        <tableItem :obj="this" :tableData="tableData2" :isSelection="false" :tableHeader="tableHeader" :isPage="false" :loading="loading"></tableItem>
      </el-tab-pane>
    </el-tabs>
    <el-input placeholder="问题搜索，按回车键查询" suffix-icon="el-icon-search" v-model="fromData.theme" class="input" @keyup.enter.native="doSearch">
    </el-input>

    <!-- 弹窗部分 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible" :append-to-body="true">
      <el-form label-width="100px" :rules="rules" :model="fromValiData" ref="fromValiData">
        <el-form-item label="问题种类：" prop="type">
          <el-radio v-model="fromValiData.type" v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-radio>
        </el-form-item>
        <el-form-item label="问题标题：" prop="theme">
          <el-input v-model="fromValiData.theme" placeholder="请输入问题标题"></el-input>
        </el-form-item>
        <el-form-item label="正文内容：" prop="mainBody">
          <Editor v-model="fromValiData.mainBody" class="text" v-if="dialogFormVisible" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel()">取 消</el-button>
        <el-button type="primary" @click="onSubmit('fromValiData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Editor from './editor.vue'
import manage from './mange.vue'
import content from './content.vue'
import {
  getJournalismQueryPageData,
  getJournalismAddOrModify,
  getJournalismDelJournalismIds
} from '../../api/client/feedback.js'
export default {
  components: {
    Editor
  },

  data() {
    return {
      loading: false,
      activeName: 'first',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      input: '',
      multipleSelection: [],

      rules: {
        type: [{ required: true, message: '请选择问题种类', tigger: 'blur' }],
        theme: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        mainBody: [
          { required: true, message: '请输入正文内容', trigger: 'blur' }
        ]
      },
      option: [
        { label: '建议', value: '1' },
        { label: '咨询', value: '2' },
        { label: '吐槽', value: '3' },
        { label: '其他', value: '4' }
      ],
      fromValiData: {
        pageSize: 99,
        pageNow: 1,
        theme: '',
        type: '1'
      },
      fromData: {
        pageSize: 99,
        pageNow: 1
      },
      tableData: [],
      tableData1: [],
      tableData2: [],

      tableHeader: [
        {
          prop: 'theme',
          label: '标题',
          width: 100,
          type: 'view'
        },
        {
          prop: 'type',
          label: '类型',
          width: 50
        },
        {
          prop: 'stateName',
          label: '状态',
          width: 50
        },
        {
          prop: 'createUserName',
          label: '反馈人',
          width: 80
        },
        {
          prop: 'createTime',
          label: '反馈时间',
          width: 110
        },
        {
          prop: 'feedBack',
          label: '处理结果',
          width: 90
        }
      ],
      button: {
        width: 100,
        buttonList: [
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (Number(this.$store.getters.userInfo.lev) === 10) {
                return true
              }
            }
          },
          {
            name: '处理',
            type: 'primary',
            click: 'handleManage',
            condition: params => {
              if (
                Number(this.$store.getters.userInfo.lev) === 10 &&
                params.state === '1'
              ) {
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
      getJournalismQueryPageData(this.fromData)
        .then(res => {
          res.result.pageList.forEach(item => {
            if (item.mainBody) {
              item.content = item.mainBody.replace(
                new RegExp('<(S*?)[^>]*>.*?|<.*? />|&nbsp; ', 'g'),
                ''
              )
            }
          })
          res.result.pageList.forEach(item => {
            if (item.state === '1') {
              item.stateName = '待处理'
              item.feedBack = '暂无处理结果'
            } else if (item.state === '2') {
              item.stateName = '已处理'
            }
          })
          this.tableData = res.result.pageList
          this.tableData1 = res.result.pageList.filter(item => {
            return item.state === '1'
          })
          this.tableData2 = res.result.pageList.filter(item => {
            return item.state === '2'
          })
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    handleClick(tab, event) { },
    validateEditor() {
      this.$refs.formRef.validateField('mainBody', err => {
        console.log(err);
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.fromValiData.mobile = this.$store.getters.userInfo.mobile
          this.fromValiData.state = '1'
          getJournalismAddOrModify(this.fromValiData)
            .then(res => {
              this.fromValiData.type = ''
              this.fromValiData.theme = ''
              this.fromValiData.state = ''
              this.fromValiData.mainBody = ''
              this.fromValiData.mobile = ''

              this.getListData()
              this.$share.message()
              this.dialogFormVisible = false
            })
            .catch(err => {
              this.$message.error(err.message)
              this.loading = false
            })
        }
      })
    },
    onCancel() {
      this.dialogFormVisible = false
      this.fromValiData.type = ''
      this.fromValiData.theme = ''
      this.fromValiData.state = ''
      this.fromValiData.mobile = ''
    },

    doReset() {
      this.fromData.theme = ''
      delete this.fromData.theme
      this.getListData()
    },
    doSearch() {
      this.getListData()
    },
    handleManage(params) {
      this.$layer.iframe({
        content: {
          content: manage, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '处理',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function () {
          getJournalismDelJournalismIds({ ids: row.id }).then(res => {
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            that.getListData()
          })
        }
      })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: content, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.Max,
        title: '内容详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    }
  },
  mounted() {
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang='scss'>
.input {
  position: absolute;
  width: 250px;
  top: 52px;
  right: 50px;
  z-index: 999;
}
::v-deep .el-dialog {
  border-radius: 15px;
}
::v-deep .el-dialog__header {
  border-radius: 15px;
  background-color: #f8f8f8;
}
.dialog-footer {
  text-align: center;
}
</style>
