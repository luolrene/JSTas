<template>
  <div class="pc-container">
    <fromSearch ref="fromSearch" :obj="this" :fromValiData="fromValiData" :fromData="fromData" :isShow="boxshow">
      <template v-if="boxshow">
        <template slot="other">
          <el-form-item label="归属">
            <el-cascader ref="cascader_affiliation" v-model="affiliationValue" :props="props_affiliation" collapse-tags clearable :options="optionsAffiliation" @change="changeAffiliation($event)" :show-all-levels="false"></el-cascader>
          </el-form-item>
        </template>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-search" @click="doSearch()">查询</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-refresh" @click="doReset('fromValiData')">重置</el-button>
        <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-user" @click="handleUse()" v-if="Number(this.$store.getters.userInfo.lev)===10">抄送人</el-button>
      </template>

      <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      <hideSearch mode="hide" :obj="this" v-show="boxshow"></hideSearch>
      <hideSearch mode="show" :obj="this" v-show="!boxshow"></hideSearch>
    </fromSearch>
    <tableItem :obj="this" :tableData="tableData" :tableHeader="tableHeader" :dataSum='fromValiData.dataSum' :isSelection="false" :button="button" :loading="loading" @handleSizeChange="handleSizeChange"></tableItem>
  </div>
</template>

<script>
import use from './use.vue'
import edit from './edit.vue'
import info from './details.vue'
import details from '../contactManage/details.vue'
import {getCrmOfferQueryPageData, getCrmOfferSubmit, getCrmOfferPointCopyOffer} from '@/api/client/quotationRecord.js'
import {getCrmSysGetUserAll} from '@/api/client/info.js'
export default {
  data() {
    return {
      loading: false,
      boxshow: false,

      fromValiData: {
        pageNow: 1,
        pageSize: 10,
        custName: '',
        other: ''
      },
      fromData: [
        { type: 'input', prop: 'custName', label: '客户名称' },
        { type: 'input', prop: 'offerUserName', label: '操作人' },
        {
          type: 'select',
          prop: 'offerState',
          label: '状态',
          data: [
            { id: '0', name: '草稿' },
            { id: '1', name: '待审核' },
            { id: '2', name: '审核通过' },
            { id: '3', name: '放弃' }
          ]
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: 'custName',
          label: '客户名称',
          width: 140,
          type: 'view'
        },

        {
          prop: 'offerTypeName',
          label: '报价类型',
          width: 90,
          type: 'view2'
        },
        {
          prop: 'typeName',
          label: '盖章类型',
          width: 90
        },
        {
          prop: 'offerDescribe',
          label: '描述',
          width: 120
        },
        {
          prop: 'offerAmountOfmoney',
          label: '金额',
          width: 90
        },
        {
          prop: 'offerStateName',
          label: '状态',
          width: 90
        },
        {
          prop: 'offerTime',
          label: '报价时间',
          width: 90
        },
        {
          prop: 'offerUserName',
          label: '操作人',
          width: 90
        }
      ],
      button: {
        width: 180,
        buttonList: [
          {
            name: '提交',
            type: 'primary',
            click: 'handleSubmit',
            condition: params => {
              if (params.offerState === '0') {
                return true
              }
            }
          },
          {
            name: '编辑',
            type: 'primary',
            click: 'handleEdit',
            condition: params => {
              if (params.offerState === '0') {
                return true
              }
            }
          },
          {
            name: '再次报价',
            type: 'primary',
            click: 'handleAgain',
            condition: params => {
              if (params.offerState === '2' || params.offerState === '3') {
                return true
              }
            }
          }
        ]
      },
      multipleSelection: [],
      props_affiliation: {
        multiple: true
      },
      optionsAffiliation: [
        {
          label: '我的',
          value: '2'
        },
        {
          label: '下属的',
          value: '3',
          children: []
        },
        {
          label: '抄送给我',
          value: '4'
        }
      ],
      affiliationValue: ''
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCrmOfferQueryPageData(this.fromValiData)
        .then(res => {
          res.result.pageList.forEach(xdd => {
            switch (xdd.offerState) {
              case '0':
                xdd.offerStateName = '草稿'
                break
              case '1':
                xdd.offerStateName = '待审核'
                break
              case '2':
                xdd.offerStateName = '审核通过'
                break
              case '3':
                xdd.offerStateName = '放弃'
            }
            switch (xdd.offerType) {
              case 1:
                xdd.offerTypeName = '含咨询'
                break
              case 2:
                xdd.offerTypeName = '不含咨询'
            }
            switch (xdd.type) {
              case '1':
                xdd.typeName = '报价章'
                break
              case '2':
                xdd.typeName = '公章'
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
    handleSubmit(params) {
      this.$share.confirm({
        message: '此操作将提交报价记录, 是否继续?',
        confirm: () => {
          let ids = {}
          ids.offerId = params.id
          getCrmOfferSubmit(ids).then(res => {
            this.$share.message('提交成功')
            this.getListData()
          })
        }
      })
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
        if (params[0][0] === '2' || params[0][0] === '4') {
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
    doSearch() {
      this.getListData()
    },
    doReset(formName) {
      this.$refs.fromSearch.$refs.fromValiData.resetFields()
      delete this.fromValiData.subordinateIds
      this.affiliationValue = ''
      this.fromValiData.other = ''
      this.getListData()
    },
    handleUse() {
      this.$layer.iframe({
        content: {
          content: use, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: 'BJJU'
          } // props
        },
        area: this.$layer_Size.Max,
        title: '抄送人',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAdd() {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          } // props
        },
        area: this.$layer_Size.Max,
        title: '添加',
        maxmin: true,
        shadeClose: false
      })
    },
    handleEdit(params) {
      this.$layer.iframe({
        content: {
          content: edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Max,
        title: '编辑',
        maxmin: true,
        shadeClose: false
      })
    },
    handleAgain(params) {
      this.$share.confirm({
        message: '此操作将进行再次报价, 是否继续?',
        type: 'warning',
        confirm: () => {
          let ids = {}
          ids.offerId = params.id
          getCrmOfferPointCopyOffer(ids).then(res => {
            this.$share.message('再次报价成功')
            this.getListData()
          })
        }
      })
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
        area: this.$layer_Size.Max,
        title: '客户详情',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetails2(params) {
      this.$layer.iframe({
        content: {
          content: info, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '报价记录详情',
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
  mounted() {
    this.changeCascaderAffiliation()
    this.getListData()
  },
  created() {}
}
</script>

<style scoped lang="scss">
</style>
