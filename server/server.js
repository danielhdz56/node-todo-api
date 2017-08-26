//library imports
var express = require('express');
var bodyParser = require('body-parser'); 
var {ObjectID} = require('mongodb');

// local imports
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

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
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
     //success
      //if no doc, send 404
      //if doc, send doc back with 200
     //error
      //400 with empty body
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};