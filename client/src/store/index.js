import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import userModule from './user.store';
import toyModule from './toy.store';

export default new Vuex.Store({
    modules: {
        user: userModule,
        toy: toyModule,
    },
});
