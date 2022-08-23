<!-- 现场新增仪器明细 -->
<template>
  <div class="operate-container">
    <el-form label-position="right" label-width="110px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="仪器明细选择:" prop="options">
         <el-cascader style="width: 100%;"
          ref="cascaderId"
          v-model="fromValiData.options"
          :options="targetOptions"
          :props="props"
          :clearable="true"
          @change="getChangeTarget"
          filterable>
        <template slot-scope="{ node, data }">
          <span>{{ data.name}}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template></el-cascader>
      </el-form-item>
      <div style="padding: 15px 30px;">
        <el-row :gutter="20" v-for="(item,index) in targetList" :key="index" style="margin-bottom: 15px;display: flex;justify-content: space-between;">
          <div style="width: calc(100% - 100px);">
            <el-input v-model="item.fullName" disabled></el-input>
          </div>
          <div style="width: 100px">
            <el-button type="danger" @click="getDelete(index)">移除</el-button>
          </div>
        </el-row>
      </div>
      <div class="operate-button">
        <el-button class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
        <el-button  type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getLeaseMachineItemAddOrModify} from '../../../api/sampling/sampTask.js'
import {getMachineQueryMachineTreeNew} from '../../../api/storage/equipment.js'

export default {
  props: {
    addParams: Object,
    type: Object, // 1实验室 2现场
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,

      fromValiData: {

      },
      rules: {
        options: [{ required: true, message: '请选择仪器明细', trigger: 'change' }]
      },

      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: true
      },
      targetOptions: [],
      targetList: []
    }
  },
  watch: {

  },
  methods: {
    getListData () {
      let ids = {}
      ids.type = this.type
      getMachineQueryMachineTreeNew(ids).then(res => {
        this.targetOptions = res.result
      })
    },
    onSubmit (formName) {
      if (this.type === '2') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let array = []
            this.targetList.forEach((xdd, index) => {
              array.push({
                machineType: xdd.machineType,
                machineName: xdd.machineName,
                machineNo: xdd.machineNo,
                machineXh: xdd.machineXh,
                sampTaskId: this.addParams.sampTaskId,
                reportNo: this.addParams.reportNo,
                mainId: this.addParams.mainId,
                contId: this.addParams.contId,
                leaseTaskId: this.addParams.id
              })
            })
            getLeaseMachineItemAddOrModify(array).then(res => {
              this.$layer.close(this.layerid)
              this.$parent.getListData()
              this.$share.message()
            })
          }
        })
      } else if (this.type === '1') {
        this.$parent.getMachineData(this.targetList)
        this.$layer.close(this.layerid)
      }
    },
    getChangeTarget (params) {
      let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
      this.targetList = []
      data.forEach(xdd => {
        this.targetList.push({
          machineType: xdd.path[0],
          machineName: xdd.path[1],
          id: xdd.path[2],
          machineNo: xdd.data.yqbh,
          machineXh: xdd.data.yqxh,
          name: xdd.pathLabels[1],
          fullName: xdd.pathLabels[0] + ' / ' + xdd.pathLabels[1] + ' / ' + xdd.data.yqxh + '-' + xdd.data.yqbh
        })
      })
      this.targetList.forEach((xdd, index) => {
        let watch = true
        params.forEach(arc => {
          if (xdd.id === arc[2]) {
            watch = false
          }
        })
        if (watch) {
          this.targetList.splice(index, 1)
        }
      })
    },
    getDelete (params) {
      this.targetList = this.targetList.filter((item, index) => index !== params)
      this.fromValiData.options = this.fromValiData.options.filter((item, index) => index !== params)
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
