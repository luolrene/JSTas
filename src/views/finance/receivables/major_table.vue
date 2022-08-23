<template>
  <div class="myTable">
    <el-table :data="tableData" v-loading="loading" @expand-change="expandChange" @selection-change="handleSelectionChange" @cell-click="getCellClick" style="width: 100%" :max-height="tableHeight" highlight-current-row @sort-change="handleSortChange_major" :header-cell-style="{height: '44px',fontSize:'15px',background:'#eefaf6',color:'#000000'}" border>
      <el-table-column align="center" label="序号" width="70">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <!-- 项目信息展开项 -->
      <el-table-column label="" type="expand" width="70" style="font-size:14px;">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" border class="reportTableClass" :header-cell-style="headerCellStyle">
            <el-table-column align="center" label="序号" width="60">
              <template slot-scope="scope">
                <span style="color:#14b9ff;">{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-for="(item,index) in tableHeader_report" :key="index" :prop="item.prop" :label="item.label" :fixed="item.fixed" :min-width="item.width">
              <template slot-scope="scope2">
                <span class="detailClass" v-if="item.type && item.type==='view'" @click="handleDetail_report(scope2.row)">{{scope2.row[item.prop]}}</span>
                <span class="detailClass" v-else-if="item.type && item.type==='view2'" @click="handleDetail_report2(scope2.row)">{{scope2.row[item.prop]}}</span>
                <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope2.row):''}" v-else>{{scope2.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="button1 && button1.buttonList.length > 0" :min-width="button1.width">
              <template slot-scope="scope">
                <slot name="button" :scope="scope"></slot>
                <el-button v-if="!item.hasOwnProperty('condition') || item.condition(scope.row)" size="mini" v-for="(item,index) in button1.buttonList" :key="index" :type="item.type" plain :disabled="item.disabled" @click="handleClick(item,scope.$index, scope.row)">{{item.name}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" v-for="(item,index) in tableHeader" :key="index" :prop="item.prop" :label="item.label" :min-width="item.width" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="detailClass" v-if="item.type && item.type==='view'" @click="handleDetails(scope.row)">{{scope.row[item.prop]}}</span>
          <span class="detailClass" v-else-if="item.type && item.type==='view2'" @click="handleDetails2(scope.row)">
            <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope.row):''}">{{scope.row[item.prop]}}</span>
          </span>
          <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope.row):''}" v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-if="button && button.buttonList.length > 0" :min-width="button.width">
        <template slot-scope="scope">
          <slot name="button" :scope="scope"></slot>
          <el-button v-if="!item.hasOwnProperty('condition') || item.condition(scope.row)" size="mini" v-for="(item,index) in button.buttonList" :key="index" :type="item.type" plain :disabled="item.disabled" @click="handleClick(item,scope.$index, scope.row)">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block page" align="right" style="margin-top: 10px;">
      <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page.sync="currentPages" :page-sizes="[10, 50, 100,500]" :page-size="pageSize" :total="dataSum" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import invoice from './invoice.vue'
