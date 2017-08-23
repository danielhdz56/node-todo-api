var mongoose = require('mongoose');

// User Model
// email - require it - trim it - type string - set min length of 1
var User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 1
    }
});

module.exports = {User};