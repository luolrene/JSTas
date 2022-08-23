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
     <div style="padding-left: 35px;margin-bottom: 15px;">
        <el-input class="type_D" v-model="batchDays" @input="getBatchChange('day')">
          <template slot="prepend">批量录入天数</template>
        </el-input>
        <el-input class="type_D" v-model="batchPc" @input="getBatchChange('pc')">
          <template slot="prepend">批量录入频次</template>
        </el-input>
      </div>
      <div style="padding: 0 5px;">
        <el-row :gutter="20" v-for="(item,index) in targetList" :key="index" class="type_A">
          <div class="modular_A">{{index + 1}}.</div>
          <div class="modular_B">
            <div class="type_B">{{item.name}}</div>
            <div class="type_C">
              <el-input class="type_D" v-model="item.targetSysPrice" :disabled="true">
                <template slot="prepend">指标系统单价</template>
              </el-input>
              <el-input class="type_D" v-model="item.checkDays">
                <template slot="prepend">检测天数</template>
              </el-input>
              <el-input class="type_D" v-model="item.pc">
                <template slot="prepend">频次(次/天)</template>
              </el-input>
            </div>
          </div>
          <div class="modular_C">
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
import {getTargetPriceQueryTargetTree} from '@/api/jcxxgl/targetDefend.js'
import {getCrmOfferPointSaveTargets} from '@/api/client/quotationRecord.js'

export default {
  props: {
    params: Object,
    pointId: String,
    offerId: String,
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
      targetList: [],

      batchDays: 1, // 批量天数
      batchPc: 1 // 批量频次
    }
  },
  watch: {

  },
  methods: {
    getListData () {
      getTargetPriceQueryTargetTree({}).then(res => {
        this.targetOptions = res.result
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getCrmOfferPointSaveTargets(this.targetList).then(res => {
            this.$layer.close(this.layerid)
            this.targetList.forEach(xdd => {
              let ids = {}
              ids.name = xdd.targetName
              ids.father = this.fromValiData.father
              ids.id = res.result
              this.$parent.appendTree(ids)
            })
            this.$parent.getListData(this.fromValiData.father)
            this.$share.message()
            this.btnLoading = false
          })
        }
      })
    },
    getChangeTarget (params) {
      let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
      this.targetList = []
      data.forEach(xdd => {
        this.targetList.push({
          targetId: xdd.path[1],
          targetSysPrice: xdd.data.price,
          targetName: xdd.pathLabels[1],
          checkDays: 1,
          pc: 1,
          pointId: this.pointId,
          offerId: this.offerId,
          name: xdd.pathLabels[0] + ' / ' + xdd.pathLabels[1]
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
    getBatchChange(type) {
      if (type === 'day') {
        this.targetList.forEach(xdd => {
          xdd.checkDays = this.batchDays
        })
      } else {
        this.targetList.forEach(xdd => {
          xdd.pc = this.batchPc
        })
      }
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
  .modular_A{
    width: 24px;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
    color: #0195DB;
    font-weight: 700;
  }
  .modular_B{
    display: flex;
    flex-direction: column;
    width: calc(100% - 120px);
  }
  .modular_C{
    width: 60px
    ;margin-top: 36px;
  }
  .type_A{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px
  }
  .type_B{
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #333333
  }
  .type_C{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .type_D{
    width: 32.5%;
    margin-top: 5px;
  }
</style>
