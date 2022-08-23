<!-- 样品列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
        <el-form-item label="批量录入采样时间:">
          <el-input placeholder="请先勾选样品" disabled v-if="multipleSelection.length === 0"></el-input>
          <el-date-picker
            v-else
            v-model="cyTimeBatchData"
            type="date"
            :clearable="false"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            placeholder="选择日期"
            @change="getChangeCyTime"
            style="width: 160px">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon="el-icon-edit-outline"
          @click="handleBatchEdit()"
          :disabled="params.contStatus === '07'">批量保存</el-button>
        <el-button
          v-if="params.status !== '2'"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon=""
          @click="handleBatchCollect()"
          :disabled="params.contStatus === '07'"
          :loading="collectLoading">收样</el-button>
        <el-button
          v-if="fileList.length > 0"
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon=""
          @click="getDownload()">交接单下载</el-button>
        <el-button
          type="primary"
          :size="$layer_Size.buttonSize"
          class="default-btn"
          icon=""
          @click="handleExport()"
          :disabled="params.contStatus === '07'">样品导出</el-button>
        <el-upload
          class="upload-demo"
          style="display: inline-block;margin:0 10px"
          :action="importControlAction"
          :headers="headers"
          :show-file-list="false"
          :on-success="onSuccess"
          :on-error="onError"
          :limit="30">
          <el-button
            type="primary"
            :size="$layer_Size.buttonSize"
            :disabled="params.contStatus === '07'"
            class="default-btn">导入修改</el-button>
        </el-upload>
      </fromSearch>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    :pageSize="50"
    customHeight="450"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { getFileQueryFileList } from '../../../api/file.js'
import { getSamplingTaskSaveSampNoList } from '../../../api/sampling/sampTask.js'
import {
  getSubSampQuerySampPage,
  getSubSampAddOrModifyTask
} from '@/api/contract/task.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,
      collectLoading: false,

      fromValiData: {
        pageSize: 50,
        pageNow: 1
      },
      fromData: [],
      tableData: [],
      tableHeader: [
        {
          prop: 'custSampNo',
          label: '客户样品编号',
          type: 'input',
          placeholder: '客户样品编号',
          width: 120
        },
        {
          prop: 'show',
          label: '样品表现',
          type: 'input',
          placeholder: '样品表现',
          width: 120
        },
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 180
        },
        {
          prop: 'factSampLxName',
          type: 'input',
          label: '样品类型',
          width: 120
        },
        {
          prop: 'targetName',
          label: '检测指标',
          width: 220
        },
        {
          prop: 'cyTime',
          label: '采样时间',
          type: 'date',
          placeholder: '采样时间',
          width: 160
        },
        {
          prop: 'syDate',
          label: '收样时间',
          type: 'date',
          placeholder: '收样时间',
          width: 160
        }
      ],
      button: {
        width: 120,
        buttonList: []
      },
      multipleSelection: [],
      cyTimeBatchData: '',
      fileList: [],
      importControlAction:
        process.env.BASE_API + process.env.JS_Server + '/subSamp/loadin',
      headers: { token: this.$store.getters.userInfo.token }
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.subSampTaskId = this.params.id
      getSubSampQuerySampPage(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.loading = false
      })
    },
    handleBatchEdit() {
      let ids = []
      this.tableData.some((xdd, index) => {
        let params = JSON.parse(JSON.stringify(xdd))
        params.workType = '2' // 1新增 2修改
        ids.push(params)
      })
      getSamplingTaskSaveSampNoList(ids).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    getChangeCyTime(e) {
      this.multipleSelection.forEach(xdd => {
        xdd.cyTime = e
      })
    },
    handleBatchCollect() {
      this.$share.confirm({
        message: '此操作将收样全部样品, 是否继续?',
        confirm: () => {
          let ids = { ...this.params }
          ids.status = '2'
          this.collectLoading = true
          getSubSampAddOrModifyTask(ids)
            .then(res => {
              this.$share.message('收样成功')
              this.$parent.getListData()
              this.$layer.close(this.layerid)
              this.collectLoading = false
            })
            .catch(err => {
              console.log(err);
              this.collectLoading = false
            })
        }
      })
    },
    getDownload() {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/file/download?fileId=' +
          this.fileList[0].id +
          '&type=1' +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    handleExport() {
      window.open(
        process.env.BASE_API +
          process.env.JS_Server +
          '/subSamp/loadOut?subSampTaskId=' +
          this.params.id +
          '&token=' +
          this.$store.getters.userInfo.token
      )
    },
    getFileListData() {
      getFileQueryFileList({ id: this.params.id, type: '1' }).then(res => {
        this.fileList = res.result
      })
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    onSuccess(response, file, fileList) {
      this.$message({
        message: response.result,
        type: 'success',
        duration: 0,
        showClose: true
      })
      this.getListData()
    },
    onError() {
      this.$share.message('导入失败', '请联系管理员')
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
    this.getFileListData()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
