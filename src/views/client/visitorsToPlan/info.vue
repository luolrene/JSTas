<!-- 客户信息管理 -->
<template>
  <div class="operate-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData">
      <template v-slot:other>
        <el-form-item label="区域选择">
          <el-cascader ref="cascader_city" v-model="areaValue" :options="options" @change="changeCascaderCity($event)" :separator="'/'"></el-cascader>
        </el-form-item>
        <el-form-item label="行业选择">
          <el-cascader ref="cascader_msgDefend" v-model="msgDefendValue" :show-all-levels="false" :props="props_msgDefend" :options="optionsMsgDefend" @change="changeCascaderMsgDefend($event)" :separator="'/'"></el-cascader>
        </el-form-item>
      </template>
      <el-button type="primary" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
      <el-button type="primary" class="default-btn" icon="el-icon-circle-check" @click="doGet()">确认</el-button>
    </fromSearch>
    <tableItem ref="infoTable" :obj="this" :tableData="tableData" :tableHeader="tableHeader" :button="button" :dataSum="fromValiData.dataSum" :loading="loading" :isPage="false" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import options from '../../../utils/country-data.js'
import details from '../../client/info/details'
import { getCustQueryPageData } from '../../../api/contract/customer.js'
import { getIndusQueryIndusTree } from '../../../api/jcxxgl/msgDefend.js'
import { zzData } from '@/utils/public.js'
export default {
  components: {},
  props: {
    params: Object,
    ids: {
      type: Array,
      default: () => []
    },
    layerid: ''
  },
  data() {
    return {
      loading: false,

      fromValiData: {
        pageSize: 999,
        pageNow: 1
      },
      fromData: [
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
          }
        },
        {
          prop: 'industryName',
          label: '行业',
          width: 90
        },
        {
          prop: 'cityCode',
          label: '省-市-区',
          width: 160
        },
        {
          prop: 'address',
          label: '详细地址',
          width: 130
        },
        {
          prop: 'createTime',
          label: '创建时间',
          width: 130
        }
      ],
      button: {
        buttonList: [
          {
            name: '添加',
            type: 'primary',
            click: 'handleGet',
            condition: params => {
              return false
            }
          }
        ]
      },
      multipleSelection: [],
      props_msgDefend: {
        label: 'name',
        value: 'id',
        children: 'children',
        checkStrictly: true
      },
      options: options, // 存放城市数据
      optionsMsgDefend: [],
      areaValue: '',
      msgDefendValue: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCustQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
          })
          this.tableData = res.result.pageList

          if (this.ids.length === 0) {
            this.$nextTick(() => {
              this.tableData.forEach(xdd => {
                this.$refs.infoTable.$refs.myTable.toggleRowSelection(xdd, true)
              })
            })
          } else {
            this.$nextTick(() => {
              this.ids.forEach(xdd => {
                this.tableData.forEach(arc => {
                  if (arc.id === xdd) {
                    this.$refs.infoTable.$refs.myTable.toggleRowSelection(
                      arc,
                      true
                    )
                  }
                })
              })
            })
          }
          this.fromValiData.dataSum = res.result.dataSum
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err.message)
          this.loading = false
        })
    },
    getMsgDefendData() {
      getIndusQueryIndusTree({}).then(res => {
        this.optionsMsgDefend = zzData(res.result)
      })
    },
    changeCascaderCity(params) {
      this.fromValiData.area = params[2]
      this.doSearch()
    },
    changeCascaderMsgDefend(params) {
      if (params.length > 0) {
        this.fromValiData.industry = params[params.length - 1]
        this.doSearch()
      }
    },
    doGet() {
      if (this.multipleSelection.length === 0) {
        this.$share.message('请勾选需要的客户名称', 'warning')
        return
      }
      let ids = { id: '' }
      this.multipleSelection.forEach(xdd => {
        ids.id += xdd.id + ','
      })
      ids.id = ids.id.substring(0, ids.id.length - 1)
      this.$parent.fromValiData.ids = ids.id
      this.$parent.fromValiData.id = ids.name
      this.$parent.getData(ids)
      this.$layer.close(this.layerid)
      this.handleGet(ids)
    },

    handleGet(row) {
      // let id = row.id
      this.$layer.close(this.layerid)
      this.btnLoading = false
    },

    doSearch() {
      this.fromValiData.pageNow = 1
      this.getListData()
    },
    doReset() {
      this.fromValiData.pageNow = 1
      delete this.fromValiData.area
      delete this.fromValiData.industry
      this.areaValue = ''
      this.msgDefendValue = ''
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      this.getListData()
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: details, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '客户名称详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    }
  },
  mounted() {},
  created() {
    this.getListData()
    this.getMsgDefendData()
  }
}
</script>

<style scoped lang="scss">
</style>
