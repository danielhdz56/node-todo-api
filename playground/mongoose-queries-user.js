const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '599dec43b333e5ee0543cedb';

if(!ObjectID.isValid(id)){
    console.log(`Invalid id: ${id}`)
}

// Both are the same

// Promise version
User.findById(id).then((user) => {
    if(!user) {
        return console.log('Unable to find user');
    }
    console.log(`User: ${JSON.stringify(user, undefined, 2)}`);
}).catch((e) => console.log(`${e}`));


// Callback version 
User.findById(id).then((user) => {
    if(!user) {
        return console.log('Unable to find user');
    }
    console.log(`User: ${JSON.stringify(user, undefined, 2)}`);
}, (e) => {
    console.log(e);
});