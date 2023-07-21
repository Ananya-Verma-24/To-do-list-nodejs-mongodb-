//import mongoose
const mongoose = require('mongoose');

//Make schema for determining the type of data
const todoSchema = new mongoose.Schema({
    task : {
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    }
});

//make variable schema
const Todo = mongoose.model('Todo',todoSchema);
module.exports = Todo;