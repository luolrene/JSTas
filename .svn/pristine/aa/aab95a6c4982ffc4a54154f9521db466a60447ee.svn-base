<template>
  <div>
    <div class="title">跟进客户-联系人跟进申请</div>
    <div style="margin:20px;height: 300px;">
      <el-steps direction="vertical" :space='100' :active="active">
        <el-step icon="el-icon-user" :title="item.name +'  ' + item.handleName" :description="'备注:' + item.handleRemarks" v-for="(item,index) in arr" :key="index">
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
import { getCrmResponsibilityLxrGetDataByRemarks } from '@/api/client/info.js'
export default {
  props: {
    params: Object,
    layerid: ''
  },
  data() {
    return {
      active: null,
      arr: []
    }
  },
  mounted() {
    getCrmResponsibilityLxrGetDataByRemarks({ id: this.params.id }).then(
      res => {
        res.result.forEach(xdd => {
          if (xdd.handleRemarks === null) {
            xdd.handleRemarks = ' '
          }
          switch (xdd.handle) {
            case 1:
              xdd.handleName = '待审批'
              break
            case 2:
              xdd.handleName = '通过'
              break
            case 3:
              xdd.handleName = '退回'
              break
          }
        })
        this.arr = res.result.map(item => {
          return {
            name: item.createUserName,
            handleName: item.handleName,
            handleRemarks: item.handleRemarks
          }
        })
      }
    )
  },
  created() {}
}
</script>

<style scoped >
.title {
  margin: 20px 0 0 170px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.el-step >>> .el-step__title.is-wait {
  color: #000;
}
.el-step >>> .el-step__description.is-wait {
  color: #000;
}
</style>
