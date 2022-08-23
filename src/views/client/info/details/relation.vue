<template>
  <div class='operate-container contractDetail'>
    <div>
      <h4>上级客户</h4>
      <tableItem :obj='this' :tableData='tableData' :tableHeader='tableHeader' :dataSum='fromValiData.dataSum' :loading='loading' :isSelection='false' :isPage="false"></tableItem>
    </div>
    <div>
      <h4>下级客户</h4>
      <tableItem :obj='this' :tableData='tableDataB' :tableHeader='tableHeaderB' :dataSum='fromValiData.dataSumB' :loading='loading' :isSelection='false' @handleSizeChange='handleSizeChange'></tableItem>
    </div>
  </div>
</template>

<script>
import details from '../details'
import { getCustRelationship } from '@/api/client/info.js'
export default {
  props: {
    layerid: '',
    params: Object
  },
  data() {
    return {
      loading: false,
      fromValiData: {
        pageSize: 10,
        pageNow: 1
      },
      tableData: [],
      tableDataB: [],
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
          label: '客户行业'
        },
        {
          prop: 'cityCode',
          label: '省-市-区'
        },
        {
          prop: 'typeName',
          label: '客户类别'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        }
      ],
      tableHeaderB: [
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
          label: '客户行业'
        },
        {
          prop: 'cityCode',
          label: '省-市-区'
        },
        {
          prop: 'typeName',
          label: '客户类别'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        }
      ],
      size: '',
      details: {}
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getCustRelationship(this.fromValiData).then(res => {
        res.result.Upper.forEach(xdd => {
          xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
          if (xdd.cityCode === 'null-null-null') {
            xdd.cityCode = '/'
          }
        })
        res.result.Lower.forEach(xdd => {
          xdd.cityCode = xdd.province + '-' + xdd.city + '-' + xdd.area
          if (xdd.cityCode === 'null-null-null') {
            xdd.cityCode = '/'
          }
        })
        res.result.Upper.forEach(xdd => {
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
        res.result.Lower.forEach(xdd => {
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

        // 上级
        this.tableData = res.result.Upper
        this.fromValiData.dataSum = res.result.Upper.length
        // 下级
        this.tableDataB = res.result.Lower
        this.fromValiData.dataSumB = res.result.Lower.length

        this.loading = false
      })
    },

    handleSizeChange(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
      this.getListData()
    },
    handleSizeChangeB(val, pageSize) {
      this.fromValiData.pageNow = val
      if (pageSize) {
        this.fromValiData.pageSize = pageSize
      }
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
    }
  },
  mounted() {
    this.fromValiData.id = this.params.id
    this.fromValiData.parentCustomer = this.params.parentCustomer
    this.getListData()
  },
  created() {}
}
</script>
<style lang='scss'>
.contractDetail {
  .my-label {
    background-color: #e1f3d8 !important;
  }
}
</style>
