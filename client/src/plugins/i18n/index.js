import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
//i18n
import messages from './content.json';

// Create VueI18n instance with options
export const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});
