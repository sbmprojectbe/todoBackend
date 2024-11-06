const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    todoName: {
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    isCompleted:{
        type:Boolean,
        required: true
    },
    desc:{
        type:String,
        required:false  
    }
})

const Todo = mongoose.model('Todo',taskSchema)

module.exports = Todo

