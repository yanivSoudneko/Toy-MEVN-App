import { userService } from '../services/user.service';
export default {
    namespaced: true,
    state: { user: null, error: [] },
    getters: {
        user({ user }, getters) {
            return user;
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user;
        },
        setError(state, { error }) {
            state.error.push(error);
        },
        logout(state, payload) {
            state.user = null;
        },
    },
    actions: {
        async login({ commit }, { user }) {
            try {
                const resUser = await userService.login(user);
                if (!resUser) {
                    throw new Error('no user');
                }
                commit({ type: 'setUser', user: resUser });
            } catch (error) {
                console.log(
                    '🚀 ~ file: user.js ~ line 14 ~ login ~ error',
                    error
                );
                commit({ type: 'setError', error });
            }
        },
        async signup({ commit }, user) {
            try {
                const resUser = await userService.signup(user);
                commit({ type: 'setUser', user: resUser });
            } catch (error) {
                console.log(
                    '🚀 ~ file: user.store.js ~ line 38 ~ signup ~ error',
                    error
                );
                commit({ type: 'setError', error });
            }
        },
        logout({ commit }, payload) {
            console.log('logging out')
            userService.logout();
            commit({ type: 'logout' });
        },
        checkStoredUser({ commit }) {
            const resUser = userService.checkStoredUser();
            commit({ type: 'setUser', user: resUser });
        },
    },
    modules: {},
};
