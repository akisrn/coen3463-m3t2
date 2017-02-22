var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username:
     {
     	type: [String, 'Username must only contain alpha characters'],
     	unique: [true, 'Username already exists!'],
     	required: [true, 'Username is required'],
     	minlength: [8, 'Username must be at least 8 characters.'],
        maxlength: [20, 'Username must be less than 20 characters.'],
     },
    first_name: { type: String },
    last_name: { type: String },
    email:
     {type: String}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);