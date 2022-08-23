<!-- 客户信息管理 -->
<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
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
        <template slot="other">
          <!-- 归属 -->
          <el-form-item label="归属">
            <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags clearable :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="区域选择">
            <el-cascader
              ref="cascader_city"
              v-model="areaValue"
              :options="options"
              :props="{ checkStrictly: true }"
              @change="changeCascaderCity($event)"
              :separator="'/'"></el-cascader>
          </el-form-item>
          <!-- <el-form-item label="行业选择">
            <el-cascader ref="cascader_msgDefend" v-model="msgDefendValue" :show-all-levels="false" :props="props_msgDefend" :options="optionsMsgDefend" @change="changeCascaderMsgDefend($event)" :separator="'/'"></el-cascader>
          </el-form-item> -->
          <el-form-item label="开始日期:" prop="startTime">
            <el-date-picker v-model="startTime" value-format="yyyy-MM-dd" type="date" placeholder="开始日期" style="width: 190px">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="nextTime">
            <el-date-picker v-model="nextTime" value-format="yyyy-MM-dd" type="date" placeholder="结束时间" style="width: 190px">
            </el-date-picker>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      </template>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <el-button type="danger" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-delete" @click="handleBatchDel()" v-if="this.$store.getters.userInfo.lev === '10'">批量删除</el-button>
      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-user-solid" @click="handleInfoVerity()">查询客户审批</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem
      :obj="this"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :button="button"
      :dataSum="fromValiData.dataSum"
      :loading="loading"
      @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import edit from './edit.vue'
