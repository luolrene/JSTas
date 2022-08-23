<template>
  <div class="pc-container">
    <el-descriptions title="" :column="1">
        <el-descriptions-item label="方案名称">{{params.name}}</el-descriptions-item>
    </el-descriptions>
    <fileList :fileList="fileList" style="padding:0"></fileList>
  </div>
</template>

<script>
import {getFileQueryFileList} from '../../../api/file.js'
import fileList from '../../common/fileList.vue'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  components: {
    fileList
  },
  data () {
    return {
      fileList: []
    }
  },
  methods: {

  },
  mounted () {
    getFileQueryFileList({id: this.params.id, type: '3'}).then(res => {
      this.fileList = res.result
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
