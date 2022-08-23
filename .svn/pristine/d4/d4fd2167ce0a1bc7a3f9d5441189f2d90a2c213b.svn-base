<template>
  <div class="myTable">
    <el-table
      :data="tableData"
      v-loading="loading"
      @expand-change="expandChange"
      @selection-change="handleSelectionChange"
      @cell-click="getCellClick"
      style="width: 100%"
      :max-height="tableHeight"
      highlight-current-row
      @sort-change="handleSortChange_major"
      :header-cell-style="{height: '44px',fontSize:'15px',background:'#eefaf6',color:'#000000'}"
      border>
      <el-table-column
        type="selection"
        align="center"
        width="45">
      </el-table-column>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <!-- 报告任务展开项 -->
      <el-table-column label="" type="expand" width="50">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.children"
            border
            class="reportTableClass"
            :header-cell-style="headerCellStyle">
            <el-table-column align="center" label="序号" width="70">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item,index) in tableHeader_report"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :fixed="item.fixed"
              :min-width="item.width">
              <template slot-scope="scope2">
                <span class="detailClass" v-if="item.type && item.type==='view'" @click="handleDetail_report(scope2.row)">{{scope2.row[item.prop]}}</span>
                <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope2.row):''}" v-else>{{scope2.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        :sortable="item.sort ? item.sort : null"
        show-overflow-tooltip>

        <!-- 表头搜索功能 -->
        <template slot="header" slot-scope="scope">
          <span @click.stop>
            <el-select
              v-if="item.queryType && item.queryType === 'select'"
              v-model="obj.fromValiData[scope.column.property]"
              @change="changeSelect(item,$event)"
              clearable
              placeholder=""
              style="margin-top: 4px;">
              <el-option
                v-for="(item,index) in item.queryData"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.queryType && item.queryType === 'dateTime'"
              v-model="taskTime"
              @change="changeSelect(item,$event)"
              type="daterange"
              clearable
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 240px;margin-top: 4px;">
            </el-date-picker>
            <el-button
              v-else-if="item.queryType && item.queryType === 'button'"
              @click="handlePerson"
              size="mini"
              style="margin-top: 4px;"
              >筛选人员</el-button>
            <el-input
              v-else
              v-model="obj.fromValiData[scope.column.property]"
              @change="handleEnter"
              size="mini"
              placeholder=""
              clearable
              style="margin-top: 5px;"/>
            <!-- 正常字体显示-->
            <span style="height: 33px;line-height: 32px;display: inline-block;">{{scope.column.label}}</span>
          </span>
         </template>

        <template slot-scope="scope">
          <span class="detailClass" v-if="item.type && item.type==='view'" @click="handleDetails(scope.row)">{{scope.row[item.prop]}}</span>
          <span class="detailClass" v-else-if="item.type && item.type==='view2'" @click="handleDetails2(scope.row)">
            <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope.row):''}">{{scope.row[item.prop]}}</span>
          </span>
          <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope.row):''}" v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="button && button.buttonList.length > 0" :min-width="button.width" fixed="right">
        <template slot-scope="scope">
          <slot name="button" :scope="scope"></slot>
          <el-button v-if="!item.hasOwnProperty('condition') || item.condition(scope.row)" size="mini" v-for="(item,index) in button.buttonList" :key="index" :type="item.type" plain :disabled="item.disabled" @click="handleClick(item,scope.$index, scope.row)">{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 10px;"></div>
    <div class="block page" align="right">
      <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page.sync="currentPages" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" :total="dataSum" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import details from '../../contract/msg/details.vue'
import majorReport from './major_report.vue'
import cycle from './cycle.vue'
import { getContractQueryContractById } from '@/api/contract/msg.js'
import { getReportTaskQueryPageList } from '@/api/sampling/majorTask.js'
import inputPerson from './input_person'
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
        pageNow: 1
      },

      tableHeader_report: [
        {
          prop: 'name',
          label: '监测计划',
          type: 'view',
          width: 80
        },
        {
          prop: 'reportNo',
          label: '报告编号',
          sort: 'custom',
          width: 90
        },
        {
          prop: 'proName',
          label: '项目名称',
          width: 100
        },
        {
          prop: 'leaseTask',
          label: '仪器指派任务',
          width: 80
        },
        {
          prop: 'custName',
          label: '客户名称',
          width: 130
        },
        {
          prop: 'isCycleName',
          label: '是否周期',
          width: 60
        },
        {
          prop: 'opermanName',
          label: '当前处理人',
          width: 60
        },
        {
          prop: 'statusName',
          label: '报告任务状态',
          width: 60
        }
      ],
      tableHeight: '',
      headerCellStyle: {
        height: '36px',
        background: '#eefaf6',
        color: '#333333'
      },
      taskTime: []
    }
  },
  methods: {
    // 列表展开
    expandChange(row, expanded) {
      if (expanded.length === 0) {
        return
      }
      this.fromValiData.mainId = row.id
      this.fromValiData.orderBy = 'reportNo,asc'
      getReportTaskQueryPageList(this.fromValiData).then(res => {
        res.result.pageList.forEach(xdd => {
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
      })
    },
    handleEnter() {
      this.obj.getListData()
    },
    handlePerson() {
      let data = []
      if (this.obj.fromValiData.operman !== undefined && this.obj.fromValiData.operman !== '') {
        data.push({
          operman: this.obj.fromValiData.operman,
          opermanName: this.obj.fromValiData.opermanName
        })
      }
      this.$layer.iframe({
        content: {
          content: inputPerson, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            data: data
          } // props
        },
        area: this.$layer_Size.Max,
        title: '人员筛选',
        maxmin: true,
        shadeClose: false
      })
    },
    getPerson(data) {
      return new Promise((resolve, reject) => {
        this.obj.fromValiData.opermanName = data.mobile
        this.obj.fromValiData.operman = data.name
        this.obj.getListData()
        resolve(true)
      })
    },
    changeSelect (item, params) {
      params = params === '' ? null : params
      if (item.prop.length > 4 && item.prop.substring(item.prop.length - 4, item.prop.length) === 'Name') {
        this.obj.fromValiData[item.prop.substring(0, item.prop.length - 4)] = params
      } else {
        this.obj.fromValiData[item.prop] = params
      }
      if (this.taskTime && this.taskTime.length > 0) {
        this.obj.fromValiData.startTime = this.taskTime.join(',')
      }
      this.obj.getListData()
    },
    handleDetails(params) {
      getContractQueryContractById({ contId: params.contId }).then(res => {
        this.$layer.iframe({
          content: {
            content: details, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: res.result
            } // props
          },
          area: this.$layer_Size.Self_Max,
          title: '查看详情',
          maxmin: true,
          shadeClose: false
        })
      })
    },
    handleDetails2(params) {
      if (params.isCycle === '1') {
        let isShow = false
        if (params.checkDetail === null) {
          isShow = true
        }
        this.$layer.iframe({
          content: {
            content: cycle, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              params: params,
              isShow: isShow
            } // props
          },
          area: this.$layer_Size.Normal,
          title: '周期检测内容',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    handleDetail_report(params) {
      this.$layer.iframe({
        content: {
          content: majorReport, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {
            params: params
          } // props
        },
        area: this.$layer_Size.Self_Max,
        title: '报告任务',
        maxmin: true,
        shadeClose: false
      })
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
    handleSortChange_major(column, prop, order) {
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
  >>> .el-table td, .el-table th{
    padding: 10px;
  }
  >>> .el-table--enable-row-transition .el-table__body td {
    height: 40px;
    font-size: 14px;
    color: #333333;
  }
  // 输入框的高度
  >>> .el-input__inner,
  >>> .el-button{
    height: 28px;
  }
  // 下拉框 下拉图标垂直居中
  >>> .el-input__suffix{
    display: flex;
    align-items: center;
  }
  >>> .el-range-editor.el-input__inner{
    padding: 0 0 0 10px;
  }
  /* 时间选择器小图标 */
  >>> .el-date-editor .el-range__icon, >>> .el-date-editor .el-range-separator{
    line-height: 27px;
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
