// library imports
const expect = require('expect');
const request = require('supertest');
//local imports
const {app} = require('./../server'); //destructoring to obtain the property, app, from server.js
const {Todo} = require('./../models/todo'); 

describe('POST /todos', () => { //describe to group all of the routes 
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
    });
});