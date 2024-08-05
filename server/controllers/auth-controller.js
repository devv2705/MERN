const User=require("../models/user_model")

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

        const userCreated=await User.create({username,email,phone,password})

        res.status(200).json(userCreated)
    }catch(err){
        console.log(err)
    }
}

module.exports={home,register}
