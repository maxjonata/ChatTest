import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.use(Vuex);

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'https://3000-b2d146a5-ad86-4edf-9a37-1fe31485af09.ws-us02.gitpod.io',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
