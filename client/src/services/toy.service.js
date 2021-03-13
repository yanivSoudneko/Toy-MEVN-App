import { httpService } from './http.service';

const TOY_URL = 'toy/';

export const toyService = {getToys};

async function getToys(filterBy = {}) {
    try {
        const toys = await httpService.get(TOY_URL);
        return toys;
    } catch (error) {
        throw { error };
    }
}
