var mongoose = require('mongoose');

//Promises are a lot easier to chain, manage, and scale
//mongoose by default uses callbacks, so we have to set up mongoose to use promises instead
mongoose.Promise = global.Promise; //
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', { //creates a personlized way to organize data
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var myTodo = new Todo({
   text: 'Something to do'
});

myTodo.save().then((doc) => {
    console.log(`Saved todo: ${doc}`);
}, (e) => {
    console.log(`Unable to save todo ${e}`);
});

// User Model
// email - require it - trim it - type string - set min length of 1

var User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

var newUser = new User({
    email: ''
});

newUser.save().then((doc) => {
    console.log(`Saved user: ${doc}`);
}, (e) => {
    console.log(`Unable to save user: ${e}`);
});