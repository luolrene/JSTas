<template>
  <div id="editor"></div>
</template>

<script>
import E from 'wangeditor'
export default {
  model: {
    prop: 'mainBody',
    event: 'sendData'
  },
  props: {
    mainBody: String
  },
  data() {
    return {
      editor: null,
      mainBodyText: this.mainBody,
      BASE_API: process.env.BASE_API
    }
  },
  watch: {

  },
  methods: {
    wangeditor() {
      this.editor = new E(document.getElementById('editor'))
      // 菜单功能
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'undeline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link', //插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', //表情
        'image', // 插入图片
        'table', // 表格
        // 'video', //插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      // 配置内容改变的回调
      this.editor.config.onchange = newHtml => {
        this.$emit('sendData', newHtml)
      }
      // 配置图片上传
      this.editor.config.uploadImgServer =
        this.BASE_API + '/JSCheck/Journalism/file/upload'
      this.editor.config.uploadFileName = 'file'
      this.editor.config.uploadImgMaxLength = 1 // 一次最多上传 1 个图片
      // 限制上传图片的大小
      this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024 // 10M
      let a = this.BASE_API + '/JSCheck'
      this.editor.config.uploadImgHooks = {
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function(insertImgFn, result) {
          // result 即服务端返回的接口
          console.log('customInsert', result)
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
          // insertImgFn('http://192.168.0.196:8080/JSCheck' + result.data[0].url)
          insertImgFn(a + result.data[0].url)
        }
      }
      // 上传图片的格式
      this.editor.config.uploadImgAccept = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'webp'
      ]
      // 删除上传的图片
      //  editor.config.onchange = (html)=>{this.editorContent=html;this.onchange(html);}

      // 富文本编辑器提示信息
      this.editor.config.placeholder = '请编辑需要反馈的内容'
      // 生成富文本编辑器
      this.editor.txt.html(this.mainBody)
      // this.editor.txt.clear(this.mainBody)
      this.editor.create()
    }
  },
  mounted() {
    this.wangeditor()
  }
}
</script>

<style scoped>
</style>
