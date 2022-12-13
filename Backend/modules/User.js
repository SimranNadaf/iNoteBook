// import mongoose from 'mongoose';
const mongoose=require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type :String,
        required: true,
        unique : true
    },
    password : {
        type :String,
        require : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
});

const User= mongoose.model('user',UserSchema);
// User.createIndexes(); -- is remove to avoid email id index(id is required only)
module.exports = User