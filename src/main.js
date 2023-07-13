/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'

import App from './App'
import router from './router'
import store from './store'

import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'

// lyr modify
import HttpRequest from '@/libs/axios.js'

const http = new HttpRequest('http://localhost:8091')

http.request({
  method: 'get',
  url: 'tour/user/info',
  params: {
    id: 1
    // page: 1,
    // limit: 10
  }
}).then(response => {
  console.log(response.data)
}).catch(error => {
  console.error(error)
})
// end lyr modify

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

// Vue.use(ViewUI)
Vue.use(ViewUI, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})
// Vue.use(ViewUI, { i18n: i18n })

Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)
// import VueAMap from "vue-amap";
// Vue.use(VueAMap);
// // 初始化vue-amap
// VueAMap.initAMapApiLoader({
//   key: "x", // 这里写你申请的高德地图的key
//   plugin: ["AMap.Autocomplete", "AMap.Geocoder", "AMap.Geolocation", "AMap.ToolBar", "AMap.Scale", "AMap.OverView", "AMap.PlaceSearch", "AMap.MapType", "AMap.PolyEditor", "AMap.CircleEditor", "AMap.MarkerClusterer", "AMap.Heatmap"],
//   v: "1.4.15",
//   uiVersion: "1.1"
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
