<template>
  <div class="operate-container">
    <el-scrollbar class="page-component__scroll" :native="false" style="height: 90%">
      <el-tree
        ref="myTree"
        node-key="id"
        :data="treeData"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultCheked"
        :props="defaultProps"
        :check-on-click-node="true">
      </el-tree>
    </el-scrollbar>
    <div style="display: flex;justify-content: flex-end;padding-right: 30px;">
      <el-button type="primary" :size="$layer_Size.buttonSize" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import {getSysAllMenu, getRoleAddRights} from '../../../api/jcxxgl/role.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data () {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultCheked: []
    }
  },
  methods: {
    onSubmit () {
      let ids = {}
      let nodes = this.$refs.myTree.getCheckedNodes(true)
      if (nodes.length === 0) {
        this.$share.message('请勾选菜单', 'warning')
        return
      }
      ids.roleId = this.params.id
      ids.rights = ''
      nodes.forEach(xdd => {
        ids.rights += xdd.id + ','
      })
      ids.rights = ids.rights.substring(0, ids.rights.length - 1)
      getRoleAddRights(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$parent.getListData()
        this.$share.message()
      })
    }
  },
  mounted () {
    getSysAllMenu({roleId: this.params.id}).then(res => {
      this.treeData = res.result.menuList

      res.result.selected.forEach(xdd => {
        this.defaultCheked.push(xdd.secondRight)
      })
      console.log(this.defaultCheked)
    })
  },
  created () {

  }
}
</script>

<style scoped lang="scss">

</style>
