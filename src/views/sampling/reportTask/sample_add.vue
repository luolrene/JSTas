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
import {getSamplingTaskAddOrModifySampNo, getSamplingTaskQueryQualityList} from '../../../api/sampling/sampTask.js'
export default {
  props: {
    layerid: '',
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
      zkTypeData: [] // 质控类型
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      getSamplingTaskAddOrModifySampNo(this.fromValiData).then(res => {
        this.$parent.getListData()
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
      this.fromValiData.sampPoint = this.params.id
    }
  }
}
</script>

<style scoped lang="scss">

</style>
