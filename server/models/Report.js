const mongoose=require("mongoose");

const reportSchema= new mongoose.Schema({
    // take the report id as the actual object id
    guestID:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subject:{
        type:String
    },
    description:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Report',reportSchema);