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
    component: () =>
        import ('@/views/goods/HdkChannel.vue')
}]