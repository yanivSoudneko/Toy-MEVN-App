import { reviewService } from '../services/review.service';
import Vue from 'vue';
export default {
    namespaced: true,
    state: { reviews: [], },
    getters: {
        reviews({ reviews }, getters) {
            return reviews;
        },
        error({ error }) {
            return error;
        },
    },
    mutations: {
        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        setError(state, { error }) {
            console.log("🚀 ~ file: review.store.js ~ line 19 ~ setError ~ error", error)
            state.error = error;
            if (state.error) {
                Vue.$toast.open({
                    message: 'error:' + JSON.stringify(error),
                    type: 'error',
                });
            }
        },
    },
    actions: {
        async loadReviews({ commit }) {
            try {
                const reviews = await reviewService.getReviews();
                console.log("🚀 ~ file: review.store.js ~ line 32 ~ loadReviews ~ reviews", reviews)
                commit({ type: 'setReviews', reviews });
            } catch (error) {
                commit({ type: 'setError', error });
            }
        },
    },
};
