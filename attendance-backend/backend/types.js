const zod=require('zod')

const SignUpSchema=zod.object({
    
        name: zod.string(),
        email: zod.email(),
        password: zod.string().min(6),
        role:zod.enum(["teacher" ,"student"])
      
})


const LoginSchema=zod.object(
    {
        email: zod.email(),
        password: zod.string()
      }
)

const ClassSchema=zod.object(
    {
        className: zod.string()
      }
)

module.exports=({
    SignUpSchema,LoginSchema,ClassSchema
})