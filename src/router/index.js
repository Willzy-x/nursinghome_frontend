import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main/Main'
import Login from '../components/login/Login'

Vue.use(Router)
//创建路由对象
const router = new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            // //配置子路由
            // children: [
            //     {
            //
            //     }
            // ]
        }
    ]
})

export default router