import editEdit from './edit_edit.vue'
import user from './user.vue'
import details from './details.vue'
import get from './get.vue'
import infoVerity from './infoVerity.vue'
import options from '../../../utils/country-data.js'
import { getIndusQueryIndusTree } from '../../../api/jcxxgl/msgDefend.js'
import { getGroupQueryAllGroupsTree } from '../../../api/jcxxgl/group.js'
import {
  getCustQueryPageData,
  getCustDelCusts,
  getCrmSysGetUserAll
} from '@/api/client/info.js'
import { zzData } from '@/utils/public.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      loading: true,
      boxshow: false,
      optionData: null,
      newData: [],
      props: {
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      fromValiData: {
        pageSize: 10,
        pageNow: 1,
        startTime: '',
        nextTime: '',
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'name', label: '客户名称' },
        {
          type: 'select',
          prop: 'type',
          label: '客户性质',
          data: [
            { name: '个人', id: '1' },
            { name: '政府', id: '2' },
            { name: '事业单位', id: '3' },
            { name: '私有企业', id: '4' },
            { name: '国有企业', id: '5' },
            { name: '外资企业', id: '6' },
            { name: '合资企业', id: '7' }
          ]
        },
        {
          type: 'select',
          prop: 'industry',
          label: '行业选择',
          data: []
        },
        {
          type: 'select',
          prop: 'importantCustomers',
          label: '客户级别',
          data: [
            { name: '普通客户', id: '1' },
            { name: '重点客户', id: '2' },
            { name: 'VIP客户', id: '3' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'name',
          label: '客户名称',
          type: 'view',
          condition: function(params) {
            if (params.taskLev === '2') {
              return '#E6A23C'
            } else if (params.taskLev === '3') {
              return 'red'
            }
          },
          width: 140
        },
        {
          prop: 'industryName',
          label: '客户行业',
          width: 90
        },
        {
          prop: 'cityCode',
          label: '省-市-区',
          width: 120
        },
        {
          prop: 'typeName',
          label: '客户性质',
          width: 90
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 90
        },
        {
          prop: 'userNameS',
          label: '跟进人集合',
          width: 120
        }
      ],
      button: {
        width: 200,
        buttonList: [
          { name: '联系人', type: 'primary', click: 'handleUser' },
          {
            name: '移交',
            type: 'primary',
            click: 'handleGet',
            condition: params => {
              if (this.$store.getters.userInfo.positionName === '销售内勤') {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit'
          },
          {
            name: '删除',
            type: 'danger',
            click: 'handleDelete',
            condition: params => {
              if (this.$store.getters.userInfo.lev === '10') {
                return true
              } else {
                return false
              }
            }
          }
        ]
      },
      nextTime: '',
      startTime: '',
      multipleSelection: [],
      props_msgDefend: {
        multiple: true,
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true
      },
      props_affiliation: {
        multiple: true
      },
      options: options, // 存放城市数据
      optionsMsgDefend: [],
      optionsAffiliation: [
        {
          label: '我的',
          value: '2'
        },
        {
          label: '下属的',
          value: '3',
          children: []
        }
      ],
      areaValue: '',
      msgDefendValue: '',
      affiliationValue: '',
      groupOption: [],
      groupIds: []
    }
  },
  methods: {
    getListData() {
      this.loading = false
      getCustQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
            if (xdd.cityCode === 'null-null-null') {
              xdd.cityCode = '/'
            }
          })
          res.result.pageList.forEach(xdd => {
            switch (xdd.type) {
              case '1':
                xdd.typeName = '个人'
                break
              case '2':
                xdd.typeName = '政府'
                break
              case '3':
                xdd.typeName = '事业单位'
                break
              case '4':
                xdd.typeName = '私有企业'
                break
              case '5':
                xdd.typeName = '国有企业'
                break
              case '6':
                xdd.typeName = '外资企业'
                break
              case '7':
                xdd.typeName = '合资企业'
                break
            }
          })
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
    changeCascaderAffiliation() {
      getCrmSysGetUserAll({ id: this.$store.getters.userInfo.orgId }).then(
        res => {
          this.optionData = res.result
          let arr = this.optionData.map(item => {
            return {
              label: item.name,
              value: item.userId
            }
          })
          this.optionsAffiliation[1].children = arr
        }
      )
    },
    changeAffiliation(params) {
      if (params[0]) {
        if (params[0][0] === '2') {
          this.fromValiData.other = params[0][0]
          this.doSearch()
        }
      }
      let list = []
      params.forEach(item => {
        list.push(item[1])
      })
      this.fromValiData.subordinateIds = list.join(',')
      this.doSearch()
    },

    changeCascaderCity(params) {
      if (params.length === 1) {
        this.fromValiData.province = params[0]
        this.fromValiData.city = ''
        this.fromValiData.area = ''
      } else if (params.length === 2) {
        this.fromValiData.province = params[0]
        this.fromValiData.city = params[1]
        this.fromValiData.area = ''
      } else if (params.length === 3) {
        this.fromValiData.province = params[0]
        this.fromValiData.city = params[1]
        this.fromValiData.area = params[2]
      }
      this.fromValiData.area = params[2]
      this.doSearch()
    },
    getMsgDefendData() {
      getIndusQueryIndusTree({}).then(res => {
        this.fromData.forEach(xdd => {
          if (xdd.prop === 'industry') {
            xdd.data = res.result
          }
        })
        // this.optionsMsgDefend = zzData(res.result)
      })
    },
    changeCascaderMsgDefend(params) {
      if (params.length > 0) {
        this.fromValiData.industry = params[params.length - 1]
        this.doSearch()
      }
    },
    doSearch() {
      if (this.startTime.length > 0) {
        this.fromValiData.startTime = this.startTime
      }
      if (this.nextTime.length > 0) {
        this.fromValiData.nextTime = this.nextTime
      }
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset(formName) {
      this.fromValiData.pageNow = 1
      this.startTime = ''
      this.nextTime = ''
      delete this.fromValiData.startTime
      delete this.fromValiData.nextTime
      delete this.fromValiData.city
      delete this.fromValiData.province
      delete this.fromValiData.area
      delete this.fromValiData.industry
      delete this.fromValiData.subordinateIds
      this.fromValiData.other = ''
      this.areaValue = ''
      this.msgDefendValue = ''
      this.affiliationValue = ''
      this.groupIds = []
      this.fromValiData.groupId = null
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: ''
          }
        },
        area: this.$layer_Size.Normal,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleGet(params) {
      this.$layer.iframe({
        content: {
          content: get, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params
          }
        },
        area: this.$layer_Size.Normal,
        title: '移交',
        maxmin: true,
        shadeClose: false
      })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请先勾选要删除的列表数据', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.handleDelete(ids)
    },
    handleInfoVerity() {
      this.$layer.iframe({
        content: {
          content: infoVerity,
          params: this,
          data: {
            layerid: ''
          }
        },
        area: this.$layer_Size.Max,
        title: '查询客户审核',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: editEdit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            layerid: '',
            params: params,
            id: params.custId
          } // props
        },
        area: this.$layer_Size.Normal,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDelete(row) {
      let that = this
      this.$share.confirm({
        confirm: function() {
          getCustDelCusts({ id: row.id }).then(res => {
            if (res.code === 0) {
              that.$message({
                type: 'success',
                message: '删除成功'
              })
            }
            that.getListData()
          })
        }
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleUser(params) {
      this.$layer.iframe({
        content: {
          content: user, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            layerid: ''
          } // props
        },
        area: this.$layer_Size.Max,
        title: '联系人列表',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            secret: true
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '客户名称详情',
        maxmin: true,
        shadeClose: false
      })
    }
  },

  mounted() {
    this.getMsgDefendData()
    this.changeCascaderAffiliation()
    this.getListData()
    this.getGroupListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
