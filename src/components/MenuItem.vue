<template>
  <div id="menuItem">
    <fragment v-for="menu in menulist" :key="menu.menu_ID">
      <fragment v-if="menu.children && menu.children.length > 0">
        <el-submenu :index="menu.path">
          <div slot="title" :class="{
            levelOne:menu.level==='1'}">
            <!-- <img :src="menu.icon" alt="" class="menu-icon" v-if="menu.icon && menu.icon!==''"> -->
            <i :class="menu.imgUrl" style="font-size: 20px;margin-right: 6px;"></i>
            <span class="menu-font">{{menu.name}}</span>
          </div>
          <menu-item :menulist="menu.children"></menu-item>
        </el-submenu>
      </fragment>
      <fragment v-else>
        <el-menu-item :index="menu.route" :class="{
          noChildrenLevelOne:menu.level==='1',
          noChildrenLevelTwo:menu.level==='2'}">
          <i :class="menu.imgUrl" style="font-size: 20px;margin-right: 8px;color: #FFFFFF;" v-if="menu.level === '1'"></i>
          <span slot="title" class="menu-font">{{menu.name}}</span>
        </el-menu-item>
      </fragment>
    </fragment>
  </div>
</template>

<script>
export default{
  name: 'MenuItem',
  props: {
    menulist: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="scss">
  $color:#0195DB;
  $hover-color:#ffffff;
  #menuItem{
    padding:2px 0;
    background-color: $color;

    .menu-icon{
      width: 20px;
      height: 20px;
    }
    /* 父级菜单 */
    .el-submenu__title{
      height: 46px;
      line-height: 46px;
      color: #FFFFFF;
      padding: 0;
      padding-left: 16px !important;
      display: flex;
    }
    .el-submenu__title:hover{
      background-color: $hover-color;
      color: $color;
    }
    .el-submenu__title:hover i{
      color: $color;
    }
    .noChildrenLevelOne:hover i{
      color: $color !important;
    }
    .el-submenu__title i{
      color: #ffffff;
    }
    /* 子级菜单 */
    .el-menu{
      background-color: $color;
    }
    .el-menu-item{
      height: 35px;
      padding: 0;
      display: flex;
      align-items: center;
      background-color: $color;
      color: #FFFFFF;
      border-radius: 10px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .el-menu-item:hover,.el-menu-item.is-active{
      background-color: $hover-color;
    }
    .el-menu-item:hover,.el-menu-item.is-active i{
      color: $color !important;
    }
    .el-menu-item:hover,.el-menu-item.is-active .menu-font{
      color: $color;
    }
    /* 缩小时 子菜单组背景色*/
    .el-menu--popup{
      background-color: $color;
      // border-radius: 10px;
    }
    /* 箭头 */
    .el-submenu__icon-arrow{
      right: 15px;
      margin-top: -6px;
      font-size: 14px;
    }

    /* 一级菜单样式 */
    .levelOne{
      font-size: 16px;
    }
    .noChildrenLevelOne{
      font-size: 16px;
      padding-left: 16px !important;
    }
    /* 二级菜单样式 */
    .noChildrenLevelTwo{
      font-size: 15px;
      padding-left: 50px !important;
    }
  }
</style>
