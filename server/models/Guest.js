const mongoose=require("mongoose");

const guestSchema= new mongoose.Schema({
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
    },
    Bookings:{
        type:[String],
        required:false
    },
    Reviews:{
        type:[String],
        required:false
    }
});

guestSchema.index({UserName:'text',Email:'text'});

module.exports=mongoose.model('Guest',guestSchema);