import custDetails from '../../client/info/details.vue' // 客户信息
import constDetails from '../../contract/msg/details.vue' // 项目信息
import { getCrmAccountsReceivableContractQueryPageData } from '@/api/finance/receivables.js'
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    button: {
      type: Object,
      default: () => {}
    },
    dataSum: {
      // 总条目数
      type: Number,
      default: 0
    },
    obj: {
      type: Object
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPages: 1,
      pageSize: 10,
      fromValiData: {
        pageSize: 99999,
        pageNow: 1,
        clientData: null,
        state: this.$parent.fromValiData.state
      },
      tableHeader_report: [
        {
          prop: 'project',
          label: '合同名称',
          type: 'view',
          width: 140
        },
        {
          prop: 'contNo',
          label: '合同编号',
          width: 90
        },
        {
          prop: 'sellerName',
          label: '经办人',
          width: 80
        },
        // {
        //   prop: 'plateName',
        //   label: '项目版块',
        //   width: 80
        // },
        // {
        //   prop: 'projectTypeName',
        //   label: '业务类别',
        //   width: 80
        // },
        // {
        //   prop: 'payTypeName',
        //   label: '付款方式',
        //   width: 80
        // },
        {
          prop: 'price',
          label: '合同签订金额',
          width: 90
        },
        {
          prop: 'actualMoney',
          label: '应收总金额',
          width: 80
        },
        {
          prop: 'accountsMoneyAlready',
          label: '已回款金额',
          width: 80
        },
        {
          prop: 'noAccountsMoneyAlready',
          label: '未回款金额',
          width: 80
        },
        {
          prop: 'crmBillingStateName',
          label: '是否已开票',
          width: 80,
          type: 'view2'
        },
        {
          prop: 'billMoney',
          label: '开票总金额',
          width: 80
        },
        {
          prop: 'sumReportNo',
          label: '应出报告任务数',
          width: 100
        },
        {
          prop: 'alreadyIssue',
          label: '已出报告数',
          width: 80
        },
        {
          prop: 'endTime',
          label: '合同完成时间',
          width: 90
        },
        {
          prop: 'expOne',
          label: '备注',
          width: 150
        }
      ],
      tableHeight: '',
      headerCellStyle: {
        height: '36px',
        background: '#eefaf6',
        color: '#333333'
      },
      button1: {
        width: 200,
        buttonList: [
          {
            name: '完成',
            type: 'primary',
            click: 'handleAccomplish',
            condition: params => {
              if (params.accountsReceivableState === 2&&params.accountsMoneyAlready===0) {
                return true
              } else {
                return false
              }
            }
          },
          {
            name: '应收信息',
            type: 'primary',
            click: 'handleReceivableInfo'
          }
        ]
      }
    }
  },
  watch: {
    'fromValiData.state': {
      deep: true,
      handler: function(newV, oldV) {
        this.fromValiData.state = newV
      }
    }
  },
  methods: {
    // 列表展开
    expandChange(row, expanded) {
      if (expanded.length === 0) {
        return
      }
      this.clientData = row
      this.fromValiData.custId = row.id
      getCrmAccountsReceivableContractQueryPageData(this.fromValiData).then(
        res => {
          res.result.pageList.forEach(xdd => {
             if(!xdd.actualMoney){
              xdd.actualMoney=0
            }
            xdd.noAccountsMoneyAlready =
              xdd.actualMoney - xdd.accountsMoneyAlready
            if (xdd.crmBillingState === 2) {
              xdd.crmBillingStateName = '已开票'
            } else {
              xdd.crmBillingStateName = '未开票'
            }
            switch (xdd.status) {
              case '0':
                xdd.statusName = '未启动'
                break
              case '1':
                xdd.statusName = '启动'
                break
              case '2':
                xdd.statusName = '撤回'
                break
              case '3':
                xdd.statusName = '完成'
                break
              case '4':
                xdd.statusName = '放弃'
                break
            }
            switch (xdd.isCycle) {
              case '1':
                xdd.isCycleName = '是'
                break
              case '0':
                xdd.isCycleName = '否'
                break
            }
          })
          row.children = res.result.pageList
        }
      )
    },
    handleDetails(params) {
      this.$layer.iframe({
        content: {
          content: custDetails, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '客户信息',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetail_report(params) {
      this.$layer.iframe({
        content: {
          content: constDetails, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params,
            client: this.clientData
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '合同信息',
        maxmin: true,
        shadeClose: false
      })
    },
    handleDetail_report2(params) {
      if (params.crmBillingState === 2) {
        this.$layer.iframe({
          content: {
            content: invoice, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params
            } // props
          },
          area: this.$layer_Size.Max,
          title: '开票信息',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    // 表格列表按钮
    handleClick(item, index, row) {
      if (item.click) {
        if (this.obj) {
          this.obj[item.click](row)
          return
        }
        try {
          this.$parent[item.click](row)
        } catch (err) {
          this.$parent.$parent.$parent[item.click](row)
        }
      } else {
        this.$message({
          type: 'warning',
          message: '未定义方法'
        })
      }
    },
    handleCurrentChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$emit('handleSizeChange', 1, this.pageSize)
    },
    handleSelectionChange(val) {
      if (this.obj) {
        this.obj.multipleSelection = val
        return
      }
      this.$parent.multipleSelection = val
      this.$parent.$parent.$parent.multipleSelection = val
    },
    handleSortChange_major(column) {
      if (this.obj) {
        this.obj.fromValiData.orderBy = column.prop
        if (column.order === 'ascending') {
          this.obj.fromValiData.orderBy += ',asc'
        } else {
          this.obj.fromValiData.orderBy += ',desc'
        }
        this.obj.doSearch()
      }
    },
    // 点击列表
    getCellClick(val) {
      this.$emit('getCellClick', val)
    }
  },
  mounted() {},
  created() {
    this.tableHeight = document.documentElement.clientHeight - 260
  }
}
</script>

<style scoped lang="scss">
// 分页
>>> .el-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}
// 鼠标移入分页
>>> .el-pagination__sizes .el-input .el-input__inner:hover,
>>> .el-select .el-input.is-focus .el-input__inner,
>>> .el-select .el-input__inner:focus {
  border: 1px solid #0195db;
}
// 选中页数
>>> .el-pager li.active,
>>> .el-select-dropdown__item.selected {
  color: #0195db;
}

>>> .el-table .cell,
>>> .el-table--border td:first-child .cell,
>>> .el-table--border th:first-child .cell {
  padding-left: 5px;
  padding-right: 5px;
}

// 表头
>>> .el-table--border th,
>>> .el-table__fixed-right-patch {
  font-weight: 400;
  padding: 0;
}
>>> .el-table td,
.el-table th {
  padding: 10px;
}
>>> .el-table--enable-row-transition .el-table__body td {
  height: 40px;
  font-size: 14px;
  color: #333333;
}

.myTable .detailClass {
  color: #409eff;
  font-size: 14px;
  cursor: pointer;
}
.myTable .detailClass:hover {
  color: #14b9ff;
  text-decoration: underline;
}
</style>
