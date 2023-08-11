const mongoose=require("mongoose");

const hostSchema= new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

hostSchema.index({UserName:'text',Email:'text'});

module.exports=mongoose.model('Host',hostSchema);