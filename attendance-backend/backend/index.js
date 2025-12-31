const express=require('express')
const { SignUpSchema, LoginSchema } = require('./types')
const { UserModel } = require('./db')
const jwt= require('jsonwebtoken')
const { authMiddleware } = require('./middleware')
require("dotenv").config();

const app=express()

app.use(express.json())



app.post("/auth/signup",async(req,res)=>{
    const {success,data}=SignUpSchema.safeParse(req.body);
    if(!success)
    {
        res.status(400).json(
            {
                "success": false,
                "error": "Invalid request schema",
              }
        )
        return;
    }

    const user=await UserModel.findOne({email:data.email})
    if(user)
    {
        res.status(400).json({
            "success": false,
            "error": "Email already exists"
          })
          return;
    }

    const userdb=await UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role:data.role // hashed with bcrypt
    })
    res.json({
        success:true,
        data:{
            _id:userdb._id,
            name:userdb.name,
            email:userdb.email,
            password:userdb.password
        }
    })

})

app.post('/auth/login',async(req,res)=>{
const {success,data}=LoginSchema.safeParse(req.body);
if(!success)
{
    res.status(400).json(
        {
            "success": false,
            "error": "Invalid request schema"
          }
    )
    return
}

const userdb= await UserModel.findOne({email:data.email})

if(!userdb||data.password!=userdb.password)
{
    res.status(400).json(
        {
            "success": false,
            "error": "Invalid email or password"
          }
    )
    return
}

const token=jwt.sign({
    role:userdb.role,
    userId:userdb._id

},process.env.JWT_SECRET)

res.json(
    {
        "success": true,
        "data": {
          "token": token
        }
      }
)
})


app.get('/auth/me',authMiddleware,async (req,res)=>{
    const userdb=await UserModel.findById(req.userId)
    if(!userdb)
    {
        res.status(400).json({
            message:"should not have reached here"
        })
        return
    }
    res.json(
        {
            "success": true,
            "data": {
              "_id": userdb._id,
              "name": userdb.name,
              "email": userdb.email,
              "role": userdb.role
            }
          }

    )
})


app.listen(3000)