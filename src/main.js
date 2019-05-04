import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(vant);

Vue.prototype.$store = store;

Vue.prototype.$axios = axios;
Vue.prototype.querystring = require('querystring')

if(process.env.NODE_ENV === 'development') {
    // dev
	Vue.prototype.apiServer = 'http://localhost:8090';
} else {
    // build
	Vue.prototype.apiServer = 'http://39.105.183.52:8090';
}



new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
