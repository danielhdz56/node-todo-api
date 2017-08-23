//const MongoClient = require('mongodb').MongoClient; //this allows you to connect with the mongodb server and issue commands to manipulate the database
const {MongoClient, ObjectID} = require('mongodb'); //this allows you to connect with the mongodb server and issue commands to manipulate the database

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //if TodoApp is not created it will be created
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // }, (err, result) => { //this is the callback function
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // Insert new doc into Users (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Daniel',
    //     age: 23,
    //     location: 'Houston'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp())
    // });
    db.close(); //this closes the connection with the mongodb server
});

//      cd mongo/bin/
//      ./mongod --dbpath ~/mongo-data/