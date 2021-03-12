//find all
db.getCollection('toy').find();

//findById

//insert
db.getCollection('toy').insert(one);
db.getCollection('toy').insert([one, two, ...n]);

//updateall
db.getCollection('toy').update(
    {},
    { $set: { created_at: new Timestamp() } },
    { upsert: true, multi: true }
);

//partial update
db.getCollection('user').update(
    { _id: ObjectId('604be10968167f37495d7de1') },
    { $set: { password: 'GHGHGHGHHGH' } }
);

//push to nested with ObjectId
db.getCollection('toy').update(
    { _id: ObjectId('604a4476b0970589d41401ac') },
    {
        $push: {
            reviews: {
                _id: ObjectId(),
                byUserId: ObjectId('604a4b34b0970589d41401de'),
                created_at: new Timestamp(),
                text: 'blah',
            },
        },
    }
);

//find and exclude a field
db.getCollection('user').find({}, { password: 0 });

//find and add a field created_at
db.getCollection('user').aggregate([
    {
        $addFields: {
            created_at: {
                $toDate: '$_id',
            },
        },
    },
]);

// upsert creates new if none exists
// https://docs.mongodb.com/manual/reference/method/db.collection.update/
