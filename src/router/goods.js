export default [{
    path: '/hdk/detail/:id',
    name: 'HdkDetail',
    meta: {
        title: ''
    },
    component: () =>
        import ('@/views/goods/HdkDetail.vue')
}, {
    path: '/hdk/channel/:id',
    name: 'HdkChannel',
    meta: {
        keepAlive: true
    },
    component: () =>
        import ('@/views/goods/HdkChannel.vue')
}, {
    path: '/goods/search',
    name: 'GoodsSearch',
    meta: {
        keepAlive: true
    },
    component: () =>
        import ('@/views/goods/GoodsSearch.vue')
}]