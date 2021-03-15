import { toyService } from '../services/toy.service';
import Vue from 'vue';

export default {
    namespaced: true,
    state: { toys: [], error: '' },
    getters: {
        toys({ toys }, getters) {
            return JSON.parse(JSON.stringify(toys));
        },
        toy: ({ toys }) => (toyId) => {
            // console.log('🚀 ~ file: toy.store.js ~ line 12 ~ toyId', toyId);
            const toy = toys.find((toy) => toy._id === toyId);
            // console.log('🚀 ~ file: toy.store.js ~ line 13 ~ toy', toy);
            return toy;
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
        updateToy({ toys }, { toy }) {
            const idx = toys.findIndex((_toy) => {
                return _toy._id === toy._id;
            });
            if (idx === -1) {
                return;
            }
            toys.splice(idx, 1, toy);
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
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
        async getById({ commit }, { toyId }) {
            try {
                const toy = await toyService.getById(toyId);
                commit({ type: 'updateToy', toy });
                return toy;
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
        async updateToy({ commit }, { toy }) {
            try {
                const currToy = await toyService.save(toy);
                commit({ type: 'updateToy', toy: currToy });
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
    },
};
