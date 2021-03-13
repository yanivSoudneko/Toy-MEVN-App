import { httpService } from './http.service';
import { storageService } from './storage.service';
const USER_URL = 'user/';
const AUTH_URL = 'auth/';
const LS_KEY = 'loggedUser';
export const userService = {
    login,
    checkStoredUser,
    logout,
    signup,
};

async function login(user) {
    const { username, password } = user;
    try {
        const userRes = await httpService.post(AUTH_URL + 'login', {
            username,
            password,
        });
        _storeUserLocally(userRes);
        return userRes;
    } catch (error) {
        throw { error };
    }
}

async function signup(user) {
    try {
        const userRes = await httpService.post(AUTH_URL + 'signup', user);
        _storeUserLocally(userRes);
        return userRes;
    } catch (error) {
        throw { error };
    }
}

async function logout() {
    try {
        const res = await httpService.post(AUTH_URL + 'logout');
        console.log('🚀 ~ file: user.service.js ~ line 47 ~ logout ~ res', res);
        storageService.remove(LS_KEY);
    } catch (error) {
        console.log(
            '🚀 ~ file: user.service.js ~ line 62 ~ logout ~ error',
            error
        );
        return { error };
    }
}

function checkStoredUser() {
    const user = storageService.load(LS_KEY);
    if (user && user.createdAt) {
        const timeNow = Date.now();
        if (timeNow - user.createdAt > 1000 * 60 * 30) {
            console.log('30mins passed');
            storageService.remove(LS_KEY);
            return null;
        }
    }
    return user?._id ? user : null;
}

function _storeUserLocally(user) {
    console.log(
        '🚀 ~ file: user.service.js ~ line 62 ~ _storeUserLocally ~ user',
        user
    );
    if (user._id) {
        user.createdAt = Date.now();
        storageService.store(LS_KEY, user);
    }
}
