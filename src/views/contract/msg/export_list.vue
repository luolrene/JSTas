<template>
  <div class="operate-container">
    <el-scrollbar class="page-component__scroll" :native="false" style="height: 90%">
      <el-tree
        ref="myTree"
        node-key="id"
        :data="treeData"
        show-checkbox
        default-expand-all
        :props="defaultProps"
        :check-on-click-node="true">
      </el-tree>
    </el-scrollbar>

    <div style="display: flex;justify-content: flex-end;padding-right: 30px;">
      <el-button :size="$layer_Size.buttonSize" @click="onSelectAll">全选</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit">导出</el-button>
    </div>
  </div>
</template>

<script>
import {getContGetContColumns} from '../../../api/contract/msg.js'
export default {
  props: {
    params: {
      type: Object,
      default: () => {}
    },
    layerid: ''
  },
  data () {
    return {
      fromValidata: {},
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      host: process.env.BASE_API + process.env.JS_Server
    }
  },
  methods: {
    onSubmit() {
      let title = ''
      let content = ''
      let nodes = this.$refs.myTree.getCheckedNodes(true)
      if (nodes.length === 0) {
        this.$share.message('请勾选需要导出的字段名称', 'warning')
        return
      }
      nodes.forEach(xdd => {
        title += xdd.name + ','
      })
      title = title.substring(0, title.length - 1)

      let keys = Object.keys(this.fromValidata)
      let values = Object.values(this.fromValidata)
      values.forEach((xdd, index) => {
        if (xdd !== null && xdd !== '') {
          content += '&' + keys[index] + '=' + xdd
        }
      })
      window.open(this.host + '/cont/loadOut?' + 'title=' + title + '&token=' + this.$store.getters.userInfo.token + content)
    },
    onSelectAll() {
      this.$refs.myTree.setCheckedNodes(this.treeData)
    },
    getListData() {
      getContGetContColumns({}).then(res => {
        res.result.forEach(xdd => {
          this.treeData.push({
            id: xdd,
            name: xdd
          })
        })
      })
    }
  },
  mounted () {
    this.fromValidata = JSON.parse(JSON.stringify(this.params))
    delete this.fromValidata.pageSize
    delete this.fromValidata.pageNow
    delete this.fromValidata.queryType
    delete this.fromValidata.dataSum

    this.getListData()
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
