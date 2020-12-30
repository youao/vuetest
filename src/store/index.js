import Vue from 'vue'
import Vuex from 'vuex'
import app from '../config';

Vue.use(Vuex)

const dpr = window.devicePixelRatio;

const store = new Vuex.Store({
    state: {
        safeArea: {
            top: 0,
            bottom: 0
        }
    },
    mutations: {
        setSafeArea(state) {
            if (app.$mode != 'app') return;
            let { top, bottom } = api.safeArea;
            top = top * dpr;
            bottom = bottom * dpr;
            state.safeArea = {...state.safeArea, top, bottom };
        }
    }
})

export default store;