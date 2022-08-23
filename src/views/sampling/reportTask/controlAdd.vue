<!-- 添加样品编号-->
<template>
  <div class="operate-container">
   <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :label-width="90"
      :btnLoading="btnLoading"
      :rules="rules">
      <el-form-item label="质控类型" prop="zkType">
        <el-select v-model="fromValiData.zkType" style="width: 100%;" @change="changeZkType">
          <el-option
            v-for="xdd in zkTypeData"
            :key="xdd.qcNo"
            :label="xdd.qcType"
            :value="xdd.qcNo">
          </el-option>
        </el-select>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import {getSamplingTaskAddOrModifySampNo, getSamplingTaskQueryQualityList, getSamplingTaskQuerySampPointPage} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object,
    type: ''
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        workType: '1',
        isZk: '1',
        sampNo: ''
      },
      rules: {
        zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
      },
      fromItemList: [],
      zkTypeData: [], // 质控类型
      tableData: []
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSamplingTaskAddOrModifySampNo(this.fromValiData).then(res => {
        this.$parent.getTransferData()
        this.$layer.close(this.layerid)
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getZkTypeData () {
      getSamplingTaskQueryQualityList({type: this.type}).then(res => {
        this.zkTypeData = res.result
      })
    },
    changeZkType (e) {
      if (this.type === '1') {
        if (e === 'ZXDY') {
          this.fromValiData.sampNo = ''
          this.rules = {
            sampPoint: [{ required: true, message: '请选择点位', trigger: 'change' }],
            sampNo: [{ required: true, message: '请填写样品编号', trigger: 'blur' }],
            zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
          }
          this.fromItemList = [
            {label: '点位', prop: 'sampPoint', value: '', type: 'select', isRqd: true, data: this.tableData},
            {label: '样品编号', prop: 'sampNo', value: '', type: 'input', isRqd: true}
          ]
        } else {
          this.rules = {
            sampPoint: [{ required: true, message: '请选择点位', trigger: 'change' }],
            zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
          }
        }
      } else {
        if (e === 'ZXDY') {
          this.fromValiData.sampNo = ''
          this.rules = {
            sampNo: [{ required: true, message: '请填写样品编号', trigger: 'blur' }],
            zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
          }
          this.fromItemList = [
            {label: '样品编号', prop: 'sampNo', value: '', type: 'input', isRqd: true}
          ]
        } else {
          this.rules = {
            zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
          }
        }
      }
    }
  },
  mounted () {

  },
  created () {
    this.getZkTypeData()
    if (this.type === '2') {
      this.fromValiData.sampPoint = this.params.sampPoint
      this.fromValiData.sampNo = this.params.sampNo
      this.fromItemList = [
        {label: '样品编号', prop: 'sampNo', value: '', type: 'input', isRqd: true, disabled: true}
      ]
    } else {
      let ids = {}
      ids.pageSize = 99999
      ids.pageNow = 1
      ids.reportNo = this.addParams.reportNo
      getSamplingTaskQuerySampPointPage(ids).then(res => {
        res.result.pageList.forEach(xdd => {
          xdd.name = xdd.pointName
        })
        this.fromItemList = [
          {label: '点位', prop: 'sampPoint', value: '', type: 'select', isRqd: true, data: res.result.pageList}
        ]
        this.rules = {
          sampPoint: [{ required: true, message: '请选择点位', trigger: 'change' }],
          zkType: [{ required: true, message: '请选择质控类型', trigger: 'change' }]
        }
        this.tableData = res.result.pageList
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
