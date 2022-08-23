<template>
  <div class="operate-container">
    <el-form
      ref="fromValiData"
      :inline="true"
      :label-width="labelWidth + 'px'"
      :model="fromValiData"
      :rules="rules"
      :show-message="false"
      class="demo-form-inline"
      @submit.native.prevent
      style="display: flex;flex-wrap: wrap;width: 100%;">
      <fragment v-for="(item,index) in fromItemList" :key="index">
        <el-form-item
          class="inputFormItem"
          v-if="item.type === 'input'"
          v-show="!item.isShow"
          :label="item.label"
          :prop="item.isRqd ? item.prop : null"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
          <el-input
            v-model.trim="fromValiData[item.prop]"
            :disabled="item.disabled"
            :placeholder="item.placeholder ? item.placeholder:''"
            :type="item.type"
            style="width: calc(100% - 20px);">
            <template slot="append" v-if="item.append">{{item.append}}</template>
          </el-input>
          <i class="el-icon-receiving inputIconClass" v-if="item.click" @click="handleInputIcon(item)"></i>
        </el-form-item>

       <el-form-item
          class="inputAreaFormItem"
          v-else-if="item.type ==='textarea'"
          v-show="!item.isShow"
          :label="item.label"
          :prop="item.isRqd ? item.prop : null"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
          <el-input
            v-model.trim="fromValiData[item.prop]"
            :disabled="item.disabled"
            :placeholder="item.placeholder ? item.placeholder:''"
            :type="item.type"
            :rows="item.row ? item.row : 2"
            style="width: 100%;">
          </el-input>
          <i class="el-icon-receiving inputIconClass" v-if="item.click" @click="handleInputIcon(item)"></i>
        </el-form-item>

       <el-form-item
          class="inputFormItem"
          v-else-if="item.type === 'draw'"
          v-show="fromValiData.id !== null"
          :label="item.label"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
          <el-tag
            @click="handlePreview"
            style="width: 30%;text-align: center;cursor: pointer;">
            <span>图片上传</span></el-tag>
            <el-tooltip class="item" effect="dark" content="在线绘图" placement="top">
              <!-- <span @click="handleDraw" class="iconfont inputIconClass" style="font-size: 19px;">&#xeb7a;</span> -->
            </el-tooltip>
       </el-form-item>

       <el-form-item
          class="inputFormItem"
          v-else-if="item.type === 'select'"
          v-show="!item.isShow"
          :label="item.label"
          :prop="item.isRqd ? item.prop : null"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
          <el-select
            v-model="fromValiData[item.prop]"
            @change="changeSelect(item,$event)"
            @clear="clearSelect(item.prop)"
            :clearable='item.isNoClear'
            :filterable="item.filterable"
            :multiple="item.multiple"
            :placeholder="'请选择' + item.label"
            style="width: calc(100% - 20px);"
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
          class="inputFormItem"
          v-if="item.type === 'date' || item.type === 'datetime'"
          v-show="!item.isShow"
          :label="item.label"
          :prop="item.isRqd ? item.prop : null"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : null">
          <el-date-picker
            v-model="fromValiData[item.prop]"
            :value-format="getValueFormat(item.type)"
            :type="item.type"
            @change="clearDatePicker(item.prop,$event)"
            placeholder="选择日期"
            style="width: calc(100% - 20px);">
          </el-date-picker>
        </el-form-item>
      </fragment>
    </el-form>
  </div>
</template>

<script>
import imageUpload from '@/views/consult/task/upload'
export default {
  props: {
    obj: Object,
    fromItemList: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 230
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
    }
  },
  data () {
    return {

    }
  },
  methods: {
    getListData() {

    },
    getValueFormat(type) {
      if (type === 'date') {
        return 'yyyy-MM-dd'
      } else if (type === 'datetime') {
        return 'yyyy-MM-dd HH:mm:ss'
      }
    },
    handleInputIcon(item) {
      if (item.click) {
        this.obj[item.click](item)
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
        this.obj.fromValiData[item.value] = e
      }
    },
    clearSelect (e) {
      this.fromValiData[e] = ''
    },
    clearDatePicker (item, e) {
      this.fromValiData[item] = e === null ? '' : e
    },
    // 打开画图编辑器
    handleDraw() {
      // const { href } = this.$router.resolve({
      //   path: '/imgDraw',
      //   query: {id: this.fromValiData.id}
      // })
      // window.open(href, '_blank', console.log(href))
    },
    // 预览图片
    handlePreview() {
      this.$layer.iframe({
        content: {
          content: imageUpload, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            contId: this.fromValiData.id,
            fileType: '6',
            format: ['jpg', 'jpeg', 'png'],
            accept: '.jpg,.jpeg,.png',
            defaultName: '上传图片',
            delType: ''
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '图片列表',
        maxmin: true,
        shadeClose: false
      })
    }
  },
  mounted () {
  },
  created () {

  }
}
</script>

<style scoped lang="scss">
  .inputFormItem{
    width: calc(25% - 10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .inputAreaFormItem{
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  // 框前面的文字
  >>> .el-form-item__label{
    font-size: 13px;
  }
  // 输入框的高度
  >>> .el-input__inner,
  >>> .el-button--primary,
  >>> .el-button--danger{
    height: 34px;
    font-size: 13px;
    line-height: 37px;
  }

  >>> .el-form-item{
    margin-bottom: 12px;
  }
  // input框右边的小图标
  .inputIconClass{
    margin-left: 0;
  }
  // 表单输入框前面的文字
  >>> .el-form-item__label{
    line-height: 16px;
    text-align: left;
    margin-bottom: 2px;
    color: #0195DB;
  }
  // 解决input种textarea高度问题
  >>> .el-form-item__content{
    width: 100%;
    line-height: 30px;
  }
</style>
