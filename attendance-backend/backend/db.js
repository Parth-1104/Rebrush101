const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL)

const UserSchema= new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:String
})


// role: {
//     type: String,
//     enum: ["teacher", "student"],
//     required: true,
//   },
  //

const ClassSchema=new mongoose.Schema({
    classname:String,
    teacherId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    studentIds:[{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }]
})

const AttendanceSchema= new mongoose.Schema({
    classId:{
        type:mongoose.Types.ObjectId,
        ref:"class"
    },
    studentId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },

})

const UserModel=mongoose.model("User",UserSchema)
const ClassModel=mongoose.model("class",ClassSchema)
const AttendanceModel=mongoose.model("attend",AttendanceSchema)


module.exports=({
    UserModel,ClassModel,AttendanceModel
})
