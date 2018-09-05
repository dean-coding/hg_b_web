import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'

Vue.use(Router);


//TODO 可以抽取通用的方法,用json/js文件引入的方式
const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    //首页看板模块
    {
        path: '/readme',
        meta: {
            requireAuth: true,
        },
        component: resolve => require(['../views/common/Home.vue'], resolve),
        children: [
            {
                path: '/',
                component: resolve => require(['../views/Readme.vue'], resolve)
            }
        ]
    },
    // 关于
    {
        path: '/aboutme',
        meta: {
            requireAuth: true,
        },
        component: resolve => require(['../views/common/Home.vue'], resolve),
        children: [
            {
                path: '/',
                component: resolve => require(['../views/Aboutme.vue'], resolve)
            }
        ]
    },
    //客户管理模块
    {
        path: '/customer-manage',
        meta: {
            requireAuth: true,
        },
        component: resolve => require(['../views/common/Home.vue'], resolve),
        children: [
            {
                path: '/customer',
                component: resolve => require(['../views/customer-manage/Customer.vue'], resolve)
            },
            {
                path: '/blog',
                component: resolve => require(['../views/customer-manage/Blog.vue'], resolve)
            },
            {
                path: '/bloglist',
                component: resolve => require(['../views/customer-manage/BlogList.vue'], resolve)
            },
            {
                path: '/userInfo',
                component: resolve => require(['../views/customer-manage/UserInfo.vue'], resolve)
            },
            {
                path: '/mapNav',
                component: resolve => require(['../views/customer-manage/MapNav.vue'], resolve)
            }
        ]
    },
    // 图表统计模块
    {
        path: '/chart-statistic',
        meta: {
            requireAuth: true,
        },
        component: resolve => require(['../views/common/Home.vue'], resolve),
        children: [
            {
                path: '/basecharts',
                component: resolve => require(['../views/chart-statistic/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
            },
            {
                path: '/mixcharts',
                component: resolve => require(['../views/chart-statistic/MixCharts.vue'], resolve)    // vue-echarts-v3组件
            }
        ]
    },
    // 系统设置模块
    {
        path: '/cateManage',
        meta: { requireAuth: true },
        component: resolve => require(['../views/common/Home.vue'], resolve),
        children: [{
            path: '/',
            component: resolve => require(['../views/sys-setting/CateManage.vue'], resolve)
        }]
    },

    {
        path: '/login',
        component: resolve => require(['../views/Login.vue'], resolve)
    }
];



const router = new Router({
     // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    // if (to.matched.some(r => r.meta.requireAuth)) {
    if (to.matched.some(r => r.meta.requireAuth)) {  // 判断该路由是否需要登录权限
        console.log('当前登录状态',store.state.user.login);
        if (store.state.user.login) {
            next();
        }
        else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })

        }
    } else {
        if (store.state.user.id) {
            console.log('当前存在缓存登录信息->自动跳转至工作台')
            next('readme');
        } else {
            next();
        }
    }
})

export default router;
