require('../models/database');

const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');

exports.guestLogin=async(req,res) => {
    try{
        res.render('Login');
    }
    catch(err){
        
    }
}

exports.guestLoginPost=async(req,res) => {
    try{
        // check login creds
        const email=req.body.email;
        const pass=req.body.password;
        Guest.find({'Email':email})
        .then(function(results){
            if(results){
                // check pass
                if(results[0].password==pass){
                    // console.log(pass);
                    res.redirect("/guest/homepage");
                }
                else{
                    console.log("incorrect password");
                    
                    res.render("Login");
                }
            }
            else{
                console.log("no such user found");
                // alert("no such user found");
                res.render("Login");
            }
        })
        .catch(function(error){
            res.status(500).send({message:error.message || "Error Occured"});
        })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.guestRegister=async(req,res) => {
    try{
        res.render('guestRegister');
    }
    catch(err){
        
    }
}

exports.guestRegisterPost=async(req,res) => {
    try{
        // add new guest
    }
    catch(err){
        
    }
}

exports.guestHomepage=async(req,res) => {
    try{
        Listing.find({})
        .then(function(results){
            res.render("guest-homepage",{All_listings:results});
        })
        .catch(function(error){
            res.status(500).send({message:err.message || "Error Occured"});

        })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.guestFilter=async(req,res) => {

}

exports.guestSearch=async(req,res) => {
    try{
        const item=req.body.searchTerm;
        Listing.find({$text:{$search:item}})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results});
            })
            .catch(function(error){
                res.status(500).send({message:err.message || "Error Occured"});
    
            })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.guestReserve=async(req,res) => {
    try{
        // get listingID
        const id=req.params.id;
        Listing.findOne({ListingID:id})
        .then(function(results){
            res.render("guest-reserve",{Listing:results[0]});
        })
        .catch(function(err){
            res.status(500).send({message:err.message || "Error Occured"});

        })
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.guestReservePost=async(req,res) => {
    try{
        // get listingID
        // do validation check in separate js file
        // ->check if dates are valid and number of guests is valid
        const id=req.params.id;
        console.log("reservation"+id);
        const ci=new Date(req.body.checkin);
        const co=new Date(req.body.checkout);
        // check if logged in using sessions first
        const diffms=Math.abs(co-ci);
        const diffInDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
        House.find({ListingID:id})
            .then(function(results){
                res.render("guest-confirmation",{Listing:results[0],num_days:diffInDays, startDate:ci,endDate:co});
            })
            .catch(function(err){
                // render error page: NOT FOUND ERROR
                console.log(err);
            });
        
    }
    catch(err){

    }
}

exports.guestConfirmBooking=async(req,res) => {
    try{
        // booking takes place
        // get data
    // create new booking object
    //add to data
    const List_id=req.query.listID;
    // console.log(List_id);
    const host_id=req.query.hID;
    // console.log(host_id);
    const date1=new Date(req.query.startDate);
    const date2=new Date(req.query.endDate);

    const new_booking=new Booking ({
        ListingID:List_id,
        GuestID:"B123",
        HostID:host_id,
        FromDate:date1,
        ToDate:date2
    });
    // Booking.create(new_booking)
    // .then(function(){
        Booking.findOne({ListingID:List_id})
        .then((document) => {
            if(document){
                const ti1=date1.getTime();
                const to1=date2.getTime();
                const ti2=document.FromDate.getTime();
                const to2=document.ToDate.getTime();

                if(!(to2<ti1 || ti2>to1 )){
                    console.log("booking dates not available.");
                }
                else{
                    Booking.create(new_booking)
                    .then(function(){
                        console.log("inserted booking");
                        res.render("congog");

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                    })
                }
            }
        })
        .catch((error) => {
            console.log("error while searching for doc "+error);
        })

    }
    catch(err){

    }
}

exports.guestConfirmBookingPost=async(req,res) => {
    try{
        // booking takes place
        
        
    }
    catch(err){

    }
}




