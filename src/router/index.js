import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/main"
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },


    {
        path: '/main',
        name: 'main',
        component: () => import('../views/main/index.vue'),
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('../views/index/index.vue')
            },

            {
                path: 'supplier',
                name: 'supplier',
                component: () => import('../views/supplier/index.vue')
            },
            {
                path: 'brand',
                name: 'brand',
                component: () => import('../views/brand/index.vue')
            },
            {
                path: 'category',
                name: 'category',
                component: () => import('../views/category/index.vue')
            },
            {
                path: 'goodsProduct',
                name: 'goodsProduct',
                component: () => import('../views/goodsProduct/index.vue')
            },
            {
                path: 'goods',
                name: 'goods',
                component: () => import('../views/goods/index.vue')
            },
            {
                path: 'order',
                name: 'order',
                component: () => import('../views/order/index.vue'),
                children: [
                    {
                        path: 'orderDetail',
                        name: 'orderDetail',
                        component: () => import('../views/orderDetail/index')
                    },
                    {
                        path: 'ordermanager',
                        name: 'ordermanager',
                        component: () => import('../views/ordermanager/index.vue')
                    }

                ]
            },
            /*售后相关*/
            {
                path: 'outStore',
                name: 'outStore',
                component: ()=> import('../views/outStore/index.vue')
            },
            {
                path: 'outGoodInfo',
                name: 'outGoodInfo',
                component: ()=> import('../views/outGoodInfo/index.vue')
            }

        ]

    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
