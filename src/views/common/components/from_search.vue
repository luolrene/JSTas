<template>
  <el-form :model="fromValiData" :label-width="labelWidth + 'px'" inline class="list-form" ref="fromValiData">
    <template v-if="isShow">
      <div v-for="(item,index) in fromData" :key="index">
        <el-form-item v-if="item.type ==='input'" :label="item.label + ':'" :prop="item.prop">
          <el-input v-model="fromValiData[item.prop]" :style="{width:$layer_Size.inputSelfInput}" />
        </el-form-item>

        <el-form-item v-else-if="item.type === 'select'" :label="item.label + ':'" :prop="item.prop">
          <el-select v-model="fromValiData[item.prop]" @change="changeSelect(item,$event)" @clear="clearSelect(item.prop)" :clearable='!item.isNoClear' :style="{width:$layer_Size.inputSelfSelect}" placeholder="">
            <el-option v-for="xdd in item.data" :key="xdd.id" :label="xdd.name" :value="xdd.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </template>
    <slot name="other"></slot>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    obj: Object,
    fromValiData: {
      type: Object,
      default: () => { }
    },
    fromData: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: null
    },
    // 切换是否显示搜索框
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    changeSelect(item, params) {
      if (item.click) {
        if (this.obj) {
          this.obj[item.click](params)
          return
        }
        try {
          this.$parent[item.click](params)
        } catch (err) {
          this.$parent.$parent.$parent[item.click](params)
        }
      } else {
        this.obj.doSearch()
      }
    },
    clearSelect(e) {
      this.fromValiData[e] = null
      this.obj.doSearch()
    }
  },
  mounted() {
    // console.log(this.$refs.fromValiData.$el.offsetHeight)
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
// 框前面的文字
>>> .el-form-item__label {
  font-size: 13px;
}
// 输入框的高度
>>> .el-input__inner,
>>> .el-button--primary,
>>> .el-button--danger {
  height: 34px;
}

>>> .el-form-item {
  margin-bottom: 8px;
}
/* 时间选择器小图标 */
>>> .el-date-editor .el-range__icon,
>>> .el-date-editor .el-range-separator {
  line-height: 28px;
}
</style>
