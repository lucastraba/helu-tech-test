import Vue from 'vue';
import App from './App.vue';
import RestPlugin from './plugins/rest';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import './assets/styles.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(RestPlugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
