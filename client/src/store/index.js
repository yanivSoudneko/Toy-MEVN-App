import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import userModule from './user.store';

export default new Vuex.Store({
    namespaced: true,
    module: {
        user: userModule,
    },
});
