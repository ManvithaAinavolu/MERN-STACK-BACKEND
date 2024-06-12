const User=require('../Models/UserModel');
const express=require('express');
const router=express.Router();

router.post('/register',async (req,res)=>{
    try{
        const {name,email,phone,password,cpassword}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'user already exists'});
        }
        user=new User({name,email,phone,password,cpassword});
        await user.save();
        res.status(201).json({msg:'user Registered successfully'});

    }catch(err){
        res.status(500).json({msg:'error occured',err});
    }


});

router.post('/login',async (req,res)=>{
try{
    const {email,password}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:'Invalid email or Password'})
    }
    else if(user.password!==password){
        return res.status(400).json({msg:'Invalid email or password'})
    }
    else{
        return res.status(201).json({msg:'logged in succesfully'});
    }
}catch(err){
    return res.status(500).json({msg:"an error occured",err})
}

})
module.exports = router;
