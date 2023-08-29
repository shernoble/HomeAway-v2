const mongoose=require("mongoose");

const passportLocalMongoose=require("passport-local-mongoose");

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
// adminSchema.plugin(passportLocalMongoose,{usernameField:'Email'});

module.exports=mongoose.model('Admin',adminSchema);