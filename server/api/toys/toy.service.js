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
    saveToyChat,
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
        // const toy = await collection.findOne({ _id: ObjectId(toyId) });
        const toy = await collection
            .aggregate([
                {
                    $match: { _id: ObjectId(toyId) },
                },
                {
                    $lookup: {
                        from: 'review',
                        localField: '_id',
                        foreignField: 'toyId',
                        as: 'reviews',
                    },
                },
            ])
            .toArray();
        // toy.createdAt = ObjectId(toy._id).getTimestamp();
        return toy[0];
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

async function saveToyChat(toyMsg) {
    try {
        console.log(
            '🚀 ~ file: toy.service.js ~ line 83 ~ saveToyChat ~ toyMsg',
            toyMsg
        );
        const toyId = toyMsg.metadata._id;
        const collection = await dbService.getCollection(COLLECTION_NAME);
        const resToy = await collection.findOneAndUpdate(
            { _id: ObjectId(toyId) },
            {
                $push: {
                    chat_history: {
                        from: toyMsg.from,
                        userId: toyMsg.userId,
                        txt: toyMsg.txt,
                        created_at: toyMsg.created_at,
                    },
                },
            }
        );
    } catch (error) {
        logger.error('failed to save toy chat history', error);
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
        const toyId = toyToSave._id;
        delete toyToSave._id;
        const collection = await dbService.getCollection(COLLECTION_NAME);
        const resToy = await collection.findOneAndUpdate(
            { _id: ObjectId(toyId) },
            { $set: toyToSave },
            { returnNewDocument: true }
        );
        return resToy.value;
    } catch (error) {
        logger.error(`cannot update toy ${toy._id}`, error);
        throw error;
    }
}

function _buildCriteria(filterBy) {
    // debugger;
    const aggregateFilter = { $match: {} };
    for (const key in filterBy) {
        const payload = filterBy[key];
        if (payload.hasOwnProperty('text')) {
            aggregateFilter.$match[key] = { $regex: payload.text };
        }
        if (payload.hasOwnProperty('bool')) {
            aggregateFilter.$match[key] = payload.bool;
        }
        if (key === 'created_at') {
            const { start, end } = filterBy[key];
            aggregateFilter.$match[key] = {};
            if (start) {
                aggregateFilter.$match[key].$gte = start;
            }
            if (end) {
                aggregateFilter.$match[key].$lt = end;
            }
        }
        if (key === 'sortBy') {
            const { field } = filterBy[key];
            aggregateFilter.$sort = {};
            aggregateFilter.$sort[field] = 1;
        }
        if (key === 'limit') {
            const { page, limit } = filterBy;
            aggregateFilter.$skip = page > 0 ? (page - 1) * limit : 0;
            aggregateFilter.$limit = limit;
        }
    }
    const { $match, $sort, $skip, $limit } = aggregateFilter;
    const aggregate = [{ $match }, { $sort }, { $skip }, { $limit }];
    return aggregate;
}
// pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0
// created_at: {
//     $gte: ISODate("2010-04-29T00:00:00.000Z"),
//     $lt: ISODate("2010-05-01T00:00:00.000Z")
// }$dateFromString
// {
//     $match: {
//         name: {
//             $regex: 'lac',
//         },
//         inStock: true,
//     },
// },
function _buildCriteriaOrig(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' };
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance };
    }
    return criteria;
}
