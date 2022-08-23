<template>
  <div class="operate-container">
    <div style="color: #0195DB;margin-bottom: 10px;">交样单基本信息</div>
    <el-form ref="fromValiData_B" :inline="true" :model="fromValiData_B" class="demo-form-inline" :rules="rules_B">
      <el-form-item label="采样日期" prop="syDate">
        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择采样日期" v-model="fromValiData_B.syDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="fromValiData_B.exp" style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="$layer_Size.buttonSize" @click="onPreserve">保存</el-button>
        <el-button type="success" :size="$layer_Size.buttonSize" @click="onConfirm" v-if="params.recordFlag ==='0'">完成填写</el-button>
      </el-form-item>
    </el-form>
    <el-divider>交样记录明细（左侧提交表单，右侧表单列表）</el-divider>
    <el-row style="height: 100%;" :gutter="16">
      <el-col :span="5" style="height: 100%;">
        <el-form
          ref="fromValiData"
          :rules="rules"
          :model="fromValiData"
          label-width="80px">
          <el-form-item label="报告编号">
            <el-input v-model="fromValiData.reportNo" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="样品编号" prop="sampNo">
            <el-input v-model="fromValiData.sampNo"></el-input>
          </el-form-item>
          <el-form-item label="样品类别" prop="sampType">
            <el-select v-model="fromValiData.sampType" placeholder="请选择样品类别" @change="changeSampType">
              <el-option
                v-for="(item,index) in sampTypeData"
                :label="item.name"
                :value="item.id"
                :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="样品表现" v-if="fromValiData.sampType !==''">
            <template v-if="fromValiData.showType === '1'">
              <el-select v-model="fromValiData.showData_A" placeholder="请选择清澈度" class="marginBot">
                <el-option
                  v-for="(item,index) in showData_A"
                  :label="item.name"
                  :value="item.name"
                  :key="index"></el-option>
              </el-select>
              <el-select v-model="fromValiData.showData_B" placeholder="请选择颜色" class="marginBot">
                <el-option
                  v-for="(item,index) in showData_B"
                  :label="item.name"
                  :value="item.name"
                  :key="index"></el-option>
              </el-select>
              <el-select v-model="fromValiData.showData_C" placeholder="请选择是否异味">
                <el-option
                  v-for="(item,index) in showData_C"
                  :label="item.name"
                  :value="item.name"
                  :key="index"></el-option>
              </el-select>
            </template>
            <template v-else-if="fromValiData.showType === '2'">
              <el-input v-model="fromValiData.showData_D" :disabled="true"></el-input>
            </template>
            <template v-else-if="fromValiData.showType === '3'">
              <el-select v-model="fromValiData.showData_E" placeholder="请选择颜色" class="marginBot">
                <el-option
                  v-for="(item,index) in showData_E"
                  :label="item.name"
                  :value="item.name"
                  :key="index"></el-option>
              </el-select>
              <el-select v-model="fromValiData.showData_F" placeholder="请选择物质状态">
                <el-option
                  v-for="(item,index) in showData_F"
                  :label="item.name"
                  :value="item.name"
                  :key="index"></el-option>
              </el-select>
            </template>
            <template v-else-if="fromValiData.showType === '4'">
              <el-input v-model="fromValiData.showData_G" :disabled="true"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="样品数量" prop="sampSum">
            <el-input v-model="fromValiData.sampSum"></el-input>
          </el-form-item>
          <el-form-item label="检测项目" prop="checkTarget">
            <el-input v-model="fromValiData.checkTarget"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onReset"
              :size="$layer_Size.buttonSize">重置</el-button>
            <el-button
              @click="onSubmit"
              type="primary"
              :size="$layer_Size.buttonSize">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="19">
        <tableItem
          :obj="this"
          :tableData="tableData"
          :tableHeader="tableHeader"
          :dataSum='fromValiData.dataSum'
          :button="button"
          :loading="loading"
          :isPage="false"
          :isSelection="false"
          @handleSizeChange="handleSizeChange"
          @getCellClick="getCellClick"></tableItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validateNumber } from '../../../utils/public.js'
import {
  getSubSampAddOrModifyRecord,
  getSubSampDelRecordDetail,
  getSubSampQueryRecord,
  getSubSampAddOrModifyRecordDetail,
  getSubSampAddOrModifyTask} from '@/api/contract/task.js'
