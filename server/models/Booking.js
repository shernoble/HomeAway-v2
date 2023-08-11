const mongoose=require("mongoose");

const bookingSchema= new mongoose.Schema({
    ListingID:{
        type:String,
        required:true
    },
    GuestID:{
        type:String,
        required:true
    },
    HostID:{
        type:String,
        required:true
    },
    FromDate:{
        type:Date,
        required:true
    },
    ToDate:{
        type:Date,
        required:true
    }
});

module.exports=mongoose.model('Booking',bookingSchema);