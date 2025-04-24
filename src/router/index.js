import { createRouter,createWebHistory} from 'vue-router'

import MyLogin from '@/components/MyLogin.vue';

const routes = [
    {
        path:'/login',
        name:'MyLogin',
        component:MyLogin
    },
    {
        path:'/register',
        name:'MyRegister',
        component:()=>import('@/components/MyRegister.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router