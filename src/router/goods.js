export default [{
    path: '/hdk/detail/:id',
    name: 'HdkDetail',
    meta: {
        title: '宝贝详情'
    },
    component: () =>
        import ('@/views/goods/HdkDetail.vue')
}]