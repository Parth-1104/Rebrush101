const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://singhparth427:parth427@cluster0.632ns.mongodb.net/todo")

const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})

const todo=mongoose.model('todos',todoSchema);

module.exports=({
    todo
})