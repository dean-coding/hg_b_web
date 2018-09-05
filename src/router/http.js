/**
 * Created by fuhw/vencano 2017-06-25
 * http配置
 */

import axios from 'axios'
import store from '../store/index'
import router from './index'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json' };


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.user.user.id) {
            config.headers.Authorization = `token ${store.state.user.user.id}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { response } = error
        if (response) {
            const { status, data } = response
            if(!data) {
                response.data = {message:'请求异常'};
            }
            switch (status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.dispatch('doLogout')
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                    break;
                case 403:
                    response.data = {message:'拒绝访问：权限不足'};
                    break;
                case 404:
                    response.data = {message:'资源不存在'};
                    break;
                case 504:
                    response.data = {message:'网关异常'};
                    break;
            }
        }
        return Promise.reject(response.data)
    });

export default axios;
