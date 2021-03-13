const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;
const COLLECTION_NAME = 'toy';

module.exports = {
    query,
    remove,
    save,
    update,
    getById,
};

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME);
        var toys = await collection.find({}).toArray();
        toys = toys.map((toy) => {
            toy.createdAt = ObjectId(toy._id).getTimestamp();
            return toy;
        });
        return toys;
    } catch (error) {
        logger.error('cannot find toys', error);
        throw error;
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME);
        const toy = await collection.findOne({ _id: ObjectId(toyId) });
        toy.createdAt = ObjectId(toy._id).getTimestamp();
        return toy;
    } catch (error) {
        logger.error('cannot find toy:' + toyId, error);
        throw error;
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME);
        await collection.deleteOne({ _id: ObjectId(toyId) });
    } catch (error) {
        logger.error('failed to delete toy:' + toyId, error);
        throw error;
    }
}

async function save(toy) {
    try {
        const toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
        };
        const collection = await dbService.getCollection(COLLECTION_NAME);
        await collection.insertOne(toyToAdd);
        return toyToAdd;
    } catch (error) {
        logger.error('failed to save toy', error);
        throw error;
    }
}

async function update(toy) {
    try {
        const validKeys = ['name', 'price', 'type', 'inStock', '_id'];
        const toyToSave = {};
        for (const key in toy) {
            if (validKeys.includes(key)) {
                toyToSave[key] = toy[key];
            }
        }

        const collection = await dbService.getCollection(COLLECTION_NAME);
        await collection.updateOne({ _id: toyToSave._id }, { $set: toyToSave });
        return toyToSave;
    } catch (error) {
        logger.error(`cannot update toy ${toy._id}`, error);
        throw error;
    }
}
