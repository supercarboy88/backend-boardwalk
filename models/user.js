"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        max: [320, "Email address is too long"],
        required: true
    },
    password: {
        type: String,
        min: [8, "Password must be a minimum of 8 characters long"],
        max: [64, "Password cannot be greater than 64 characters long"],
        required: true,
        select: false
    }
});

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
} 

const User = mongoose.model('User', userSchema);

module.exports = User;


// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const validator = require('validator');

// var userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         minlength: 5,
//         trim: true,
//         // unique username
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         minlength: 5,
//         trim: true,
//         unique: true,
//         // validate email 
//         validate: {
//           validator: validator.isEmail,
//           message: props => `${props.value} is not a valid email!`
//         }
//     }
// });

// // Handler **must** take 3 parameters: the error that occurred, the document in question, and the `next()` function
// userSchema.post('save', function(error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       // Default error message 'There was a duplicate key error'
//       // However, username duplication error was taken care of in the usersController before the email duplication error
//       // When username is correct/is not duplicate and there is ONLY email duplication error, display the following message
//       next(new Error('This email already exists. Please try another one.'));
//     } else {
//       next();
//     }
//   });


// module.exports = mongoose.model('User', userSchema);