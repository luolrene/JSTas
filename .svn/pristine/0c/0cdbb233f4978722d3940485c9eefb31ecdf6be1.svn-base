<!-- 样品列表 -->
<template>
  <div class="operate-container">
    <el-form :model="fromValiData" label-width="100" inline class="list-form" ref="fromValiData">
      <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
        <template v-if="fromValiData.status === '0'">
          <el-form-item label="批量录入采样时间1:">
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
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-share" @click="handleBatchDelivery()" :disabled="params.contStatus === '07'">批量交样</el-button>
          <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="params.xmlx === 'XMLX_9'" :disabled="params.contStatus === '07'">批量删除</el-button>
        </template>
      </fromSearch>
      <!-- <labelPrint :data="multipleSelection"></labelPrint> -->
    </el-form>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="isSelection"
    :button="button"
    :pageSize="50"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import sampleEdit from './sample_edit.vue'
import {getSamplingTaskQuerySampNoPageListByTaskId, getSamplingTaskSaveSampNoList, getSamplingTaskCommitSampNoList, getSamplingTaskDelSampNos} from '../../../api/sampling/sampTask.js'
import targetList from './target_list.vue'
import labelPrint from '../../common/labelprint.vue'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    labelPrint
  },
  data () {
    return {
      loading: false,
      isSelection: true,
      fromValiData: {
        pageSize: 50,
        pageNow: 1,
        status: '0'
      },
      fromData: [
        {type: 'select',
          prop: 'status',
          label: '样品状态',
          data: [
            {id: '', name: '全部'},
            {id: '0', name: '进行中'},
            {id: '1', name: '已收样'},
            {id: '2', name: '已交样'}
          ]}
      ],
      tableData: [

      ],
      tableHeader: [],
      tableHeader_A: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 200
        }, {
          prop: 'targetName',
          label: '检测指标',
          width: 220
        }, {
          prop: 'custPointNo',
          label: '点位名称',
          width: 140
        }, {
          prop: 'pointName',
          label: '点位编号',
          width: 90
        }, {
          prop: 'statusName',
          label: '状态',
          width: 90
        }, {
          prop: 'sampLxName',
          label: '样品类型',
          width: 90
        },
        {
          prop: 'jd',
          label: '经度',
          type: 'input',
          placeholder: '经度',
          number: true,
          width: 110
        }, {
          prop: 'wd',
          label: '纬度',
          type: 'input',
          placeholder: '纬度',
          number: true,
          width: 110
        }, {
          prop: 'cysd',
          label: '采样深度(m)',
          type: 'input',
          placeholder: '采样深度',
          number: true,
          width: 120
        }, {
          prop: 'useTo',
          label: '利用现状',
          type: 'input',
          placeholder: '利用现状',
          width: 110
        }, {
          prop: 'show',
          label: '表现',
          type: 'input',
          placeholder: '表现',
          width: 100
        }, {
          prop: 'cyTime',
          label: '采样时间',
          type: 'date',
          placeholder: '采样时间',
          width: 160
        }, {
          prop: 'temperature',
          label: '温度',
          type: 'input',
          placeholder: '温度',
          number: true,
          width: 100
        }, {
          prop: 'pressure',
          label: '压力',
          type: 'input',
          placeholder: '压力',
          number: true,
          width: 100
        }, {
          prop: 'humidity',
          label: '含湿量',
          type: 'input',
          placeholder: '含湿量',
          number: true,
          width: 100
        }, {
          prop: 'oxygen',
          label: '含氧量',
          type: 'input',
          placeholder: '含氧量',
          number: true,
          width: 100
        }, {
          prop: 'flowRate',
          label: '流速',
          type: 'input',
          placeholder: '流速',
          number: true,
          width: 100
        }, {
          prop: 'flow',
          label: '流量',
          type: 'input',
          placeholder: '流量',
          number: true,
          width: 100
        }, {
          prop: 'chimneyHign',
          label: '烟囱高度',
          type: 'input',
          placeholder: '烟囱高度',
          number: true,
          width: 120
        }, {
          prop: 'chimneySection',
          label: '烟囱截面积',
          type: 'input',
          placeholder: '烟囱截面积',
          number: true,
          width: 120
        }, {
          prop: 'dayOrNight',
          label: '白天黑夜',
          type: 'select',
          placeholder: '',
          data: [
            {id: '昼间', name: '昼间'},
            {id: '夜间', name: '夜间'}
          ],
          width: 110
        }, {
          prop: 'mainSound',
          label: '主要声源',
          type: 'input',
          placeholder: '主要声源',
          width: 120
        },
        {
          prop: 'isZkName',
          label: '是否质控',
          width: 100
        }
      ],
      button: {
        buttonList: [

        ]
      },
      button_A: {
        width: 140,
        buttonList: [
          {name: '检测结果录入',
            type: 'primary',
            click: 'handleTarget',
            condition: function (params) {
              if (params.isScene === '1' || params.isScene === '2') {
                return true
              }
            }
          }
        ]
      },
      button_B: {
        width: 140,
        buttonList: [

        ]
      },
      tableHeader_B: [
        {
          prop: 'sampNo',
          label: '样品编号',
          width: 200
        }, {
          prop: 'targetName',
          label: '检测指标',
          width: 220
        }, {
          prop: 'pointName',
          label: '点位名称',
          width: 90
        }, {
          prop: 'statusName',
          label: '状态',
          width: 90
        }, {
          prop: 'isZkName',
          label: '是否质控',
          width: 100
        }, {
          prop: 'sampLxName',
          label: '样品类型',
          width: 90
        }, {
          prop: 'custPointNo',
          label: '点位编号',
          width: 140
        }
      ],
      multipleSelection: [],
      cyTimeBatchData: ''
    }
  },
  watch: {
    'fromValiData.status': {
      deep: true,
      handler: function (newV, oldV) {
        if (newV === '0') {
          this.isSelection = true
          this.tableHeader = this.tableHeader_A
          this.button = this.button_A
        } else {
          this.isSelection = false
          this.tableHeader = this.tableHeader_B
          this.button = this.button_B
        }
      }
    }
  },
  methods: {
    getListData () {
      this.loading = true
      this.fromValiData.contId = this.params.contId
      this.fromValiData.sampTaskId = this.params.id
      getSamplingTaskQuerySampNoPageListByTaskId(this.fromValiData).then(res => {
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
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleEdit (params) {
      this.$layer.iframe({
        content: {
          content: sampleEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          }// props
        },
        area: ['700px', this.$layer_Size.layerSelfHeight],
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleTarget (params) {
      this.$layer.iframe({
        content: {
          content: targetList, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            isScene: '1' // 是否现场1是0否
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '指标列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchDelivery () {
      let ids = {sampNos: ''}
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选需要交样的样品', 'warning')
        return
      }
      this.multipleSelection.forEach(xdd => {
        ids.sampNos += xdd.sampNo + ','
      })
      ids.sampNos = ids.sampNos.substring(0, ids.sampNos.length - 1)
      ids.reportNo = this.params.reportNo
      getSamplingTaskCommitSampNoList(ids).then(res => {
        this.getListData()
        this.$share.message('交样成功', 'success')
      })
    },
    handleBatchEdit () {
      // let ids = []
      // let test = true
      // let num = 0
      // this.tableData.some((xdd, index) => {
      //   let params = JSON.parse(JSON.stringify(xdd))
      //   if (params.cyTime === null || params.cyTime === '') {
      //     num = index + 1
      //     test = false
      //     return true
      //   }
      //   params.workType = '2' // 1新增 2修改
      //   ids.push(params)
      // })
      // if (!test) {
      //   this.$message({
      //     message: '第' + num + '行，请选择采样时间',
      //     type: 'warning'
      //   })
      //   return
      // }
      getSamplingTaskSaveSampNoList(this.tableData).then(res => {
        this.getListData()
        this.$share.message()
      })
    },
    handleBatchDel () {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的样品', 'warning')
        return
      }
      let ids = {sampNos: ''}
      this.multipleSelection.forEach(xdd => {
        ids.sampNos += xdd.sampNo + ','
      })
      ids.reportNo = this.params.reportNo
      ids.sampNos = ids.sampNos.substring(0, ids.sampNos.length - 1)

      let that = this
      this.$share.confirm({
        confirm: function () {
          getSamplingTaskDelSampNos(ids).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    getChangeCyTime (e) {
      this.multipleSelection.forEach(xdd => {
        xdd.cyTime = e
      })
    },
    doSearch () {
      this.getListData()
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
    this.tableHeader = this.tableHeader_A
    this.button = this.button_A
    this.getListData()
  },
  created () {

  },
  destroyed () {
    this.$parent.getListData()
  }
}
</script>

<style scoped lang="scss">

</style>
