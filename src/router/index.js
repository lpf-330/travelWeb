import { createRouter, createWebHashHistory } from "vue-router";
import Login from '../view/LoginPage.vue'

const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: "/admLogin",
        component: () => import("../view/AdmLogin.vue")
    },
    {
        path: '/register',
        component: () => import("../view/Register.vue")
    },
    {
        path: '/index',
        component: () => import("../view/index.vue"),
        children: [
            {
                path: '/',
                redirect: 'indexView'
            },
            {
                path: 'indexView',
                component: () => import('../view/indexView.vue')
            },
            {
                path: 'attractions',
                component: () => import("../view/attractionsLists.vue"),
            },
            {
                path: 'attractionsDetails',
                component: () => import("../view/attractionsDetails.vue")
            },
            {
                path: 'famousPeople',
                component: () => import("../view/famousPeopleDetails.vue")
            },
            {
                path: 'products',
                component: () => import("../view/productsLists.vue")
            },
            {
                path: 'productDetails',
                component: () => import("../view/productsDetails.vue")
            },
            {
                path: 'community',
                component: () => import("../view/community.vue")
            },
            {
                path: 'post',
                component: () => import("../view/postDetails.vue")
            },
            {
                path: 'userInfo',
                component: () => import("../view/UserInfoView.vue"),
                children: [
                    {
                        path: '/',
                        redirect: 'userSpace'
                    },
                    {
                        path: 'userSpace',
                        component: () => import("../view/userSpace.vue")
                    },
                    {
                        path: 'address',
                        component: () => import("../view/address.vue")
                    }
                ]
            }
        ]
    },
    {
        path: "/admInDex",
        component: () => import("../view/AdmInDex.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;