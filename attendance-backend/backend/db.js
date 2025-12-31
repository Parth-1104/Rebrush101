
require("dotenv").config();
const mongoose = require("mongoose");

// -------------------- DB CONNECT --------------------
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is missing");
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

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
        ref:"Class"
    },
    studentId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },

})

const UserModel=mongoose.model("User",UserSchema)
const ClassModel=mongoose.model("Class",ClassSchema)
const AttendanceModel=mongoose.model("Attend",AttendanceSchema)


module.exports=({
    UserModel,ClassModel,AttendanceModel
})
