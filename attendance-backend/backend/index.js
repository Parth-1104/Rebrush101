const express=require('express')
const { SignUpSchema, LoginSchema } = require('./types')
const { UserModel } = require('./db')
const { jwt } = require('jsonwebtoken')
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

    const user=await UserModel.findOne(data.email)
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
        password: data.password, // hashed with bcrypt
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

const userdb= await UserModel.findOne(data.email)

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

},process.env.jwt_password)

res.json(
    {
        "success": true,
        "data": {
          "token": token
        }
      }
)
})


app.get()


app.listen(3000)