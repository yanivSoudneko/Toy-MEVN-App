import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/vue-toast';

////////I18N////////
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
//i18n
import messages from './plugins/i18n/content.json';

// Create VueI18n instance with options
export const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});
////////////////

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');
