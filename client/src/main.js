import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { initFacebookSdk, jwtInterceptor, errorInterceptor, router } from './_helpers';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// Enable interceptor for http requests
jwtInterceptor();
errorInterceptor();

// Wait for facebook sdk to start app
initFacebookSdk().then(startApp);

function startApp() {
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
}
