<template>
  <div class="operate-container">
    <fromItem
      ref="myFromItem"
      :obj="this"
      :layerid="layerid"
      :fromItemList="fromItemList"
      :fromValiData="fromValiData"
      :rules="rules"
      :btnLoading="btnLoading"
      :labelWidth="100">
      <el-form-item label="仪器明细选择:">
         <el-cascader style="width: 100%;"
          ref="cascaderId"
          v-model="options"
          :options="targetOptions"
          :props="props"
          :clearable="true"
          filterable>
        <template slot-scope="{ node, data }">
          <span>{{ data.name}}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          <span v-if="data.status">( {{data.statusName}} )</span>
        </template></el-cascader>
      </el-form-item>
    </fromItem>
  </div>
</template>

<script>
import choGroup from '../../common/group_list.vue'
import {getLeaseTaskAddOrModify, getLeaseMachineItemAddOrModify, getLeaseMachineItemQueryPageData} from '../../../api/sampling/sampTask.js'
import {getReportTaskQueryPageList} from '../../../api/sampling/majorTask.js'
import {getUserQueryPageData} from '../../../api/jcxxgl/user.js'
import {getMachineQueryMachineTreeNew} from '../../../api/storage/equipment.js'
export default {
  props: {
    layerid: '',
    addParams: Object,
    params: Object
  },
  data () {
    return {
      btnLoading: false,
      fromValiData: {
        groupName: '',
        reportNo: [],
        oper: ''
      },
      rules: {
        taskName: [{ required: true, message: '请填写任务名称', trigger: 'change' }],
        reportNo: [{ required: true, message: '请选择报告编号', trigger: 'change' }],
        groupName: [{ required: true, message: '请选择分组', trigger: 'change' }],
        oper: [{ required: true, message: '请选择租借人', trigger: 'change' }]
      },
      fromItemList: [
        {label: '任务名称', prop: 'taskName', value: '', type: 'input', isRqd: true},
        {label: '报告编号', prop: 'reportNo', value: '', type: 'select', isRqd: true, multiple: true, data: []},
        {label: '分组', prop: 'groupName', value: '', type: 'inputChoice', isRqd: true, click: 'getGroupId'},
        {label: '租借人', prop: 'oper', value: '', type: 'select', isRqd: true, data: [], filterable: true},
        {label: '开始时间', prop: 'startTime', value: '', type: 'date', isRqd: true, labelWidth: '110'},
        {label: '结束时间', prop: 'endTime', value: '', type: 'date', isRqd: true, labelWidth: '110'}
      ],
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        multiple: true
      },
      targetOptions: [],
      options: []
    }
  },
  methods: {
    onSubmit () {
      let ids = JSON.parse(JSON.stringify(this.fromValiData))
      ids.reportNo = ids.reportNo.join(',')
      this.btnLoading = true
      getLeaseTaskAddOrModify(ids).then(res => {
        let params = {
          leaseTaskId: res.result,
          arrayValue: []
        }
        let data = this.$refs.cascaderId.getCheckedNodes({leafOnly: true})
        data.forEach(xdd => {
          params.arrayValue.push({
            machineType: xdd.path[0],
            machineName: xdd.path[1],
            machineId: xdd.path[2],
            machineNo: xdd.data.yqbh,
            machineXh: xdd.data.yqxh,
            leaseTaskId: res.result,
            reportNo: ids.reportNo
          })
        })
        getLeaseMachineItemAddOrModify(params).then(res2 => {
          this.$parent.getListData()
          this.$layer.close(this.layerid)
          this.$share.message()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    getGroupId () {
      this.$layer.iframe({
        content: {
          content: choGroup, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: {

          }// props
        },
        area: this.$layer_Size.Max,
        title: '选择分组',
        maxmin: true,
        shadeClose: false
      })
    },
    getGroupData (params) {
      if (this.fromValiData.groupName !== params.name) {
        this.fromValiData.groupId = params.id
        this.fromValiData.groupName = params.name
        this.fromValiData.oper = ''
        let ids = {}
        ids.groupId = params.id
        ids.pageSize = 99999
        ids.pageNow = 1
        getUserQueryPageData(ids).then(res => {
          this.fromItemList.forEach(xdd => {
            if (xdd.prop === 'oper') {
              xdd.data = []
              res.result.pageList.forEach(arc => {
                xdd.data.push({
                  id: arc.name,
                  name: arc.name
                })
              })
            }
          })
        }).catch(err => {
          this.$message.error(err.message)
        })
      }
    },
    getReportData () {
      getReportTaskQueryPageList({type: '1', pageSize: 99999, pageNow: 1, status: '0,2', hasLeaseTask: '1'}).then(res => {
        this.fromItemList.forEach(xdd => {
          if (xdd.prop === 'reportNo') {
            xdd.data = []
            res.result.pageList.forEach(arc => {
              xdd.data.push({
                id: arc.reportNo,
                name: arc.reportNo
              })
            })
          }
        })
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getLeaseData () {
      getMachineQueryMachineTreeNew({type: '2'}).then(res => {
        this.getRecursion(res.result)
        this.targetOptions = res.result
      })
    },
    getRecursion (data, editData) {
      data.forEach(xdd => {
        if (xdd.hasOwnProperty('children') && xdd.children.length > 0) {
          this.getRecursion(xdd.children, editData)
        } else {
          if (xdd.status !== undefined && xdd.status !== '') {
            // xdd.disabled = true
            switch (xdd.status) {
              case '0':
                xdd.statusName = '闲置'
                // xdd.disabled = false
                break
              case '1':
                xdd.statusName = '出借'
                break
              case '2':
                xdd.statusName = '预约'
                break
              case '3':
                xdd.statusName = '维修'
                break
              case '4':
                xdd.statusName = '损坏'
                break
              case '5':
                xdd.statusName = '停用'
                break
              case '6':
                xdd.statusName = '报废'
                break
            }

            if (editData !== undefined && editData.length > 0) {
              editData.forEach(arc => {
                if (arc.machineId === xdd.id) {
                  xdd.statusName = '闲置'
                  // xdd.disabled = false
                }
              })
            }
          }
        }
      })
    },
    getEditData () {
      let ids = {}
      ids.pageSize = 99999
      ids.pageNow = 1
      ids.leaseTaskId = this.fromValiData.id
      getLeaseMachineItemQueryPageData(ids).then(res => {
        res.result.pageList.forEach(xdd => {
          let data = []
          data.push(xdd.machineType)
          data.push(xdd.machineName)
          data.push(xdd.machineId)
          this.options.push(data)
        })

        getMachineQueryMachineTreeNew({type: '2'}).then(res2 => {
          this.getRecursion(res2.result, res.result.pageList)
          this.targetOptions = res2.result
        })
      })
    }
  },
  mounted () {

  },
  created () {
    if (this.params) {
      this.fromValiData = this.params
      this.fromValiData.reportNo = this.fromValiData.reportNo.split(',')
      this.getEditData()
    } else {
      this.getLeaseData()
    }
    this.getReportData()
  }
}
</script>

<style scoped lang="scss">

</style>
