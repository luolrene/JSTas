import Mock from 'mockjs'

Mock.mock('http://192.168.0.140:8080/JSCheck/user/login', 'post', {
  'code': 0,
  'result': {
    'username': 'lzz',
    'email': '@96521455@qq.com',
    'phone': 13613661366,
    'token': 11111,
    'sex': '男'
  }
})
Mock.mock('http://192.168.0.140:8080/JSCheck/sys/roleMenu', 'post', {
  'code': 0,
  'result': [
    // {
    //   path: '/',
    //   name: '首页',
    //   component: 'components/ModuleComponent',
    //   menu_ID:'1',
    // },
    {
      path: '/jcxxgl',
      name: '基础信息管理',
      component: 'components/ModuleComponent',
      menu_ID: '2',
      selPage: '/jcxxgl/org',
      children: [
        { path: '/jcxxgl/org', name: '组织机构管理', component: 'views/jcxxgl/org/list', menu_ID: '1101' },
        { path: '/jcxxgl/group', name: '分组管理', component: 'views/jcxxgl/group/list', menu_ID: '1102' },
        { path: '/jcxxgl/role', name: '角色管理', component: 'views/jcxxgl/role/list', menu_ID: '1103' },
        { path: '/jcxxgl/user', name: '用户管理', component: 'views/jcxxgl/user/list', menu_ID: '1103' }
      ]
    },
    {
      path: '/contract',
      name: '合同管理',
      component: 'components/ModuleComponent',
      menu_ID: '3',
      selPage: '/contract/msg',
      children: [
        { path: '/contract/msg', name: '合同信息管理', component: 'views/contract/msg/list', menu_ID: '2201' },
        { path: '/contract/task', name: '合同任务管理', component: 'views/contract/task/list', menu_ID: '2202' },
        { path: '/contract/spg', name: '分包合同管理', component: 'views/contract/spg/list', menu_ID: '2203' }
        // {path:'/contract/customer',name:'客户信息管理',component: 'views/contract/customer/list'}
      ]
    },
    {
      path: '/sampling',
      name: '采样管理',
      component: 'components/ModuleComponent',
      menu_ID: '4',
      selPage: '/sampling/majorTask',
      children: [
        { path: '/sampling/majorTask', name: '主任务管理', component: 'views/sampling/majorTask/list', menu_ID: '2201' },
        { path: '/sampling/reportTask', name: '报告任务管理', component: 'views/sampling/reportTask/list', menu_ID: '2202' },
        { path: '/sampling/sampTask', name: '采样任务管理', component: 'views/sampling/sampTask/list', menu_ID: '2203' }
      ]
    },
    {
      path: '/testing',
      name: '检测管理',
      component: 'components/ModuleComponent',
      menu_ID: '5',
      selPage: '/testing/testTask',
      children: [
        { path: '/testing/testTask', name: '检测任务管理', component: 'views/testing/testTask/list', menu_ID: '2201' }
      ]
    },
    {
      path: '/verity',
      name: '审核管理',
      component: 'components/ModuleComponent',
      menu_ID: '6',
      selPage: '/verity/contractVerity',
      children: [
        { path: '/verity/contractVerity', name: '合同审核', component: 'views/verity/contractVerity/list', menu_ID: '2201' },
        { path: '/verity/spgVerity', name: '分包合同审核', component: 'views/verity/spgVerity/list', menu_ID: '2201' },
        { path: '/verity/recordVerity', name: '原始记录审核', component: 'views/verity/recordVerity/list', menu_ID: '2201' },
        { path: '/verity/reportVerity', name: '报告审核', component: 'views/verity/reportVerity/list', menu_ID: '2201' }
      ]
    },
    {
      path: '/storage',
      name: '仓储管理',
      component: 'components/ModuleComponent',
      menu_ID: '7',
      selPage: '/storage/equipment',
      children: [
        { path: '/storage/equipment', name: '采样设备管理', component: 'views/storage/equipment/list', menu_ID: '2201' }
      ]
    },
    {
      path: '/finance/financeManagement',
      name: '财务管理',
      component: 'views/finance/financeManagement/list',
      menu_ID: '8'
    }
  ]
});
// Mock.mock('http://192.168.0.140:8081/JSCheck/cq/page/list','post',{
//     "status": 0,
//     "data": {
//        "records":[
//          {
//            title: '语文测试',
//            date: '2016-05-02',
//            name: '王小洛',
//            address: '上海市普陀区金沙江路 1518 弄',
//            color: 'red'
//          }, {
//            title: '数据测试',
//            date: '2016-05-04',
//            name: '忠强',
//            address: '上海市普陀区金沙江路 1517 弄',
//            color: 'blue'
//          }, {
//            title: '英语测试',
//            date: '2016-05-01',
//            name: '李刚',
//            address: '上海市普陀区金沙江路 1519 弄',
//            color: 'yellow'
//          }, {
//            title: '理科测试',
//            date: '2016-05-03',
//            name: '赵二',
//            address: '上海市普陀区金沙江路 1516 弄',
//            color: 'orange'
//          }, {
//            title: '理科测试',
//            date: '2016-05-03',
//            name: '赵二',
//            address: '上海市普陀区金沙江路 1516 弄',
//            color: 'orange'
//          }
//        ]
//     }
// });
