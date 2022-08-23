<!-- 人员录入 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <el-form-item label="分组:" slot="other">
        <el-cascader
            v-model="groupIds"
            :options="groupOption"
            :show-all-levels="false"
            @change="getGroupChange"
            :props="props"
            :style="{width:$layer_Size.inputSelfNorWidth}"
            placeholder=""></el-cascader>
      </el-form-item>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-check" @click="doConfirm()">确认</el-button>
    </fromSearch>
    <el-tag
      style="margin-bottom: 5px;"
      closable
      v-show="selectPerson.name"
      @close="closePerson">{{selectPerson.name}}</el-tag>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    :isSelection="false"
    customHeight="425"
    @getCellClick="getCellClick"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import {getUserQueryPageData} from '../../api/jcxxgl/user.js'
import {getSysQueryDict} from '../../api/common.js'
import {getGroupQueryAllGroupsTree} from '../../api/jcxxgl/group.js'
import {zzData} from '@/utils/public.js'
export default {
  props: {
    layerid: '',
    isFenp: String
  },
  components: {

  },
  data () {
    return {
      loading: false,

      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: '10',
        pageNow: '1',
        name: null,
        position: null,
        groupId: null
      },
      fromData: [
        {type: 'input', prop: 'name', label: '用户名称'},
        {type: 'select', prop: 'position', label: '职务', data: []}
      ],
      tableData: [

      ],
      tableHeader: [{
        prop: 'name',
        label: '用户名称'
      }, {
        prop: 'roleName',
        label: '角色'
      }, {
        prop: 'positionName',
        label: '职务'
      }, {
        prop: 'groupName',
        label: '分组'
      }, {
        prop: 'lev',
        label: '用户级别'
      }, {
        prop: 'sex',
        label: '性别'
      }, {
        prop: 'birth',
        label: '生日'
      }],
      multipleSelection: [],
      positionData: [],
      groupOption: [],
      groupIds: [],
      selectPerson: {}
    }
  },
  methods: {
    getListData () {
      this.loading = true
      getUserQueryPageData(this.fromValiData).then(res => {
        this.tableData = res.result.pageList
        this.fromValiData.dataSum = res.result.dataSum
        this.selectPerson = {}
        this.loading = false
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    getGroupListData () {
      getGroupQueryAllGroupsTree().then(res => {
        this.groupOption = zzData(res.result)
      })
    },
    getGroupChange (params) {
      this.fromValiData.groupId = params[params.length - 1]
    },
    doSearch () {
      this.fromValiData.pageNow = '1'
      delete this.fromValiData.isFenp
      this.getListData()
    },
    doReset (formName) {
      this.groupIds = []
      this.fromValiData.groupId = null
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.doSearch()
    },
    handleSizeChange (val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getdictData () {
      getSysQueryDict({'type': 'ZW'}).then(res => {
        this.positionData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'position') {
            xdd.data = this.positionData
          }
        })
      })
    },
    getCellClick (params) {
      this.selectPerson = params
    },
    closePerson() {
      this.selectPerson = {}
    },
    doConfirm () {
      if (!this.selectPerson.hasOwnProperty('name')) {
        this.$share.message('请点击表格选择人员', 'warning')
        return
      }
      this.$parent.getPerson(this.selectPerson).then(arg => {
        if (arg) {
          this.$layer.close(this.layerid)
          this.$share.message()
        }
      })
    }
  },
  mounted () {
    this.getListData()
    this.getdictData()
    this.getGroupListData()
  },
  created () {
    if (this.isFenp) {
      this.fromValiData.isFenp = this.isFenp
    }
  }
}
</script>

<style scoped lang="scss">

</style>
