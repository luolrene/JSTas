<template>
  <div class="pc-container">
    <ul class="el-upload-list el-upload-list--text" v-for="(item,index) in fileList" :key="index">
       <li tabindex="0" class="el-upload-list__item is-ready">
         <a class="el-upload-list__item-name" @click="clickFile(item)">
           <i class="el-icon-document"></i>{{item.loadName}}
         </a>
   <!--      <label class="el-upload-list__item-status-label">
         <i class="el-icon-upload-success el-icon-circle-check"></i>
         </label> -->
         <i class="el-icon-close" @click.stop="delFile(item)" v-if="delType===''"></i>
<!--         <i class="el-icon-close-tip">按 delete 键可删除</i> -->
       </li>
     </ul>
  </div>
</template>

<script>
import preview from './preview.vue'
export default {
  data () {
    return {

    }
  },
  props: {
    fileList: {
      type: Array,
      default: function () {
        return []
      }
    },
    delType: {
      type: String,
      default: ''
    },
    Interface: {
      type: String,
      default: '/file/download'
    }
  },
  methods: {
    delFile (index) {
      this.$emit('delFile', index)
    },
    clickFile (params) {
      this.$layer.iframe({
        content: {
          content: preview, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            Interface: this.Interface
          }// props
        },
        area: this.$layer_Size.Self_Max,
        title: '预览',
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

</style>
