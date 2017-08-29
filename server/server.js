require('./config/config');
//library imports
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); 
const {ObjectID} = require('mongodb');

// local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000; //gets the environment port variable that heroku is going to set, if not on heroku it will be 3000

app.use(bodyParser.json()); // middleware, extracts the entire body portion of an incoming request and exposes it on req.body

app.post('/todos', (req, res) => { 
    var todo = new Todo({
        text: req.body.text // obtains the text property from the post request
    }); 

    todo.save().then((doc) => { //saves it to the database and returns a promise, then
        res.send(doc); // sends back to the client that made the req 
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => { // client makes request to API
    Todo.find().then((todos) => { // find and return a promise, then
        res.send({todos}); // all todos will be sent back to the client that made the request
    }, (e) => {
        res.status(400).send(e);
    });
});

// This is how to fetch a variable that is in the url
// GET /todos/123432
app.get('/todos/:id', (req, res) => {
    // req.params is an object that has key value pairs,
    // where the key is the url like parameter, and the value is what was actually placed there
    // '/todos/:id'  the keys is, id
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid ID');
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        } 

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;

    // validate the id -> not valid? return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    // remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo}); //make sure its an object so you can modify properties on it, if not it will be an array
    }).catch((e) => {
        res.status(400).send();
    });
     //success
      //if no doc, send 404
      //if doc, send doc back with 200
     //error
      //400 with empty body
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})

    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']); //from the request I am going to only pick up the email and password, b/c we don't want users to be able to mainpulate the token property
    var user = new User(body); // body is an object so we can write it like so

    user.save().then(() => {
        return user.generateAuthToken(); //we return it to add another then callback
        //res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user); // when we use 'x-' we are creating a custom header
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.get('/users/me', authenticate, (req, res) => {
   res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};