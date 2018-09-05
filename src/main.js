import Vue from 'vue';
import App from './App';
import router from './router/index.js';//路由
import store from './store/index.js';//vuex状态存储
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map';
import * as filters from './filters'
import '../static/css/theme-xiaolang/index.css';
// import "babel-polyfill";
Vue.use(ElementUI);
Vue.use(BaiduMap, {
    ak: 'YOUR_APP_KEY'
});

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//过滤非法字符
// Vue.filter('validate', function (val) {
//     val = val.toString();
//     reg = /[`~!@#$%^&*()_+<>?:"{},\/;']/im;

//     if (reg.test(val)) {
//         $.alert("请勿输入非法字符", "温馨提示");
//         //返回时删除非法字符
//         return val.substr(0, val.length - 1);
//     } else {
//         //原内容返回
//         return val;
//     }
// });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');