var mongoose = require('mongoose');

//Promises are a lot easier to chain, manage, and scale
//mongoose by default uses callbacks, so we have to set up mongoose to use promises instead
mongoose.Promise = global.Promise; //
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}