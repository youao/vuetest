import Vue from 'vue'
import App from './App.vue'

import router from './router'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import store from './store'

import '@/assets/css/base.scss'
import '@/utils/flexible.js'

Vue.config.productionTip = false

import app from './config';

const init = () => {
    new Vue({
        store,
        router,
        render: h => h(App),
    }).$mount('#app')
}

if (app.$mode == 'app') {
    window.apiready = () => {
        init();
    }
} else {
    init()
}