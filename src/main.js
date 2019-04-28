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


Vue.prototype.$axios = axios;
Vue.prototype.querystring = require('querystring')

// if(process.env.NODE_ENV === 'development') {
//     // dev
// 	Vue.prototype.apiServer = 'http://172.168.3.39:9001';
// } else {
//     // build
// 	Vue.prototype.apiServer = '';
// }



new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
