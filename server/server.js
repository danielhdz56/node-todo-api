//library imports
var express = require('express');
var bodyParser = require('body-parser'); 
var {ObjectID} = require('mongodb');

// local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};