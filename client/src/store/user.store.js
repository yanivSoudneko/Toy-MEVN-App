import { userService } from '../services/user.service';
export default {
    namespaced: true,
    state: { user: null, error: [] },
    mutations: {
        setUser(state, { user }) {
            state.user = user;
        },
        setError(state, { error }) {
            state.error.push(error);
        },
    },
    actions: {
        async login({ commit }, { user }) {
            try {
                const resUser = userService.login(user);
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
    },
    modules: {},
};
