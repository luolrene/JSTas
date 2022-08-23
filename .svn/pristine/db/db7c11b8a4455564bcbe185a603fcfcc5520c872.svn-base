import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login/login'], resolve)
    },
    {
      path: '/default',
      component: resolve => require(['@/components/MainComponent'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['@/components/FullComponent'], resolve),
          children: [
            {
              path: '/default',
              name: 'default',
              component: resolve => require(['@/views/default/index'], resolve)
            }
          ]
        }
      ]
    },
    {
      path: '/error',
      name: 'error',
      component: resolve => require(['@/components/FullComponent'], resolve),
      children: [
        {
          path: '/error/404',
          name: 'error-404',
          component: resolve => require(['@/views/common/error/404'], resolve)
        }
      ]
    }
  ]
})
