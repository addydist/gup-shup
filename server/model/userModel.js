const mongoose= require('mongoose');

const userSchema=new mongoose.Schema({
    Username:{
        type:String,
        require:true,
        min:4,
        max:22,
        unique:true
    },
    Email:{
        type:String,
        require:true,
        max:32,
        unique:true
    },
    Password:{
        type:String,
        require:true,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:'',
    }
});
module.exports =mongoose.model("Users",userSchema);