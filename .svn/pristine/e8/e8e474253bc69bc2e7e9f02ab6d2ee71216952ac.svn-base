<!-- 点位新建 -->
<template>
  <div class="operate-container">
    <fromItem
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :btnLoading="btnLoading"
      :rules="rules"
      :labelWidth="120">
      <template v-slot:top>
        <el-form-item
          label="样品类别/类型:"
          prop="options"
          label-width="110">
          <el-cascader
            ref="cascader"
            v-model="fromValiData.options"
            :options="optionsData"
            @change="changeCascader"
            :props="props"
            clearable :separator="'/'" style='width: 380px;'>
            <template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span style="font-size: 13px !important;">({{ data.sampType }})</span>
            </template></el-cascader>
        </el-form-item>
      </template>
    </fromItem>
  </div>
</template>

<script>
import {getContTaskAddOrModifyCheckPoint, getContTaskQuerySampType} from '../../../api/contract/task.js'
export default {
  props: {
    contId: '',
    params: Object,
    detailParams: Object, // 详细版
    layerid: '',
    type: String
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        name: null,
        typeName: '',
        custPointName: ''
      },
      rules: {
        custPointName: [
          { required: true, message: '请填写点位名称', trigger: 'blur' }
        ],
        pc: [
          { required: true, message: '请填写频次', trigger: 'blur' },
          {type: 'number', message: '频次必须为数字'}
        ],
        days: [
          { required: true, message: '请填写初始检测天数', trigger: 'blur' },
          {type: 'number', message: '天数必须为数字'}
        ]
      },
      fromItemList: [
        {label: '点位名称', prop: 'custPointName', value: '', type: 'input', isRqd: true},
        {label: '点位编号', prop: 'name', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '点位类型', prop: 'typeName', value: '', type: 'input', isRqd: true, disabled: true},
        {label: '频次', prop: 'pc', value: '', type: 'input', number: true, isRqd: true},
        {label: '初始检测天数', prop: 'days', value: '', type: 'input', number: true, isRqd: true}
      ],
      props: {
        value: 'id',
        label: 'name',
        expandTrigger: 'hover'
      },
      optionsData: []
    }
  },
  methods: {
    onSubmit () {
      if (this.fromValiData.sampLb === undefined) {
        this.$share.message('请选择样品类别', 'warning')
        return
      }
      if (this.fromValiData.sampLx === undefined) {
        this.$share.message('请选择样品类型', 'warning')
        return
      }
      delete this.fromValiData.options
      let ids = []
      ids.push(this.fromValiData)
      this.btnLoading = true
      getContTaskAddOrModifyCheckPoint(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$parent.$refs.allTargetList.getListData()
        this.$share.message()
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getSampList () {
      getContTaskQuerySampType({contId: this.fromValiData.contId}).then(res => {
        this.optionsData = res.result
      })
    },

    changeCascader (e) {
      if (this.$refs['cascader'].getCheckedNodes()[0]) {
        // let labels = this.$refs['cascader'].getCheckedNodes()[0].pathLabels
        this.fromValiData.sampLb = e[0]
        this.fromValiData.sampLx = e[1]
        // this.fromValiData.sampLbName = labels[0]
        // this.fromValiData.sampLxName = labels[1]
        let type = this.$refs['cascader'].getCheckedNodes()[0].data.sampType
        if (type === 'CY') {
          this.fromValiData.type = '1'
          this.fromValiData.typeName = '采样'
        } else if (type === 'SY') {
          this.fromValiData.type = '2'
          this.fromValiData.typeName = '送样'
        }
      }
    }
  },
  mounted () {

  },
  created () {
    if (this.contId) {
      this.fromValiData.contId = this.contId
      this.fromItemList.some((xdd, index) => {
        if (xdd.prop === 'name') {
          this.fromItemList.splice(index, 1)
        }
      })
    }
    if (this.params) {
      this.fromValiData = JSON.parse(JSON.stringify(this.params))
      this.fromValiData.options = []
      if (this.fromValiData.type === '1') {
        this.fromValiData.typeName = '采样'
      } else if (this.fromValiData.type === '2') {
        this.fromValiData.typeName = '送样'
      } else {
        this.fromValiData.typeName = ''
      }
      this.fromValiData.options.push(this.fromValiData.sampLb)
      this.fromValiData.options.push(this.fromValiData.sampLx)
    } else if (this.detailParams) {
      this.detailParams.custPointName = ''
      this.fromValiData = JSON.parse(JSON.stringify(this.detailParams))
      this.fromValiData.options = []
      this.fromValiData.custPointName = this.fromValiData.pointName
      this.fromValiData.id = this.fromValiData.pointId
      this.fromValiData.name = this.fromValiData.pointNo
      this.fromValiData.sampLb = this.fromValiData.sampLbId
      this.fromValiData.sampLx = this.fromValiData.sampLxId
      if (this.fromValiData.pointType === '1') {
        this.fromValiData.typeName = '采样'
      } else if (this.fromValiData.pointType === '2') {
        this.fromValiData.typeName = '送样'
      } else {
        this.fromValiData.typeName = ''
      }
      this.fromValiData.options.push(this.fromValiData.sampLbId)
      this.fromValiData.options.push(this.fromValiData.sampLxId)

      // this.fromValiData.options = []
      // if (this.fromValiData.type === '1') {
      //   this.fromValiData.typeName = '采样'
      // } else if (this.fromValiData.type === '2') {
      //   this.fromValiData.typeName = '送样'
      // } else {
      //   this.fromValiData.typeName = ''
      // }
      // this.fromValiData.options.push(this.fromValiData.sampLb)
      // this.fromValiData.options.push(this.fromValiData.sampLx)
    }
    console.log(this.fromValiData)
    this.getSampList()
  }
}
</script>

<style scoped lang="scss">

</style>
