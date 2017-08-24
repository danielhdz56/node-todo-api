// library imports
const expect = require('expect');
const request = require('supertest'); //allows mocha to work with express
//local imports
const {app} = require('./../server'); //destructoring to obtain the property, app, from server.js
const {Todo} = require('./../models/todo'); 

// This accounts for the case that there are todos

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});


describe('POST /todos', () => { //describe to group all of the routes 
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err){
                return done(err)
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            })
        });
    });
});