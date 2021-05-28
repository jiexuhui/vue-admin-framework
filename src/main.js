/* eslint-disable */

import Vue from "vue";
import axios from 'axios'
Vue.prototype.axios = axios


import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./assets/icon/iconfont.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import router from "./router";
import store from "./store";

/*echarts*/
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import i18n from "./lang"; // Internationalization
import "./icons"; // icon
import "./errorLog"; // error log
import "./permission"; // permission control
// import "./mock"; // simulation data
// import qs from "qs";

import * as filters from "./filters"; // global filters
// Vue.prototype.$qs = qs;

// jsonp跨域
import VueJsonp from 'vue-jsonp' 
Vue.use(VueJsonp)

Vue.use(Element, {
  size: "medium", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  template: "<App/>",
  components: { App }
});
