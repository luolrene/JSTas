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
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="params.contStatus === '07'">批量保存</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="" @click="handleBatchCollect()" :disabled="params.contStatus === '07'" :loading="collectLoading">批量收样</el-button>
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
    isSelectable
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {
  getSamplingTaskQuerySampNoPageListByTaskId,
  getSamplingTaskSaveSampNoList
} from '../../../api/sampling/sampTask.js'
import { getSamplingTaskChargeSampNoList } from '../../../api/check/collectTask.js'
export default {
  props: {
    params: Object,
    isScene: String,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,
      collectLoading: false,

      fromValiData: {
        pageSize: 50,
        pageNow: 1,
        status: '2'
      },
      fromData: [
        {
          type: 'select',
          prop: 'status',
          label: '样品状态',
          data: [
            { id: '', name: '全部' },
            { id: '0', name: '进行中' },
            { id: '1', name: '已收样' },
            { id: '2', name: '已交样' }
          ]
        }
      ],
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
          width: 200
        },
        {
          prop: 'targetName',
          label: '检测指标',
          width: 220
        },
        {
          prop: 'custPointNo',
          label: '点位名称',
          width: 90
        },
        {
          prop: 'cyTime',
          label: '采样时间',
          type: 'date',
          placeholder: '采样时间',
          width: 160
        },
        {
          prop: 'statusName',
          label: '状态',
          width: 90
        },
        {
          prop: 'isZkName',
          label: '是否质控',
          width: 100
        },
        {
          prop: 'sampLxName',
          label: '样品类型',
          width: 90
        },
        {
          prop: 'pointName',
          label: '点位编号',
          width: 140
        }
      ],
      button: {
        width: 120,
        buttonList: []
      },
      multipleSelection: [],
      cyTimeBatchData: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.isScene = this.isScene
      this.fromValiData.contId = this.params.contId
      this.fromValiData.sampTaskId = this.params.id
      getSamplingTaskQuerySampNoPageListByTaskId(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.status) {
              case '0':
                xdd.statusName = '进行中'
                break
              case '1':
                xdd.statusName = '已收样'
                break
              case '2':
                xdd.statusName = '已交样'
                break
            }
            xdd.isZkName = xdd.isZk === '0' ? '否' : '是'
          })
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
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
      if (this.multipleSelection.length === 0) {
        this.$share.message('请勾选要收样的列表数据', 'warning')
        return
      }
      let ids = { sampNos: '' }
      ids.sampTaskId = this.params.id
      this.multipleSelection.forEach(xdd => {
        ids.sampNos += xdd.sampNo + ','
      })
      ids.sampNos = ids.sampNos.substring(0, ids.sampNos.length - 1)
      this.collectLoading = true
      getSamplingTaskChargeSampNoList(ids)
        .then(res => {
          this.getListData()
          this.$parent.getListData()
          this.$share.message()
          this.collectLoading = false
        })
        .catch(err => {
          console.log(err);
          this.collectLoading = false
        })
    },
    getSelectable(row, index) {
      if (row.status === '2') {
        return true
      } else {
        return false
      }
    },
    doSearch() {
      this.fromValiData.pageNow = 1
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
