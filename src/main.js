import Vue from 'vue'
import App from './App.vue'

import './plugins'
import './index.scss';

import './core/index';

import router from "./router/router";
import {store} from './store';

import i18n from './i18n';

import {Multiselect} from "vue-multiselect";

Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false

new Vue({i18n, store, router, render: h => h(App)}).$mount('#app')
