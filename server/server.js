var mongoose = require('mongoose');

//Promises are a lot easier to chain, manage, and scale
//mongoose by default uses callbacks, so we have to set up mongoose to use promises instead
mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', { //creates a personlized way to organize data
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

var myTodo = new Todo({
    text: 'Finish this course',
    completed: true,
    completedAt: 1111111111
});

myTodo.save().then((doc) => {
    console.log(`Saved todo: ${doc}`);
}, (e) => {
    console.log(`Unable to save todo ${e}`);
});