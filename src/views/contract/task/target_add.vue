<!-- 指标普通录入 -->
<template>
  <div class="operate-container">
    <el-form label-position="right" label-width="90px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="指标选择:" prop="options">
         <el-cascader style="width: 100%;"
          ref="cascaderId"
          v-model="fromValiData.options"
          :options="targetOptions"
          :props="props"
          @change="getChangeTarget"
          filterable
          clearable>
        <template slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          <span v-else style="color:#53ABD5">{{data.isDefault === '1' ? '(默认)' : ''}}</span>
        </template></el-cascader>
      </el-form-item>
      <div style="padding: 15px 30px;">
        <el-row :gutter="20" v-for="(item,index) in targetList" :key="index" style="margin-bottom: 15px;display: flex;justify-content: space-between;">
          <div style="width: calc(100% - 100px);">
            <el-input v-model="item.name" disabled></el-input>
          </div>
          <div style="width: 100px">
            <el-button type="danger" :size="$layer_Size.buttonSize" @click="getDelete(index)">移除</el-button>
          </div>
        </el-row>
      </div>
      <div class="operate-button">
        <el-button class="cancel-btn" :size="$layer_Size.buttonSize" @click='$layer.close(layerid)'>取消</el-button>
        <el-button :size="$layer_Size.buttonSize" type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getTargetQueryAllTarget} from '../../../api/contract/target.js'
import {getContTaskAddOrModifyContTask} from '../../../api/contract/task.js'

export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,

      fromValiData: {

      },
      rules: {
        options: [{ required: true, message: '请选择指标', trigger: 'blur' }]
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
      getTargetQueryAllTarget({sampType: this.params.sampLb ? this.params.sampLb : this.params.sampLbId}).then(res => {
        this.targetOptions = res.result
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let array = []
          this.targetList.forEach((xdd, index) => {
            array.push({
              contId: this.params.contId,
              pointId: this.params.id ? this.params.id : this.params.pointId,
              checkType: xdd.checkType,
              target: xdd.target,
              fun: xdd.fun
            })
          })
          getContTaskAddOrModifyContTask(array).then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          })
        }
      })
    },
    getChangeTarget (params) {
      let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
      this.targetList = []
      data.forEach(xdd => {
        this.targetList.push({
          checkType: xdd.path[0],
          target: xdd.path[1],
          fun: xdd.path[2],
          name: xdd.pathLabels[0] + ' / ' + xdd.pathLabels[1] + ' / ' + xdd.pathLabels[2]
        })
      })
      this.targetList.forEach((xdd, index) => {
        let watch = true
        params.forEach(arc => {
          if (xdd.fun === arc[2]) {
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
    // onSubmit (formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.getTestData(this.targetList).then(arg => {
    //         if (arg) {
    //           let array = []
    //           this.targetList.forEach((xdd, index) => {
    //             array.push({
    //               pointId: this.pointId,
    //               checkType: xdd.checkType,
    //               target: xdd.target,
    //               fun: xdd.fun,
    //               checkPoint: Number(xdd.checkPoint),
    //               checkPc: Number(xdd.checkPc),
    //               checkDays: Number(xdd.checkDays)
    //             })
    //           })
    //           getContTaskAddOrModifyContTask(array).then(res => {
    //             this.$layer.close(this.layerid)
    //             this.$parent.getListData()
    //             this.$share.message()
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    // getTestData (data) {
    //   return new Promise(resolve => {
    //     let test = true
    //     data.some((xdd, index) => {
    //       if (xdd.checkPoint === undefined || xdd.checkPoint === '') {
    //         this.$message({
    //           message: '第' + (index + 1) + '行，请填写检测点位',
    //           type: 'warning'
    //         })
    //         test = false
    //         return true
    //       } else if (xdd.checkPc === undefined || xdd.checkPc === '') {
    //         this.$message({
    //           message: '第' + (index + 1) + '行，请填写检测频次',
    //           type: 'warning'
    //         })
    //         test = false
    //         return true
    //       } else if (xdd.checkDays === undefined || xdd.checkDays === '') {
    //         this.$message({
    //           message: '第' + (index + 1) + '行，请填写检测天数',
    //           type: 'warning'
    //         })
    //         test = false
    //         return true
    //       }
    //     })
    //     resolve(test)
    //   })
    // },
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
