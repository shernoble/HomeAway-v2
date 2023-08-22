const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const adminSchema= new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

adminSchema.index({UserName:'text',Email:'text'});

module.exports=mongoose.model('Admin',adminSchema);