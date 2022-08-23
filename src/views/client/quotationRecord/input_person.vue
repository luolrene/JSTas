<!-- 人员分配 -->
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
    <div>
      <span style="color: royalblue;">已选中人员(点击列表)：</span>
      <el-tag v-for="(xdd,index) in multipleSelection" :key="index" closable @close="getCloseTag(index)" style="margin-right: 10px;margin-bottom: 15px;">{{xdd.name}}</el-tag>
    </div>
    <tableItem
    :obj="this"
    :tableData="tableData"
    :tableHeader="tableHeader"
    :dataSum='fromValiData.dataSum'
    :loading="loading"
    customHeight="400"
    :isSelection="false"
    @getCellClick="getCellClick"
    @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import { gettransmitUserIdsModify } from '@/api/client/trackRecord.js'
import { getUserQueryPageData } from '../../../api/jcxxgl/user.js'
import { getSysQueryDict } from '../../../api/common.js'
import { getGroupQueryAllGroupsTree } from '../../../api/jcxxgl/group.js'
import { zzData } from '@/utils/public.js'
export default {
  props: {
    layerid: '',
    params: Object,
    isFenp: String,
    data: Array
  },
  components: {},
  data() {
    return {
      loading: false,

      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        name: null,
        position: null,
        groupId: null
      },
      fromData: [
        { type: 'input', prop: 'name', label: '用户名称' },
        { type: 'select', prop: 'position', label: '职务', data: [] }
      ],
      getData: {
        id: ''
      },
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '用户名称'
        },
        {
          prop: 'roleName',
          label: '角色'
        },
        {
          prop: 'positionName',
          label: '职务'
        },
        {
          prop: 'groupName',
          label: '分组'
        },
        {
          prop: 'lev',
          label: '用户级别'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '生日'
        }
      ],
      multipleSelection: [],
      positionData: [],
      groupOption: [],
      groupIds: [],

      userList: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getUserQueryPageData(this.fromValiData)
        .then(res => {
          this.tableData = res.result.pageList
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    getGroupListData() {
      getGroupQueryAllGroupsTree().then(res => {
        this.groupOption = zzData(res.result)
      })
    },
    getGroupChange(params) {
      this.fromValiData.groupId = params[params.length - 1]
    },
    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.groupIds = []
      this.fromValiData.groupId = null
      this.fromValiData.pageNow = 1
      delete this.fromValiData.isFenp
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    getdictData() {
      getSysQueryDict({ type: 'ZW' }).then(res => {
        this.positionData = res.result
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'position') {
            xdd.data = this.positionData
          }
        })
      })
    },
    getCellClick(params) {
      let isSwitch = true
      this.multipleSelection.forEach(xdd => {
        if (xdd.mobile === params.mobile) {
          isSwitch = false
        }
      })
      if (isSwitch) {
        this.multipleSelection.push(params)
      }
    },
    getCloseTag(index) {
      this.multipleSelection.splice(index, 1)
    },
    doConfirm() {
      let selectPerson = { name: '', mobile: '', userId: '' }
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要分配的人员', 'warning')
        return
      }
      this.multipleSelection.forEach(xdd => {
        selectPerson.name += xdd.name + ','
        selectPerson.mobile += xdd.mobile + ','
        selectPerson.userId += xdd.userId + ','
      })
      this.getData.name = selectPerson.name.substring(
        0,
        selectPerson.name.length - 1
      )
      this.getData.code = selectPerson.mobile.substring(
        0,
        selectPerson.mobile.length - 1
      )
      gettransmitUserIdsModify(this.getData).then(res => {
        this.$layer.close(this.layerid)
        this.$share.message('添加成功')
        this.$parent.getListData()
      })
    }
  },
  mounted() {
    this.getData.id = this.params.id
    this.getListData()
    this.getdictData()
    this.getGroupListData()
  },
  created() {
    if (this.isFenp) {
      this.fromValiData.isFenp = this.isFenp
    }
    if (this.data && this.data.length === 1) {
      let opermanNames = this.data[0].opermanName.split(',')
      let opermans = this.data[0].operman.split(',')
      for (let i = 0; i < opermanNames.length; i++) {
        this.multipleSelection.push({
          name: opermanNames[i],
          mobile: opermans[i]
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
