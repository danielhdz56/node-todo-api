// library imports
const expect = require('expect');
const request = require('supertest'); //allows mocha to work with express
//local imports
const {app} = require('./../server'); //destructoring to obtain the property, app, from server.js
const {Todo} = require('./../models/todo'); 

const todos = [{ // this will be added after all of of the docs get removed
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

beforeEach((done) => { // This accounts for the case that there are todos, by deleting all docs from the collection
    Todo.remove({}).then(() => { // after it deletes all data then
        return Todo.insertMany(todos); // its going to insert an array of seed data, todos. By using return I can chain callbacks
    }).then(() => done()); //then i can tack on done()
});


describe('POST /todos', () => { //describe: to group all of the routes 
    it('should create a new todo', (done) => {
        var text = 'Test to do text';

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

            Todo.find({text}).then((todos) => { // i am only finding those that have the text, 'Test to do text'
                expect(todos.length).toBe(1); // only one that i just posted will be there
                expect(todos[0].text).toBe(text); // the text property should still be the same
                done();
            }).catch((e) => {
                done(e);
            })
        });
    });
    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err)
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2); // length of seed data is 2
                done();  
            }).catch((e) => {
                done(e);
            })
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});