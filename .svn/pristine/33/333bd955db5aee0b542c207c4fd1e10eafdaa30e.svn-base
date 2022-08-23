<!-- 指标安包录入 -->
<template>
  <div class="operate-container" id="targetPackAge">
    <el-form label-position="right" label-width="90px" :model="fromValiData" :rules="rules" ref="fromValiData">
      <el-form-item label="包名选择:" prop="packId">
         <el-select v-model="fromValiData.packId" placeholder="" style="width: 100%;" @change="changePackAge" ref="packRef">
           <el-option
             v-for="item in packAgeList"
             :key="item.id"
             :label="item.name"
             :value="item.id">
           </el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="编辑指标:">
         <el-transfer
           filterable
           filter-placeholder="请输入指标名称"
           :props="props"
           :button-texts="['恢复', '移除']"
           :titles="['现有的指标', '移除的指标']"
           v-model="targetValue"
           :data="targetData">
         </el-transfer>
         <el-button type="primary" :size="$layer_Size.buttonSize" style="margin-top: 15px;" @click="getConfirm">确认</el-button>
      </el-form-item>
      <div style="padding: 15px 10%;">
        <el-row :gutter="20" v-for="(item,index) in targetList" :key="index" style="margin-bottom: 15px">
          <el-col :span="20">
            <el-input v-model="item.packName" placeholder="包名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" :size="$layer_Size.buttonSize" @click="getDelete(index)">移除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="operate-button" v-show="targetList.length > 0">
        <el-button :size="$layer_Size.buttonSize" class="cancel-btn" @click='$layer.close(layerid)'>取消</el-button>
        <el-button :size="$layer_Size.buttonSize" type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getPackQueryListPack, getPackQueryListPackItem} from '../../../api/contract/target.js'
import {getContTaskAddContTaskByPack} from '../../../api/contract/task.js'

export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      btnLoading: false,

      fromValiData: {},
      rules: {
        packId: [{ required: true, message: '请选择包名', trigger: 'blur' }]
      },

      packAgeList: [],
      props: {
        label: 'checkTargetName',
        key: 'id'
      },
      targetValue: [],
      targetData: [],
      targetList: []
    }
  },
  methods: {
    getListData () {
      getPackQueryListPack({}).then(res => {
        this.packAgeList = res.result
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
              packId: xdd.packId,
              packName: xdd.packName,
              outIds: xdd.outIds
            })
          })
          getContTaskAddContTaskByPack(array).then(res => {
            this.$layer.close(this.layerid)
            this.$parent.getListData()
            this.$share.message()
          })
          // console.log(this.targetList)
        }
      })
    },
    changePackAge (item) {
      console.log(item)
      getPackQueryListPackItem({packageId: item}).then(res => {
        this.targetData = res.result
      })
    },
    getConfirm () {
      if (this.fromValiData.packId === undefined || this.fromValiData.packId === '') {
        this.$message({
          message: '请选择包',
          type: 'warning'
        })
        return
      }
      if (this.targetData.length === 0) {
        this.$message({
          message: '当前包无指标',
          type: 'warning'
        })
        return
      }
      let outIds = this.targetValue.join(',')
      this.targetList.push({
        outIds: outIds,
        packId: this.fromValiData.packId,
        packName: this.$refs.packRef.selectedLabel
      })
    },
    getDelete (params) {
      this.targetList = this.targetList.filter((item, index) => index !== params)
    }
  },
  mounted () {
    this.getListData()
  },
  created () {

  }
}
</script>

<style lang="scss">
  #targetPackAge .el-transfer-panel{
    width: 25%;
  }
  #targetPackAge .el-button{
    padding: 0 15px;
  }
</style>
