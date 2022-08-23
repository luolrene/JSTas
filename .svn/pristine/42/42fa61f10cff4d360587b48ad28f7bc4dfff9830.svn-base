<template>
  <div class="operate-container">
    <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="doConfirm()" style="float: left;margin:0 15px 15px 0">确认</el-button>
    <tableItem
    :obj="this"
    tableHeight="450"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :isPage="false"
    :loading="loading"></tableItem>
  </div>
</template>

<script>
import {getSysQueryDict} from '../../api/common.js'
export default {
  props: {
    id: '',
    obj: '',
    layerid: ''
  },
  data () {
    return {
      loading: false,

      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '职务名称'
      }],
      multipleSelection: [],
      positionData: []
    }
  },
  methods: {
    doConfirm () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择职务',
          type: 'warning'
        })
        return
      }
      this.$parent.getSteps(this.multipleSelection)
      this.$layer.close(this.layerid)
      this.$share.message()
    },
    getdictData () {
      getSysQueryDict({'type': 'ZW'}).then(res => {
        this.tableData = res.result
      })
    }
  },
  mounted () {
    this.getdictData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
