import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getSysRoleMenu ,getUserGetUserInfo} from './api/login.js'
import recordTemp from './utils/recordTemp.js'
NProgress.configure({ showSpinner: false })
// 路由拦截，判断登录状态
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('路由拦截')
  // console.log(to)
  // console.log(from)
  // console.log(store.getters.userInfo)
  // console.log(store.getters.constumerRouter)
  // console.log('路由拦截')
  if (to.matched.length === 0) {
    var args= window.location.href.split('?');
    if(args && args.length > 1){
      var token = args[1].substring(6,args[1].length)
      let ids = {}
      ids.token = token
      store.dispatch('setUserInfo', ids).then(res => {
        getUserGetUserInfo().then(res => {
          store.dispatch('setUserInfo', res.result).then(res => {
            routeArrange(to, from, next)
          })
        }).catch(merr => {
          next('/login')
          NProgress.done()
        })
      })
    }else{
      routeArrange(to, from, next)
    }
  } else {
    if (to.matched.some(record => record.meta.requireAuth)) {
      if (store.getters.userInfo && store.getters.userInfo.token) {
        next()
      } else {
        // 登录超时，提升重新登录
        next('/login')
        NProgress.done()
      }
    } else {
      next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

const routeArrange = (to, from, next) =>{
  if (store.getters.userInfo && store.getters.userInfo.token && store.getters.userInfo.userId) {
    if (!store.getters.constumerRouter) {
      getSysRoleMenu().then(res => {
        if (res.result.length === 0) {
          next('/default')
          NProgress.done()
        } else {
          let newUserInfo = store.getters.userInfo
          newUserInfo.menus = res.result
          let rebulidMenu = rebuildComponent(res.result)
          // console.log('重组前和重组后的数据')
          // console.log(newUserInfo)
          // console.log(rebulidMenu)
          // console.log('重组前和重组后的数据')
          rebulidMenu.push({
            path: '/home',
            name: '首页',
            component: resolve => require(['@/views/home/home'], resolve),
            menu_ID: 'home',
            meta: { requireAuth: 1, title: '首页' }
          })
          store.dispatch('setUserInfo', newUserInfo).then(res => {
            let constumerRouter = [
              {
                path: '/',
                component: resolve => require(['@/components/MainComponent.vue'], resolve),
                children: rebulidMenu
              }
            ]
            store.dispatch('setConstumerRouter', true).then(res => {
              router.addRoutes(constumerRouter)
              next({ ...to })
              NProgress.done()
            }).catch(err => {
              console.error('添加动态路由出错')
              console.error(err)
              next('/login')
              NProgress.done()
            })
          }).catch(sumserr => {
            console.error('设置用户菜单出错')
            console.error(sumserr)
            next('/login')
            NProgress.done()
          })
        }
      }).catch(merr => {
        console.error('获取菜单失败,请刷新重试')
        console.error(merr)
        next('/login')
        NProgress.done()
      })
    } else {
      // 进入的地址在路由中没有
      if (to.name.substring(0, 2) === 'F_') {
        next({
          path: '/F_error'
        })
      } else {
        next({
          path: '/error/404'
        })
      }
      NProgress.done()
    }
  } else {
    // 直接在浏览器输入地址的情况
    next('/login')
    NProgress.done()
  }
}

const rebuildComponent = (params) => {
  let menu = []
  params.forEach(xdd => {
    let routerItem = {
      path: xdd.path,
      route: xdd.route,
      name: xdd.name,
      menu_ID: xdd.menu_ID,
      meta: { requireAuth: 1, title: xdd.name, route: xdd.route }
    }
    if (xdd.hasOwnProperty('component') && xdd.component !== null && xdd.component !== '') {
      routerItem.component = resolve => require(['@/' + xdd.component + '.vue'], resolve)
    }
    if (xdd.hasOwnProperty('children')) {
      routerItem.children = rebuildComponent(xdd.children)
    }
    if (xdd.path === '/sampling/original') {
      routerItem.children = recordTemp
    }
    menu.push(routerItem)
  })
  return menu
}
