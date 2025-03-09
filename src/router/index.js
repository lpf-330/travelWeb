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
        name: 'index',
        redirect: '/index/indexView',
        children: [
            {
                path: 'indexView',
                name: 'indexView',
                component: () => import('../view/indexView.vue')
            },
            {
                path: 'attractions',
                name: 'attractions',
                component: () => import("../view/attractionsLists.vue"),
            },
            {
                path: 'attractionsDetails',
                name: 'attractionsDetails',
                component: () => import("../view/attractionsDetails.vue")
            },
            {
                path: 'famousPeople',
                name: 'famousPeople',
                component: () => import("../view/famousPeopleDetails.vue")
            },
            {
                path: 'products',
                name: 'products',
                component: () => import("../view/productsLists.vue")
            },
            {
                path: 'productDetails',
                name: 'productDetails',
                component: () => import("../view/productsDetails.vue")
            },
            {
                path: 'community',
                name: 'community',
                component: () => import("../view/community.vue")
            },
            {
                path: 'post',
                name: 'post',
                component: () => import("../view/postDetails.vue")
            },
            {
                path: 'userInfo',
                name: 'userInfo',
                component: () => import("../view/UserInfoView.vue"),
                redirect: 'userInfo/userSpace',
                children: [
                    {
                        path: 'userSpace',
                        name: 'userSpace',
                        component: () => import("../view/userSpace.vue")
                    },
                    {
                        path: 'address',
                        name: 'address',
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