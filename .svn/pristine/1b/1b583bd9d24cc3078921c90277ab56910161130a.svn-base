<template>
  <div class="pc-container" style="display: flex;font-size: 15px;flex-direction: column;height: calc(100vh - 150px);">
    <div v-for="(item,index) in tableData" :key="index" style="display: flex;flex-direction: column;align-items: flex-start;">
      <div>
        <span style="height: 20px;border: 2px solid #018BCD;;border-radius: 20px;margin-right: 6px;"></span>
        <span>{{item.name}}</span>
      </div>
      <ul style="display: flex;padding-left: 0;margin-top: 5px;flex-wrap: wrap;">
        <li v-for="(xdd,index2) in item.data" :key="index2" class="modular" @click="handleDetails(xdd)">
          <div class="modularSub rotate">
            <div style="position: relative;display: flex;align-items: center;justify-content: center;margin-bottom: 2px;">
              <i class="el-icon-chat-round" style="font-size: 44px;color: #999999;"></i>
              <span style="position: absolute;color: #F56C6C;font-weight: 700;">{{xdd.sum}}</span>
            </div>
            <div>{{xdd.describe}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="loading" v-if="loading">
      <span>正在加载数据</span><i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import { getSysQueryWorkbench } from '../../api/home/home.js'
export default {
  components: {},
  data() {
    return {
      loading: true,
      fromValiData: {
        describe: '',
        sum: ''
      },
      tableData: []
    }
  },
  methods: {
    getListData() {
      this.loading = true
      getSysQueryWorkbench(this.fromValiData).then(res => {
        this.tableData = res.result
        this.loading = false
        let taskTipsNum = 0
        res.result.forEach(xdd => {
          taskTipsNum += xdd.sum
        })
        this.$store.dispatch('setTaskTips', taskTipsNum)
      }).catch(err => {
        this.$message.error(err.message)
        this.loading = false
      })
    },
    handleDetails(params) {
      this.$router.push(params.path)
    }
  },
  mounted() {
    this.getListData()
  },
  created() { }
}
</script>

<style scoped lang="scss">
  .modular{
    display: flex;
    padding: 0 10px;
    min-width: 240px;
    height: 100px;
    margin-bottom: 15px;
  }
  @keyframes rotate{
    0%{
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    100%{
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  .rotate{
    transition: 0.4s;
    // animation: rotate 1s linear infinite;
  }
  .modularSub{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #E6F3FD;
    border-radius: 20px;
    color: #333333;
  }
  .modularSub:hover{
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: 0.4s;
    transform: translate3d(0, -3px, 0);
    cursor: pointer;
  }
  .loading{
    width: calc(100% - 30px);
    height: calc(100vh - 160px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    background: rgba(210, 216, 222, 0.5);
    color:#2d8cf0;
  }
  .el-icon-loading{
    font-size: 16px;
  }

</style>
