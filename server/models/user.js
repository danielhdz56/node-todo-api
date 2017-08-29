const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({ // Schema lets us add methods
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1,
        unique: true, // verifies that the property email does not have the same value as any other documents in the collection
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () { // defines exactly what is being sent back
    var user = this;
    var userObject = user.toObject(); // takes mongoose variable, user, and converting it to a regular object where only the properites available to the document exist

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() { // allows us to make instance methods, they have access to the individual documents
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access}, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema); 


module.exports = {User};