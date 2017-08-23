//Object desconstructering
var user = {name: 'daniel', age: 23};
//the property that we want to pull out, this will also be the variable name
//of the object that we want to deconstruct, in this example, user is the object
var {name} = user;
console.log(name);
console.log('-------------------------------')

//these are the same thing
//const MongoClient = require('mongodb').MongoClient; //this allows you to connect with the mongodb server and issue commands to manipulate the database
//const {MongoClient} = require('mongodb'); //this allows you to connect with the mongodb server and issue commands to manipulate the database

console.log('-------------------------------')
////MongoClient
//allows you to connect with the mongodb server and issue commands to manipulate the database
////ObjectID 
//lets you generate an id
const {MongoClient, ObjectID} = require('mongodb'); 

var obj = new ObjectID();
console.log(obj);