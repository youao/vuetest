const footer = [{
    path: '/',
    name: 'Home',
    title: '首页',
    view: '/home/Home',
    icon: '&#xe925;'
}, {
    path: '/user',
    name: 'User',
    title: '个人中心',
    auth: true,
    view: '/user/User',
    icon: '&#xe920;'
}];

export default {
    footer,
    $mode: 'app',
    $appName: '油菜花',
}