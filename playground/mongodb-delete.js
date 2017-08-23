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

    // deleteMany
    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete, allows to delete and display the one that was deleted 
    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({
        name: 'Daniel'
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID("599dc1e99ff04583631ed7cd")
    }).then((result) => {
        console.log(result);
    });



    // db.close();
});

//      cd mongo/bin/
//      ./mongod --dbpath ~/mongo-data/