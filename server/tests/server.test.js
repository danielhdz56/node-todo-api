// library imports
const expect = require('expect');
const request = require('supertest'); //allows mocha to work with express
const {ObjectID} = require('mongodb');

//local imports
const {app} = require('./../server'); //destructoring to obtain the property, app, from server.js
const {Todo} = require('./../models/todo'); 

const todos = [{ // this will be added after all of of the docs get removed
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 3
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

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString(); //although this is an object id, it is not in the database
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done)
    });
});

describe('DELETE /todos/:id', () =>{
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString()
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => {
                done(e);
            })
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done)
    });
});
describe('PATCH /todos/:id', () => {
    it('should update todo doc', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = "updated text";

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA("number");
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(text);
                expect(todo.completed).toBe(true);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = "updated text";

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text,
            completed: false
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo.text).toBe(text);
                expect(todo.completed).toBe(false);
                expect(todo.completedAt).toNotExist();
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .patch(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
        .patch(`/todos/123`)
        .expect(404)
        .end(done)
    })


});