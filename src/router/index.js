import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main/Main'
import Login from '../components/login/Login'
import Index from "../components/Index/Index"
import MealUpload from "../components/meal/MealUpload";
import MealDownload from "../components/meal/MealDownload";

Vue.use(Router)
//创建路由对象
const router = new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            //配置子路由
            children: [
                {
                    path: '/mealUpload',
                    component: MealUpload
                },
                {
                    path: '/mealDownload',
                    component: MealDownload
                }
            ]
        }
    ]
})

export default router