import { getSysQueryDict } from '@/api/common.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      loading: false,
      fromValiData_B: {

      },
      rules_B: {
        syDate: [
          { required: true, message: '请选择采样日期', trigger: 'blur' }
        ]
      },

      fromValiData: {
        reportNo: '',
        sampTypeId: '',
        sampType: '',
        showType: '' // 样品表现的类型
      },
      rules: {
        sampNo: [{ required: true, message: '请填写样品编号', trigger: 'change' }],
        sampType: [{ required: true, message: '请选择样品类别', trigger: 'change' }],
        checkTarget: [{ required: true, message: '请填写检测项目', trigger: 'change' }],
        sampSum: [
          { required: true, message: '请填写样品数量', trigger: 'change' },
          { validator: validateNumber, trigger: 'change' }
        ]
      },

      tableData: [],
      tableHeader: [
        {prop: 'sampNo', label: '样品编号', width: 80},
        {prop: 'sampType', label: '样品类别', width: 50},
        {prop: 'show', label: '样品表现', width: 80},
        {prop: 'sampSum', label: '样品数量', width: 40},
        {prop: 'checkTarget', label: '检测项目', width: 70}
      ],
      button: {
        width: 40,
        buttonList: [
          { name: '删除', type: 'danger', click: 'handleDelete' }
        ]
      },
      sampTypeData: [],
      showData_A: [
        {name: '清澈'},
        {name: '微浊'},
        {name: '浑浊'}
      ],
      showData_B: [
        {name: '无色'},
        {name: '深红'},
        {name: '深橙'},
        {name: '深黄'},
        {name: '深绿'},
        {name: '深蓝'},
        {name: '深紫'},
        {name: '深白'},
        {name: '深灰'},
        {name: '深黑'},
        {name: '浅红'},
        {name: '浅橙'},
        {name: '浅黄'},
        {name: '浅绿'},
        {name: '浅蓝'},
        {name: '浅紫'},
        {name: '浅白'},
        {name: '浅灰'},
        {name: '浅黑'}
      ],
      showData_C: [
        {name: '无异味'},
        {name: '有异味'}
      ],
      showData_E: [
        {name: '红色'},
        {name: '橙色'},
        {name: '黄色'},
        {name: '绿色'},
        {name: '蓝色'},
        {name: '紫色'},
        {name: '白色'},
        {name: '灰色'},
        {name: '黑色'}
      ],
      showData_F: [
        {name: '固体'},
        {name: '液体'}
      ]
    }
  },
  watch: {
    'fromValiData.sampTypeId': {
      handler (newName, oldName) {
        this.fromValiData.showType = newName.substring(0, 1)
        if (this.fromValiData.showType === '2') {
          this.fromValiData.showData_D = '鲜样'
        } else if (this.fromValiData.showType === '4') {
          this.fromValiData.showData_G = '完好'
        }
      },
      deep: true,
      immediate: false
    }
  },
  methods: {
    // 保存基本信息
    onPreserve() {
      this.$refs['fromValiData_B'].validate(valid => {
        if (valid) {
          getSubSampAddOrModifyRecord(this.fromValiData_B).then(res => {
            this.$share.message()
          })
        }
      })
    },
    // 完成填写
    onConfirm() {
      this.$confirm('此操作将完成填写, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        let ids = {...this.params}
        ids.recordFlag = '1'
        getSubSampAddOrModifyTask(ids).then(res => {
          this.$layer.close(this.layerid)
          this.$share.message('保存成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    onSubmit() {
      this.$refs['fromValiData'].validate(valid => {
        if (valid) {
          if (this.fromValiData.showType === '1') {
            if (this.fromValiData.showData_A === undefined || this.fromValiData.showData_B === undefined || this.fromValiData.showData_C === undefined) {
              this.$share.message('请完善样品表现', 'warning')
              return
            }
            this.fromValiData.show = this.fromValiData.showData_A + ',' + this.fromValiData.showData_B + ',' + this.fromValiData.showData_C
          } else if (this.fromValiData.showType === '2') {
            this.fromValiData.show = this.fromValiData.showData_D
          } else if (this.fromValiData.showType === '3') {
            if (this.fromValiData.showData_E === undefined || this.fromValiData.showData_F === undefined) {
              this.$share.message('请完善样品表现', 'warning')
              return
            }
            this.fromValiData.show = this.fromValiData.showData_E + ',' + this.fromValiData.showData_F
          } else if (this.fromValiData.showType === '4') {
            this.fromValiData.show = this.fromValiData.showData_G
          } else {
            return
          }

          this.fromValiData.subTaskId = this.params.id
          this.btnLoading = true
          getSubSampAddOrModifyRecordDetail(this.fromValiData).then(res => {
            this.getListData()
            this.btnLoading = false
            this.$share.message('新增成功')
          })
        }
      })
    },
    onReset() {
      this.fromValiData = {
        reportNo: '',
        sampTypeId: '',
        sampType: '',
        showType: ''
      }
      this.fromValiData.reportNo = this.params.reportNo
    },
    getCellClick(params) {
      this.fromValiData = {...params}
      this.fromValiData.reportNo = this.params.reportNo
      this.fromValiData.showType = params.sampTypeId.substring(0, 1)
      let type = this.fromValiData.showType
      if (type === '1') {
        this.fromValiData.showData_A = this.fromValiData.show.split(',')[0]
        this.fromValiData.showData_B = this.fromValiData.show.split(',')[1]
        this.fromValiData.showData_C = this.fromValiData.show.split(',')[2]
      } else if (type === '2') {
        this.fromValiData.showData_D = this.fromValiData.show
      } else if (type === '3') {
        this.fromValiData.showData_E = this.fromValiData.show.split(',')[0]
        this.fromValiData.showData_F = this.fromValiData.show.split(',')[1]
      } else if (type === '4') {
        this.fromValiData.showData_G = this.fromValiData.show
      }
    },
    getListData() {
      this.loading = true
      let ids = {}
      ids.subTaskId = this.params.id
      getSubSampQueryRecord(ids).then(res => {
        if (res.result.record !== null) {
          this.fromValiData_B = res.result.record
        }
        this.tableData = res.result.recordDetail
        this.loading = false
      })
    },
    changeSampType(e) {
      let obj = this.sampTypeData.find(xdd => xdd.id === e)
      this.fromValiData.sampTypeId = obj.id
      this.fromValiData.sampType = obj.name
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getSubSampDelRecordDetail({ ids: row.id }).then(res => {
            that.$message({
              type: 'success',
              message: '删除成功'
            })
            that.getListData()
          })
        }
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getDicData() {
      getSysQueryDict({ type: 'YPLX' }).then(res => {
        this.sampTypeData = res.result
      })
    }
  },
  mounted () {
    this.fromValiData_B.subTaskId = this.params.id
    this.fromValiData.reportNo = this.params.reportNo
    this.getListData()
    this.getDicData()
  },
  destroyed() {
    this.$parent.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
.marginBot{
  margin-bottom: 3px;
}
</style>
