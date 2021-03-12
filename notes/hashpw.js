require('dotenv').config();
const bcrypt = require('bcryptjs');
const dbService = require('./services/db.service');
const ObjectId = require('mongodb').ObjectId;

// const match = await bcrypt.compare(password, user.password);
async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) return reject(err);
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) return reject(err);
                    resolve(hash);
                });
            });
        });

        return hashedPassword;
    } catch (error) {
        console.log(
            '🚀 ~ file: hashpw.js ~ line 34 ~ hashPassword ~ error',
            error
        );
    }
}

main();

async function main() {
    try {
        const collection = await dbService.getCollection('user');
        console.log(
            '🚀 ~ file: hashpw.js ~ line 19 ~ main ~ collection',
            collection
        );
        const users = await collection.find().toArray();
        console.log('🚀 ~ file: hashpw.js ~ line 49 ~ main ~ users', users);
        users.forEach(async (user) => {
            var { _id, password } = user;
            password = await hashPassword(password);
            const updateduser = await collection.update(
                { _id: ObjectId(_id) },
                { $set: { password: password } }
            );
            console.log(
                '🚀 ~ file: hashpw.js ~ line 58 ~ users.forEach ~ updateduser',
                updateduser
            );
        });
    } catch (error) {
        console.log('🚀 ~ file: hashpw.js ~ line 20 ~ main ~ error', error);
    }
}
