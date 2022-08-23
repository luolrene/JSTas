<!-- 样品编号列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <el-form-item>
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
            :disabled="addParams.contStatus === '07'"
            style="width: 160px">
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd_point()" :disabled="addParams.contStatus === '07'">点位质控</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-edit-outline" @click="handleBatchEdit()" :disabled="addParams.contStatus === '07'">批量保存</el-button>
        <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" :disabled="addParams.contStatus === '07'">批量删除</el-button>
      </el-form-item>
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :button="button"
    :loading="loading"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import sampleAdd from './sample_add.vue'
import {
  getSamplingTaskQuerySampNoPage,
  getSamplingTaskDelSampNo,
  getSamplingTaskSaveSampNoList
} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    params: Object,
    addParams: Object,
    layerid: ''
  },
  components: {},
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 210
        },
        {
          prop: 'sampLb',
          label: '样品类别',
          width: 120
        },
        {
          prop: 'sampLx',
          label: '样品类型',
          width: 120
        },
        {
          prop: 'pointName',
          label: '点位名称',
          width: 120
        },
        {
          prop: 'pointNo',
          label: '点位编号',
          width: 120
        },
        //    {
        //      prop: 'custPointNo',
        //      label: '点位编号',
        //      type: 'input',
        //      placeholder: '点位编号',
        //      width: 140
        //    }, {
        //      prop: 'cyTime',
        //      label: '采样时间',
        //      type: 'date',
        //      placeholder: '采样时间',
        //      width: 160
        //    }, {
        //      prop: 'jd',
        //      label: '经度',
        //      type: 'input',
        //      placeholder: '经度',
        //      width: 120
        //    }, {
        //      prop: 'wd',
        //      label: '纬度',
        //      type: 'input',
        //      placeholder: '纬度',
        //      width: 120
        //    }, {
        //      prop: 'cysd',
        //      label: '采样深度(m)',
        //      type: 'input',
        //      placeholder: '采样深度',
        //      width: 120
        //    }, {
        //      prop: 'useTo',
        //      label: '利用现状',
        //      type: 'input',
        //      placeholder: '利用现状',
        //      width: 120
        //    },
        // {
        //      prop: 'show',
        //      label: '表现',
        //      type: 'input',
        //      placeholder: '表现',
        //      width: 100
        //    },
        {
          prop: 'statusName',
          label: '状态',
          width: 70
        },
        {
          prop: 'isZkName',
          label: '是否质控',
          width: 110
        }
      ],
      button: {
        width: 240,
        buttonList: [
          {
            name: '样品质控',
            type: 'primary',
            click: 'handleAdd_sample',
            condition: function(params) {
              if (params.isZk === '0') {
                return true
              }
            }
          },
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      multipleSelection: [],
      cyTimeBatchData: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      this.fromValiData.sampPoint = this.params.id
      getSamplingTaskQuerySampNoPage(this.fromValiData)
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
    handleAdd_point() {
      this.$layer.iframe({
        content: {
          content: sampleAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: this.params,
            type: '1'
          } // props
        },
        area: this.$layer_Size.Min,
        title: '添加点位质控',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd_sample(params) {
      this.$layer.iframe({
        content: {
          content: sampleAdd, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            type: '2'
          } // props
        },
        area: this.$layer_Size.Min,
        title: '添加样品质控',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchEdit() {
      let ids = []
      let test = true
      let num = 0
      this.tableData.some((xdd, index) => {
        let params = JSON.parse(JSON.stringify(xdd))
        if (params.cyTime === null || params.cyTime === '') {
          num = index + 1
          test = false
          return true
        }
        params.workType = '2' // 1新增 2修改
        ids.push(params)
      })
      if (!test) {
        this.$message({
          message: '第' + num + '行，请选择采样时间',
          type: 'warning'
        })
        return
      }
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
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getSamplingTaskDelSampNo({ ids: row.sampNo }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { sampNo: '' }
      this.multipleSelection.forEach(xdd => {
        ids.sampNo += xdd.sampNo + ','
      })
      ids.sampNo = ids.sampNo.substring(0, ids.sampNo.length - 1)
      this.handleDelete(ids)
    }
  },
  mounted() {
    this.getListData()
  },
  created() {
    if (this.addParams.contStatus === '07') {
      this.button.buttonList.forEach(xdd => {
        if (xdd.name === '样品质控' || xdd.name === '删除') {
          xdd.disabled = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
