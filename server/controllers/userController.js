const User=require('../model/userModel');
const bcrypt=require("bcrypt");
module.exports.register=async(req,res,next)=>{
    try {
    const{Username,Email,Password}=req.body;
    const usernameCheck= await User.findOne({Username});
    if(usernameCheck)
    return res.json({msg:"Username already used",status:false});
    const emailCheck=await User.findOne({Email});
    if(emailCheck)
    return res.json({msg:"Email used already"});
    const hashedPassword=await bcrypt.hash(Password,10);
    const user=await User.create({
        Email,
        Username,
        Password:hashedPassword,
    });
    delete user.Password;
    return res.json({status:true,user});
    } catch (err) {
        next(err);
    }
}
module.exports.login= async(req,res,next)=>{
    try {
    const{Username,Password}=req.body;
    const user= await User.findOne({Username});
    if(!user)
    return res.json({msg:"Incorrect user",status:false});
    const isPasswordValid=await bcrypt.compare(Password,user.Password);
    if(!isPasswordValid){
        return res.json({msg:"Incorrect Password",status:false});
    }
    delete user.Password;
    return res.json({status:true,user});
    } catch (err) {
        next(err);
    }
}
module.exports.setAvatar= async(req,res,next)=>{
    try {
        const userId=req.params.id;
        const avatarImage=req.body.image;
        const userData= await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
    } catch (err) {
        next(err)
    }
}
module.exports.getAllUsers= async(req,res,next)=>{
    try {
        const users=await User.find({_id:{$ne:req.params.id}}).select(["Email","Username","avatarImage","_id"]);
        return res.json(users);
    } catch (err) {
        next(err);
    }
}