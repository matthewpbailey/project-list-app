import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';
Vue.config.productionTip = false
Vue.use(Vuetify);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
