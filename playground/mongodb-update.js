////MongoClient
//allows you to connect with the mongodb server and issue commands to manipulate the database
////ObjectID 
//lets you generate an id
const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //if TodoApp is not created it will be created
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("599dd677b5f9e0027e4dce7c")
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('599ddcbdb5f9e0027e4dcfd9')
    }, {
        $set: {
            name: 'DonDaniel'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close(); //this closes the connection with the mongodb server
});

//      cd mongo/bin/
//      ./mongod --dbpath ~/mongo-data/