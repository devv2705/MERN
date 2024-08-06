const User=require("../models/user_model")
const bcrypt=require("bcryptjs")

const home=async (req,res)=>{
    try{
        
        res.status(200).send("Welcome Dev")

    }catch(err){
        console.log(err);
    }
}

const register=async(req,res)=>{
    try{
        //console.log(req.body)
        const {username,email,phone,password}=req.body

        const userExist=await User.findOne({email:email})


        if(userExist){
            return res.status(400).json({msg:"Email Already Exist"})
        }

        //hash the password
        const hashcount=10
        const hash_pass=await bcrypt.hash(password,hashcount)

        const userCreated=await User.create({username,email,phone,password:hash_pass})

        res.status(201).json({msg:"Registration Successfull",token:await userCreated.generateToken(),userId:userCreated._id.toString()})
    }catch(err){
        res.status(500).json("Internal server Error")
    }
}


module.exports={home,register}
