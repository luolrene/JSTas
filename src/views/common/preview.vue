<template>
  <div style="width: 100%;">
    <div v-if="type === 'img'" style="height: 100%;width: 100%;">
      <ul id="images" style="display: none;">
        <li v-for="(item,index) in imageList" :key="index"><img :src="item"></li>
      </ul>
    </div>
    <template v-if="type === 'file'">
      <iframe :src="fileUrl" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes"></iframe>
      <div style='position: absolute;bottom:70px;right: 70px;z-index: 999;cursor: pointer;'>
        <img src="../../../static/img/home/download.png" alt="" @click="getDownload">
      </div>
    </template>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'
export default {
  props: {
    layerid: '',
    params: Object,
    Interface: {
      type: String,
      default: '/file/download'
    }
  },
  components: {
    Viewer
  },
  data () {
    return {
      host: process.env.BASE_API + process.env.JS_Server,
      imageList: [],
      fileUrl: '',
      type: 'img'
    }
  },
  methods: {
    getDownload () {
      window.open(this.host + this.Interface + '?fileId=' + this.params.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.type === 'img') {
        var viewer = new Viewer(document.getElementById('images'), {
          inline: true,
          button: false,
          viewed: function () {
            viewer.zoomTo(0.4)
          }
        })
      }
    })
  },
  created () {
    let s = this.params.loadName
    let suffix = s.substring(s.lastIndexOf('.') + 1)
    this.src = this.host + this.Interface + '?fileId=' + this.params.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token
    // console.log(process.env.FILE_Server + encodeURIComponent(Base64.encode(this.host + '/file/download?fileId=' + this.params.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token + '&fullfilename=' + this.params.saveName)))
    if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'png') {
      this.imageList.push(this.src)
      this.type = 'img'
    } else {
      this.fileUrl = process.env.FILE_Server +
      encodeURIComponent(Base64.encode(this.host +
      this.Interface +
      '?fileId=' + this.params.id +
      '&type=1' +
      '&token=' + this.$store.getters.userInfo.token +
      '&fullfilename=' + this.params.saveName))
      this.type = 'file'
    }
    // console.log(process.env.FILE_Server + this.host + this.Interface + '?fileId=' + this.params.id + '&type=1' + '&token=' + this.$store.getters.userInfo.token + '&fullfilename=' + this.params.saveName)
  }
}
</script>

<style scoped lang="scss">

</style>
