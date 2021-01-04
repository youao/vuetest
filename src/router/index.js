import Vue from 'vue';
import Router from 'vue-router';
import user from "./user";
import goods from "./goods";

Vue.use(Router);

const routes = [{
        path: '/',
        name: 'Home',
        meta: {
            title: '首页',
            keepAlive: true
        },
        component: () =>
            import ('@/views/home/Home')
    },
    ...user,
    ...goods,
    {
        path: '*',
        name: 'NotDefined',
        component: () =>
            import ('@/views/404')
    }
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    const { title, path } = to.meta;
    if (path == '') {
        console.log('app index')
        next('/');
    }
    title && (document.title = title);
    next();
});

export default router;