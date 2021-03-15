import { httpService } from './http.service';
const REVIEW_URL = 'review/';

export const reviewService = {
    getReviews
};

async function getReviews() {
    try {
        const reviews = await httpService.get(REVIEW_URL);
        return reviews;
    } catch (error) {
        throw { error };
    }
}
