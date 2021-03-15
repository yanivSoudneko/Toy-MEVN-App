import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import reviewModule from './review.store';
// import {socketStore} from './socket.store.js'
import toyModule from './toy.store';
import userModule from './user.store';

export default new Vuex.Store({
    modules: {
        user: userModule,
        toy: toyModule,
        review: reviewModule,
    },
});
