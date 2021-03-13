const bcrypt = require('bcryptjs');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

async function login(username, password) {
    const user = await userService.getByUsername(username);
    console.log('🚀 ~ file: auth.service.js ~ line 10 ~ login ~ user', user);
    if (!user) return Promise.reject('Invalid username or password');
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Promise.reject('Invalid username or password');

    delete user.password;
    return user;
}

async function signup(username, password, lname, fname) {
    const user = await userService.getByUsername(username);
    if (user) {
        return Promise.reject('Username not available');
    }
    const saltRounds = 10;

    logger.debug(
        `auth.service - signup with username: ${username}, fullname:${lname}-${fname}`
    );
    if (!username || !password || !lname || !fname) {
        return Promise.reject('fullname, username and password are required!');
    }

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, lname, fname });
}

module.exports = {
    signup,
    login,
};
