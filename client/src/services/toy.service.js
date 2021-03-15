import { httpService } from './http.service';

const TOY_URL = 'toy/';

export const toyService = { getToys, getById, save };

async function getById(id) {
    try {
        const toy = await httpService.get(TOY_URL + id);
        return toy;
    } catch (error) {
        throw { error };
    }
}
function save(toy) {
    if (toy._id) {
        return httpService.put(TOY_URL + toy._id, toy);
    } else {
        return httpService.post(TOY_URL + toy);
    }
}
async function getToys(filterBy = {}) {
    try {
        const toys = await httpService.get(TOY_URL);
        return toys;
    } catch (error) {
        throw { error };
    }
}
