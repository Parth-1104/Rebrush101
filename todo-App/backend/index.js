const express =require('express');
const {createTodo}=require('./types')
const {todo}=require('./db')
const app=express();

app.use(express.json())


app.post("/todo",async function(req ,res){
const payload=req.body
const verify=createTodo.safeParse(payload)
if(!verify.success)
{
    res.status(411).json({
        message:"not valid template"
    })
    return;
}
await todo.create({
    title:payload.title,
    description:payload.description,
    completed:false
})
res.json({
    msg:"Created successfully"
})


})

app.get("/todos",function(req ,res){

})

app.put("/completed",function(req,res){

})