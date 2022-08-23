<template>
  <div class="operate-container exmProcess">
    <div style="display: flex;align-items: center;justify-content: center;flex-direction: column;height: 500px;" v-if="steps.length=== 0">
      <img src="static/img/menu/addProcess.png" alt="" @click="addProcess" style="cursor: pointer;margin-bottom: 10px">
      <span style="color: #999999;">点击添加流程明细</span>
    </div>
    <template v-else>
      <el-scrollbar class="page-component__scroll" :native="false" style="height: 500px;">
         <el-steps :space="80" direction="vertical">
           <el-step :title="getTitle(index)" :description="item.name" v-for="(item,index) in steps" :key="index"></el-step>
         </el-steps>
      </el-scrollbar>
      <div style="display: flex;justify-content: space-around;align-items: center;">
        <div>
          <el-button type="primary" :size="$layer_Size.buttonSize" @click="addProcess">添加步骤</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doReset">重置</el-button>
        </div>
        <div>
          <el-button class="cancel-btn" :size="$layer_Size.buttonSize" @click='$layer.close(layerid)'>取消</el-button>
          <el-button type="primary" :size="$layer_Size.buttonSize" class="default-btn" @click="doConfirm()" :loading="loading">保存</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import userList from '../../common/user_list.vue'
import userList from '../../sampling/reportTask/input_person.vue'
import processZw from '../../common/zw_list.vue'
import {getPathAddPathItems, getPathQueryPathItems} from '../../../api/jcxxgl/exmProcess.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data () {
    return {
      loading: false,
      fromValiData: {},

      steps: []
    }
  },
  methods: {
    getListData () {
      getPathQueryPathItems({mainId: this.fromValiData.id}).then(res => {
        res.result.forEach(xdd => {
          this.steps.push({
            id: xdd.oper,
            name: xdd.operName,
            mobile: xdd.oper
          })
        })
      })
    },
    getTitle (index) {
      return '步骤' + (index + 1)
    },
    addProcess () {
      if (this.fromValiData.runType === '1') {
        this.$layer.iframe({
          content: {
            content: userList, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              id: this.fromValiData.id,
              obj: this
            }// props
          },
          area: this.$layer_Size.Max,
          title: '添加流程人员',
          maxmin: true,
          shadeClose: false
        })
      } else {
        this.$layer.iframe({
          content: {
            content: processZw, // 传递的组件对象
            parent: this, // 当前的vue对象
            data: {
              id: this.fromValiData.id,
              obj: this
            }// props
          },
          area: this.$layer_Size.Max,
          title: '添加流程职务',
          maxmin: true,
          shadeClose: false
        })
      }
    },
    getPerson(params) {
      return new Promise((resolve, reject) => {
        this.steps.push({
          name: params.name,
          id: params.userId,
          mobile: params.mobile
        })
        resolve(true)
      })
    },
    getSteps (params) {
      let names = ''
      let ids = ''
      let mobile = ''
      if (this.fromValiData.runType === '1') {
        params.forEach(xdd => {
          names += xdd.name + ','
          ids += xdd.userId + ','
          mobile += xdd.mobile + ','
        })
      } else {
        params.forEach(xdd => {
          names += xdd.name + ','
          mobile += xdd.id + ','
        })
      }

      this.steps.push({
        name: names.substring(0, names.length - 1),
        id: ids.substring(0, ids.length - 1),
        mobile: mobile.substring(0, mobile.length - 1)
      })
      this.$share.message('添加成功')
    },
    doConfirm () {
      let ids = []
      this.steps.forEach((xdd, index) => {
        ids.push({
          mainId: this.fromValiData.id,
          step: index + 1,
          oper: xdd.mobile,
          operName: xdd.name
        })
      })
      this.loading = true
      getPathAddPathItems(ids).then(res => {
        this.$layer.close(this.layerid)
        this.$share.message()
        this.$parent.getListData()
        this.loading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    doReset () {
      this.steps = []
    }
  },
  mounted () {
    this.fromValiData = this.params
    this.getListData()
  },
  created () {

  }
}
</script>

<style lang="scss">
  .exmProcess .el-step__title.is-wait{
    font-weight: 700;
    color:#333333;
  }
  .exmProcess .el-step__description.is-wait{
    color:#333333 ;
  }
</style>
