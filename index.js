const express = require('express')
const app = express()

const mongoose = require('mongoose')

const bodyParser = require('body-parser')


app.use(bodyParser.json())


const Todo = require('./model/Todo')

// const mongoDBAccess = 'mongodb+srv://dabocer237:stUJYnu4RxkAJBpr@project1.8cm3j.mongodb.net/'

const mongoDBAccess = 'mongodb+srv://feyeh82081:Z8mc52keBd9Xk0pj@project1.hmzjy.mongodb.net/'

app.get('/', (request, response) => {
 response.send('hello')
})


mongoose.connect(mongoDBAccess).then(() => console.log('Connected!'));

// this is to create or add to the DB

// task.save()

app.post('/task', (req,res)=>{
const addTask = async () => {
    try{
        let task = new Todo({
            todoName:req.body.todoName,
            isCompleted: false,
            date:req.body.date,
            desc:req.body.desc
        })
        let data = await task.save()
        res.send({msg:'successful or task added', data})
    }catch (error){
        res.send(error)
    }
}
addTask()
})

// this is to read data from the DB

app.get('/tasks', (req, res) => {
const findAllTodos = async () => {
    try{
        const todo = await Todo.find()
        res.send(todo)
    } catch (error){
        res.send(error)
    }
}
findAllTodos()
})

//https://docs.google.com/presentation/d/1mbQs2XTaFEi3T-ASt3EhCo6VrvCOB4YgnD32_kXEDZw/edit#slide=id.g4dfce81f19_0_45
// this is to update data from the DB

app.put('/task/:id',(req,res)=>{
    //req.body - data they want to send, in the body {}
    //req.params - added in the url

    const updateData = async () => {
        try {
            let data = await Todo.findOneAndUpdate({_id:req.params.id},{isCompleted:req.body.isCompleted,todoName:req.body.todoName})
            res.send(data)
        }catch (error){
            res.send(error)

        }
    }
    updateData() 

})


// this is to delete data from DB

app.delete('/task/:id', (req, res) => {
const deleteData = async () => {
    try {
        let data = await Todo.findByIdAndDelete(req.params.id)
        res.send(data)
    }catch (error) {
        res.send(error)
    }
}
deleteData()
})


// Http Methods => GET, POST, UPDATE, DELETE, PATCH,PUT



  
app.listen(4000)