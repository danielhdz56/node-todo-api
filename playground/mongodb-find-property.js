////MongoClient
//allows you to connect with the mongodb server and issue commands to manipulate the database
////ObjectID 
//lets you generate an id
const {MongoClient, ObjectID} = require('mongodb'); 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { //if TodoApp is not created it will be created
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db.collection('Todos').find({
        completed: true
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
    
    //db.close(); //this closes the connection with the mongodb server
});

//      cd mongo/bin/
//      ./mongod --dbpath ~/mongo-data/