<template>
  <div class="block" style="padding-right: 40px;">
           <el-timeline style="padding-left: 20px;">
             <el-timeline-item :timestamp="item.operTime" placement="top" v-for="(item,index) in checkLogList" :key="index" :color="optinColor">
               <el-card>
                 <h4 class="content_a">
                   <span style="margin-right: 15px;">步骤{{item.step}}</span><span :style="{color:optinColor}">{{item.option}}</span>
                 </h4>
                 <div class="content_a">
                   <span>{{item.oper}}</span>
                   <span>{{item.operMobile}}</span>
                 </div>
                 <div v-if="item.exp !== null && item.exp !==''" class="content_b">
                   审核备注：{{item.exp}}
                 </div>
               </el-card>

             </el-timeline-item>
           </el-timeline>
         </div>
</template>

<script>
import { getCrmBiddingToExamineLogDetailed } from '@/api/bid/bid.js'
export default {
  data() {
    return {
      checkLogList: []
    }
  },
  props: {
    params: Object
  },
  mounted() {
    getCrmBiddingToExamineLogDetailed({
      father: this.params.checkTaskId
    }).then(res => {
      res.result.forEach(xdd => {
        if (xdd.option === '1') {
          xdd.option = '同意'
          this.optinColor = '#01AB91'
        } else {
          xdd.option = '拒绝'
          this.optinColor = '#FF798D'
        }
      })
      this.checkLogList = res.result
    })
  },
  created() {}
}
</script>

<style scoped lang='scss'>
.content_a {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.content_b {
  word-wrap: break-word;
  width: 100%;
  line-height: 20px;
}
</style>
