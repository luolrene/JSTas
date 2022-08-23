<template>
  <el-scrollbar class="page-component__scroll" :native="false" :style="{height:scrollbarHeight}">
    <el-form
      ref="fromValiData"
      label-position="right"
      :label-width="labelWidth + 'px'"
      :model="fromValiData"
      :rules="rules"
      @submit.native.prevent
      :inline="inline">
      <slot name="top"></slot>
      <el-row>
        <el-col v-for="(item,index) in fromItemList" :key="index" :span="item.span ? item.span : 24">
          <el-form-item
            v-if="item.type === 'input' || item.type ==='textarea' || item.type ==='password'"
            v-show="!item.isShow"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-input
              v-if="item.number"
              v-model.number="fromValiData[item.prop]"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder:'请填写' + item.label"
              :type="item.type"
              :rows="item.type==='textarea' ? 4: 'null'"></el-input>
            <el-input
              v-else
              v-model.trim="fromValiData[item.prop]"
              :disabled="item.disabled"
              :placeholder="item.placeholder ? item.placeholder:'请填写' + item.label"
              :type="item.type"
              :rows="item.type==='textarea' ? 4: 'null'"></el-input>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'inputChoice'"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-input
              v-model="fromValiData[item.prop]"
              :placeholder="item.placeholder ? item.placeholder:'请选择' + item.label"
              v-if="!item.hasInput"
              disabled style="width: calc(100% - 70px);"></el-input>
            <el-button type="primary" :size="$layer_Size.buttonSize" @click='getInputChoice(item.click)' v-if="!item.disabled" style="width: 60px;">选择</el-button>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'select'"
            v-show="!item.isShow"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-select
              v-model="fromValiData[item.prop]"
              @change="changeSelect(item,$event)"
              @visible-change="visibleChange(item,$event)"
              @clear="clearSelect(item.prop)"
              :clearable='item.isNoClear'
              :filterable="item.filterable"
              :multiple="item.multiple"
              :placeholder="item.placeholder ? item.placeholder:'请选择' + item.label"
              style="width: 100%;"
              :disabled="item.disabled">
              <el-option
                v-for="xdd in item.data"
                :key="xdd.id"
                :label="xdd.name"
                :value="xdd.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'date' || item.type==='daterange' || item.type==='year' || item.type==='monthrange'"
             v-show="!item.isShow"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :type="item.type"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-date-picker v-model="fromValiData[item.prop]" :type="item.type" placeholder="选择日期" start-placeholder="开始日期" end-placeholder="结束日期" :value-format="item.format ? item.format :'yyyy-MM-dd'" style="width: 100%;" :disabled="item.disabled"></el-date-picker>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'radio'"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-radio-group v-model="fromValiData[item.prop]">
              <el-radio :label="xdd.label" v-for="(xdd,index) in item.data" :key="index" :disabled="item.disabled">{{xdd.name}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'switch'"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-switch v-model="fromValiData[item.prop]" active-text="是" inactive-text="否" :disabled="item.disabled"></el-switch>
          </el-form-item>

          <el-form-item
            v-else-if="item.type === 'cascader_city'"
            :label="item.label + ':'"
            :prop="item.isRqd ? item.prop : null"
            :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
            <el-cascader ref="cascader_city" v-model="fromValiData[item.prop]" :options="options" @change="changeCascaderCity(item,$event)" :separator="'/'" style="width: 100%;" :disabled="item.disabled" :filterable="item.filterable"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>

      <slot></slot>
      <slot name="upload"></slot>
    </el-form>
    <div class="operate-button" v-if="type===''">
      <el-button :size="$layer_Size.buttonSize" class="cancel-btn" @click='$layer.close(layerid)'>{{cancelName}}</el-button>
      <el-button :size="$layer_Size.buttonSize" type="primary" @click="onSubmit('fromValiData')" :loading="btnLoading" native-type="submit">{{submitName}}</el-button>
      <slot name="button"></slot>
    </div>
  </el-scrollbar>
</template>

<script>
import options from '../../../utils/country-data.js'
export default {
  props: {
    layerid: '',
    obj: Object,
    fromItemList: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 90
    },
    fromValiData: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    btnLoading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    scrollbarHeight: {
      type: String,
      default: '100%'
    },
    submitName: {
      type: String,
      default: '保存'
    },
    cancelName: {
      type: String,
      default: '取消'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: options // 存放城市数据
    }
  },
  methods: {
    onSubmit(formName, other) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.obj.onSubmit(other)
        }
      })
    },
    getInputChoice(item) {
      this.obj[item]()
    },
    changeCascaderCity(item, e, ref) {
      if (item.click) {
        this.obj[item.click](e)
      }
    },
    changeSelect(item, e) {
      if (item.click) {
        this.obj[item.click](item, e)
        return
      }
      if (item.value !== undefined && item.value !== '') {
        let obj = {}
        obj = item.data.find(item => {
          // 这里的userList就是上面遍历的数据源
          return item.id === e // 筛选出匹配数据
        })
        this.obj.fromValiData[item.prop] = obj.name
        this.obj.fromValiData[item.value] = item.needMobile ? obj.mobile : e // 不传id 传电话号码的情况
        // if (item.needMobile) {
        //   this.obj.fromValiData[item.value] = obj.mobile
        // } else {
        //   this.obj.fromValiData[item.value] = e
        // }
      }
    },
    visibleChange(item, e) {
      if (item.visibleChange) {
        this.obj[item.visibleChange](item, e)
      }
    },
    clearSelect(e) {
      this.fromValiData[e] = ''
    }
  },
  mounted() {},
  created() {}
}
</script>

<style scoped lang="scss">
</style>
