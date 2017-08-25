const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '59a08e4344bee49f23c97bb211';

if (!ObjectID.isValid(id)){
    console.log('ID not valid')
}


Todo.find({
    // mongoose passes ObjectIds for you, so we dont have to do 
    // _id: new ObjectID("599792f82ebbeef819c14d90"), instead we can just pass in a string
    _id: id 
}).then((todos) => {
    console.log('Todos', todos); // returns an array of objects
});

// better to use if we know that we're trying to fetch one individual item because it returns an object vs an array 
// with an object if there is nothing to fetch it'll return null, which we could later use to return a 404 error
Todo.findOne({ 
    _id: id 
}).then((todo) => {
    console.log('Todo', todo); // returns an object
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found')
    }
    console.log('Todo By Id', todo); // better to use when fetching by id
}).catch((e) => console.log(e));