import httpService from './http.service';
import storageService from './storage.service';
const USER_URL = 'user/';
const AUTH_URL = 'auth/';

export const userService = {
    login,
};

async function login(user) {
    try {
        const { username, password } = user;
        const user = await httpService.post(AUTH_URL + 'login', {
            username,
            password,
        });
        return user;
    } catch (error) {
        console.log(
            '🚀 ~ file: user.service.js ~ line 10 ~ login ~ error',
            error
        );
        return { error };
    }
}
