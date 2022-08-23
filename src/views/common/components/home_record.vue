<template>
  <div class="record-container">
    <div class="title">
      <el-input v-model="fromValiData.fileName" style="margin:4px 160px 0 0;width: 410px;"></el-input>
      <div class="buttonGroup">
        <el-select
          v-if="fromValiData.id !== null && hasPoint && hasSelect"
          v-model="pointValue"
          @change="changePoint"
          @clear="clearPoint"
          clearable
          placeholder="请选择点位"
          style="width: 150px;margin-right: 10px;">
          <el-option
            v-for="(item,index) in pointListData"
            :key="index"
            :label="item.pointName"
            :value="item.id">
          </el-option>
        </el-select>
        <slot name="target"></slot>
        <el-button
          v-if="fromValiData.id !== null && hasPoint"
          type="primary"
          :size="$layer_Size.buttonSize"
          @click="handleAdd">
          新建</el-button>
        <el-button
          type="primary"
          :size="$layer_Size.buttonSize"
          :loading="loading_save"
          @click="handleSave">
          保存</el-button>
        <i title="批量保存表格"
           style="margin-left: 10px;"
           v-if="fromValiData.id !== null && hasBatchSave"
           @click="handleBatchSave"
           class="el-icon-s-order saveTable"></i>
      </div>
    </div>
    <el-scrollbar
      style="height: 100%;width: 100%;"
      class="page-component__scroll"
      :native="false">
      <slot></slot>
    </el-scrollbar>
  </div>
</template>

<script>
import {getOxcSaveDatas} from '@/api/sampling/original.js'
export default {
  props: {
    obj: Object,
    fromValiData: Object,
    pointListData: {
      type: Array,
      default: () => []
    },
    hasPoint: {
      type: Boolean,
      default: true
    },
    hasSelect: {
      type: Boolean,
      default: true
    },
    hasBatchSave: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading_save: false,

      pointValue: ''
    }
  },
  methods: {
    handleAdd() {
      this.$emit('handleAdd')
    },
    handleSave() {
      this.$emit('handleSave')
    },
    handleBatchSave() {
      if (this.obj) {
        this.obj.tableData.forEach(xdd => {
          if (xdd.id === null) {
            xdd.father = this.fromValiData.id
            xdd.type = '2'
            xdd.reportNo = this.fromValiData.reportNo
          }
        })
        getOxcSaveDatas(this.obj.tableData).then(res => {
          this.obj.getListData()
          this.$share.message('批量保存成功')
        })
      }
    },
    changePoint(e) {
      this.$emit('getPointValue', e)
    },
    clearPoint(e) {
      if (this.obj) {
        this.obj.pointValue = ''
      }
      try {
        this.$parent.pointValue = ''
      } catch (err) {
        this.$parent.$parent.$parent.pointValue = ''
      }
    }
  },
  mounted () {

  },
  created () {

  }
}
</script>

<style scoped lang="scss">
>>> .el-input__inner{
  height: 34px;
  font-size: 13px;
  line-height: 37px;
}
>>> .el-input__icon{
  line-height: 34px;
}
.saveTable{
  color: #0195DB;
  font-size: 28px;
}
.saveTable:hover{
  color: #00b2f8;
  cursor: pointer
}
</style>
