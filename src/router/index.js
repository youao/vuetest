import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";
import goods from "./goods";

Vue.use(Router);

const routes = [{
        path: '/home',
        name: 'Home',
        meta: {
            keepAlive: true,
            transitionName: 'fade'
        },
        component: () =>
            import ('@/views/home/Home')
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '',
        redirect: '/home'
    },
    ...user,
    ...goods,
    {
        path: '/wxjump',
        name: 'WeixinJump',
        component: () =>
            import ('@/views/utils/WeixinJump')
    },
    {
        path: '*',
        name: 'NotDefine',
        component: () =>
            import ('@/views/utils/404')
    }
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    const { title, path } = to.meta;
    if (path == '') {
        console.log('app index')
        next('/');
    }
    document.title = title || process.env.VUE_APP_NAME;
    next();
});

export default router;