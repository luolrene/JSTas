<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside class="module-menu-container">
         <div class="module-menu-panel">
           <el-scrollbar class="page-component__scroll" :native="false">
             <el-menu
               :router="true"
               :unique-opened="true"
               :collapse="menuCollapse"
               :default-active="$route.path"
               class="el-menu-vertical-demo">
               <el-badge :value="$store.getters.taskTips" class="item" :hidden="$store.getters.taskTips === 0">
                 <i class="el-icon-s-home" style="font-size: 36px;color: #FFFFff;cursor: pointer;margin-bottom: 5px;" @click="toHome"></i>
               </el-badge>
               <MenuItem :menulist="sysMenu" />
             </el-menu>
           </el-scrollbar>
         </div>
       </el-aside>
      <el-main class="module-main-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="module-breadcrumb">
          <img src="../../static/img/home/arrowBK.png" alt="" class="arrowBK" @click="changeMenuCollapse">
          <el-breadcrumb-item v-for="(item, idx) in $route.matched" :key="idx" v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
          <myDrawer v-if="$store.getters.userInfo.orgId==='09074c0a93284051be7d73fe81b4783a'"></myDrawer>
        </el-breadcrumb>
        <el-scrollbar class="page-component__scroll" :native="false">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header'
import MenuItem from './MenuItem'
import myDrawer from '../views/common/my_drawer.vue'
import {getSysQueryWorkbench} from '../api/home/home.js'
export default {
  name: 'ModuleComponent',
  components: {
    Header,
    MenuItem,
    myDrawer
  },
  computed: {
    activateSys () {
      let currentPath = this.$route.path
      let tf = currentPath.substring(1, currentPath.length).indexOf('/')
      return tf > -1 ? currentPath.substring(0, tf + 1) : currentPath
    }
  },
  data () {
    return {
      menuCollapse: false,
      drawer: false,

      sysMenu: []
    }
  },
  methods: {
    changeMenuCollapse () {
      this.menuCollapse = !this.menuCollapse
    },
    toHome () {
      this.$router.push('/home')
    }
  },
  mounted () {
    this.sysMenu = this.$store.getters.userInfo.menus

    getSysQueryWorkbench(this.fromValiData).then(res => {
      let taskTipsNum = 0
      res.result.forEach(xdd => {
        taskTipsNum += xdd.sum
      })
      this.$store.dispatch('setTaskTips', taskTipsNum)
    }).catch(err => {
      this.$message.error(err.message)
    })
  }
}
</script>

<style scoped lang="scss">
  .el-header{
    height: 70px !important;
    margin-bottom: 15px;
    background-image: linear-gradient(to right, #0187C7 , #0195DB);
  }
  .el-main{
    height: 100%;
    padding:0
  }
  .el-aside{
     background-color: #0195DB;
  }
  .el-menu{
    width: 200px;
    padding-top: 20px;
    height: calc(100vh - 95px);
    background-color: #0195DB;
  }
  .module-menu-container {
    width: auto !important;
    padding: 0px;
    margin-bottom: 0px;
    overflow-x: hidden;
  }
  .module-menu-panel {
    height: 100%;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-flow: row nowrap;
    /* justify-content: center; */
    align-items: center;
  }
  .menu-collapse-btn {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .module-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 36px;
    background-color: #FFFFFF;
    padding-left: 10px;
    border-top: 1px solid #F2F2F2;
    border-bottom: 1px solid #F2F2F2;
    font-size: 14px;
  }
  .module-breadcrumb .arrowBK{
    margin-right: 20px;
    cursor: pointer;
  }
  .el-menu--collapse{
    width: 50px;
  }
 </style>
