const express =require('express');
const {createTodo,updataTodo}=require('./types')
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

app.get("/todos",async function(req ,res){
const Todos=await todo.find({})
console.log(Todos)
res.json({
    Todos
})

})

app.put("/completed",async function(req,res){
const updatepayload=req.body;
const verifypayload=updataTodo.safeParse(updatepayload)
if(!verifypayload.success){
    res.status(411).json({
        msg:"wrong input"
    })
}

await todo.update({
    _id:req.body
},{
    completed:true
})
})


app.listen(3000)