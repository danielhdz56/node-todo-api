const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// removes all docs from database
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// remove one and returns something so you can do something with the data, unlike Todo.remove({}) 
// Todo.findOneAndRemove()
// remove one by Id
Todo.findByIdAndRemove('59a0c39bb5f9e0027e4dde29').then((todo) => {
    console.log(todo);
});