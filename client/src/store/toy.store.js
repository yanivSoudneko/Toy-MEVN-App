import { toyService } from '../services/toy.service';
import Vue from 'vue';

export default {
    namespaced: true,
    state: { toys: [], error: '' },
    getters: {
        toys({ toys }, getters) {
            return JSON.parse(JSON.stringify(toys));
        },
        error({ error }) {
            return error;
        },
    },
    mutations: {
        setError(state, { error }) {
            state.error = error;
            if (state.error) {
                Vue.$toast.open({
                    message: 'error:' + JSON.stringify(error),
                    type: 'error',
                });
            }
        },
        setToys(state, { toys }) {
            state.toys = toys;
        },
    },
    actions: {
        async loadToys({ commit }) {
            try {
                const toys = await toyService.getToys();
                commit({ type: 'setToys', toys });
                return true;
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
    },
};
