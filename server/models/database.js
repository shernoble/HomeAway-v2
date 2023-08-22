const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology:true});

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error :'));
db.once('open',function(){
    console.log("connected");
});

require('./Admin');
require('./Guest');
require('./Host');
require('./Listing');
require('./Booking');