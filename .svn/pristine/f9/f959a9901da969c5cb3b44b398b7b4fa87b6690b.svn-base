<template>
  <div class="myTable">
    <el-table ref="myTable"
      :data="tableData"
      :border="tableBorder"
      v-loading="loading"
      style="width: 98%;margin-left: 1%;"
      :max-height="tableHeight"
      element-loading-text="加载数据中"
      element-loading-spinner="el-icon-loading"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @cell-click="getCellClick"
      @sort-change="handleSortChange"
      :header-cell-style="{background:'#eefaf6',color:'#000000'}">
     <el-table-column label="排序" width="90" v-if="isOrder">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.edit"
            @keydown.native="inputLimit"
            v-model="scope.row['order']"
            placeholder="正整数"
            style="width: 94%;"></el-input>
          <span v-else>{{scope.row['order']}}</span>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        align="center"
        width="50"
        :selectable="isSelectable ? getSelectable : null"
        v-if="isSelection"></el-table-column>
      <el-table-column align="center" label="序号" width="60" v-if="isQuantity">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <fragment v-for="(item,index) in tableHeader" :key="index">
        <fragment v-if="Array.isArray(item.data) && item.data.length > 0">
          <el-table-column :label="item.label" :min-width="item.width">
            <el-table-column
              v-for="(xdd,index2) in item.data" :key="index2"
              :sortable="xdd.sort ? xdd.sort : null"
              :label="xdd.label"
              :fixed="xdd.fixed"
              :prop="xdd.prop"
              :min-width="xdd.width"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input
                  v-if="(xdd.type && xdd.type==='input') && scope.row.edit"
                  v-model="scope.row[xdd.prop]"
                  :placeholder="xdd.placeholder"
                  style="width: calc(100% - 10px)"></el-input>
                <!-- 输入框数据联动 -->
                <el-input
                  v-else-if="(xdd.type && xdd.type==='inputLinkage') && scope.row.edit"
                  v-model="scope.row[xdd.prop]"
                  @input="changInput(xdd,scope.row,$event)"
                  :placeholder="xdd.placeholder"
                  style="width: calc(100% - 10px)"></el-input>
                <span :style="{color:xdd.hasOwnProperty('condition') ? xdd.condition(scope.row):''}" v-else>{{scope.row[xdd.prop]}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </fragment>
        <fragment v-else>
          <el-table-column
            :sortable="item.sort ? item.sort : null"
            :label="item.label"
            :fixed="item.fixed"
            :prop="item.prop"
            :min-width="item.width"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input
                v-if="(item.type && item.type==='input') && scope.row.edit"
                v-model="scope.row[item.prop]"
                :placeholder="item.placeholder"
                style="width: calc(100% - 10px)"></el-input>
              <el-input
                v-else-if="(item.type && item.type==='inputLinkage') && scope.row.edit"
                v-model="scope.row[item.prop]"
                @input="changInput(item,scope.row,$event)"
                :placeholder="item.placeholder"
                style="width: calc(100% - 10px)"></el-input>
              <el-date-picker
                v-else-if="(item.type && (item.type === 'date' || item.type === 'datetime')) && scope.row.edit"
                v-model="scope.row[item.prop]"
                @change="changeDatetime($event,scope,item.prop)"
                :value-format="getValueFormat(item.type)"
                :type="item.type"
                placeholder="选择日期时间"
                default-time="12:00:00"
                style="width: calc(100% - 10px)">
              </el-date-picker>
              <el-time-picker
                v-else-if="(item.type && item.type==='hmsTime') && scope.row.edit"
                v-model="scope.row[item.prop]"
                @change="changeDatetime($event,scope,item.prop)"
                 :value-format="item.format ? item.format :'HH:mm:ss'"
                 :is-range="item.isRange"
                placeholder=""
                style="width: calc(100% - 10px)">
              </el-time-picker>
              <span :style="{color:item.hasOwnProperty('condition') ? item.condition(scope.row):''}" v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
        </fragment>
      </fragment>

      <el-table-column label="操作" align="center" fixed="right" v-if="button && button.buttonList.length > 0" :min-width="button.width">
        <template slot-scope="scope">
          <slot name="button" :scope="scope"></slot>
          <el-button
            v-if="!item.hasOwnProperty('condition') || item.condition(scope.row)"
            size="mini" v-for="(item,index) in button.buttonList"
            :key="index" :type="item.type"
            plain
            :disabled="item.disabled"
            @click.stop="handleClick(item,scope.$index, scope.row)">
              <span v-if="item.name === '编辑'"><i class="el-icon-check"></i></span>
              <span v-else-if="item.name === '复制'"><i class="el-icon-document-copy"></i></span>
              <span v-else-if="item.name === '删除'"><i class="el-icon-delete"></i></span>
              <span v-else>{{item.name}}</span>
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 5px;"></div>
    <div class="block page" align="right" v-if="isPage">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page.sync="currentPages"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageSize"
        :total="dataSum"
        layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
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
    obj: {
      type: Object
    },
    dataSum: {
      // 总条目数
      type: Number,
      default: 0
    },
    isPage: {
      // 是否显示分页
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    isSelection: {
      type: Boolean,
      default: true
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    tableBorder: {
      type: Boolean,
      default: true
    },
    // 是否有序号
    isQuantity: {
      type: Boolean,
      default: false
    },
    // 是否可以手动排序
    isOrder: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      currentPages: 1,

      tableHeight: ''
    }
  },
  methods: {
    handleClick(item, index, row) {
      if (item.click) {
        if (this.obj) {
          this.obj[item.click](row, index)
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
    getValueFormat(type) {
      if (type === 'date') {
        return 'yyyy-MM-dd'
      } else if (type === 'datetime') {
        return 'yyyy-MM-dd HH:mm:ss'
      }
    },
    changeDatetime(e, params, value) {
      if (e === null) {
        params.row[value] = ''
      }
    },
    handleSelectionChange(val) {
      if (this.obj) {
        this.obj.multipleSelection = val
        return
      }
      this.$parent.multipleSelection = val
      this.$parent.$parent.$parent.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.$emit('handleSizeChange', 1, this.pageSize)
    },
    getCellClick(val) {
      this.$emit('getCellClick', val)
    },
    // 输入框值改变时
    changInput(params, row, value) {
      this.obj.tableData.forEach(xdd => {
        if (xdd.zd51 === row.zd51) {
          xdd[params.prop] = value
        }
      })
    },
    // 检验是否为数字
    inputLimit(e) {
      let num = e.target.value || ''
      let code = e.which || e.keyCode
      let str =
        e.key && e.key !== 'Unidentified' ? e.key : num.substr(num.length - 1)
      // 无论任何情况，皆可执行
      if (code === '8') {
        return true
      }
      if (e.code === 'Backspace' || e.key === '.') {
        e.returnValue = true
        return true
      }
      // 没有满足任何一种情况，中断执行
      if (!(/[\d.]/.test(str) || code === '190')) {
        e.returnValue = false
        return false
      }
      return true
    },
    // 排序
    handleSortChange(column) {
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
    // 初始化表格列表是否可选
    getSelectable(row, index) {
      if (this.obj) {
        return this.obj.getSelectable(row, index)
      }
      try {
        return this.$parent['getSelectable'](row, index)
      } catch (err) {
        return this.$parent.$parent.$parent['getSelectable'](row, index)
      }
    },
    getHeight() {
      // 获取浏览器高度并计算得到表格所用高度。
      this.tableHeight = document.documentElement.clientHeight - 260
      this.$forceUpdate()
    }
  },
  created() {
    this.getHeight()
    window.addEventListener('resize', () => {
      this.getHeight()
    })
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
.myTable >>> .el-table--border th,
.myTable >>> .el-table__fixed-right-patch {
  height: 38px;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
}
>>> .el-table th.is-leaf{
  border-bottom: 0;
}
>>> .el-table td, .el-table th{
  padding: 0;
}
>>> .el-table--enable-row-transition .el-table__body td {
  height: 34px;
  font-size: 14px;
  color: #333333;
}
>>> .el-input__inner{
  height: 28px;
}
/* 时间选择器小图标 */
>>> .el-input__prefix{
  top: 0px;
}
>>> .el-input__icon{
  line-height: 28px;
}
>>> .el-pagination .el-input__inner{
  height: 28px;
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
