import Vue from 'vue'
import App from './App.vue'
import router from './router'

//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'
import axios from 'axios';

//jquery
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI);

//给axios添加拦截器,在请求头中加入token
axios.interceptors.request.use(
    config => {
        //store.getters.token
        if (localStorage.getItem("Authorization")) {//如果localStorage中有token
            //把Token添加到header中发送
        config.headers.Authorization = localStorage.getItem('Authorization')
      }
      return config
    },
    error => {
      return Promise.reject(error)
    })

Vue.prototype.$ajax = axios

new Vue({
    store,
    router,
  render: h => h(App),
}).$mount('#app')
