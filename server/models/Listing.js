const mongoose=require("mongoose");

const listingSchema= new mongoose.Schema({
    ListingID:{
        type:String,
        default:null
    },
    img_url1:String,
    img_url2:String,
    img_url3:String,
    img_url4:String,
    img_url5:String,
    Title:String,
    Address:{
        Line1:String,
        Line2:String,
        District:String,
        State:String,
        Pincode:Number
    },
    host:{
        hostID:String,
        hostUserName:String,
        hostTotalListingsCount:Number

    },
    Desc1:String,
    Desc2:String,
    MaxGuests:Number,
    CostPerN:Number,
    Bedrooms:Number,
    Bathrooms:Number,
    PropertyType:String,
    RoomType:String,
    Facilities:[]
});

listingSchema.index({ListingID:'text','Address.District':'text','Address.State':'text',Title:'text'});

module.exports=mongoose.model('Listing',listingSchema);