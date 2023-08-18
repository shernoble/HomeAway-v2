require('../models/database');

const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');
const alert=require("alert");


exports.guestStartingPage=async(req,res) => {
    try{
        res.render("guest-startingPage");
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestStartingPagePost=async(req,res) => {
    try{
        let place=req.body.location;
        console.log("place:"+place);
        // res.render("guest-login");
        let num_guests=req.body.number;
        
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestLogin=async(req,res) => {
    try{
        res.render('guest-login');
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestLoginPost=async(req,res) => {
    try{
        // check login creds
        const email=req.body.email;
        const pass=req.body.password;
        Guest.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                if(results[0].password==pass){
                    // console.log(pass);
                    res.redirect("/guest/homepage");
                }
                else{
                    console.log("incorrect password");
                    alert("incorrect password");
                    
                    res.render("guest-login");
                }
            }
            else{
                console.log("no such user found");
                alert("no such user found");
                res.render("guest-login");
            }
        })
        .catch(function(error){
            res.render("error");
            console.log(error);
        })
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestRegister=async(req,res) => {
    try{
        res.render('guest-register');
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestRegisterPost=async(req,res) => {
    try{
    const username=req.body.username;
        const email=req.body.email;
        const phone=req.body.phone;
        const pass=req.body.password;
        // console.log(username);
        // console.log(email);


        Guest.find({Email:email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                // alert to change
                alert("email already in use");
                res.redirect("/guest/register");
            }
            else{
                // register user
                Guest.create({
                    UserName:username,
                    Email:email,
                    PhoneNumber:phone,
                    password:pass
                })
                .then(function(){
                    res.redirect("/guest/login");
                })
                .catch(function(err){
                    res.render("error");
                    console.log(err);
                })
                

            }
        })
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestHomepage=async(req,res) => {
    try{
        Listing.find({})
        .then(function(results){
            res.render("guest-homepage",{All_listings:results});
        })
        .catch(function(error){
            res.render("error");
            console.log(error);

        })
    }
    catch(err){
        console.log(err);
        res.render("error");
    }
}

exports.guestFilter=async(req,res) => {
    const ch=req.body.choice;
    console.log(ch);
    if(ch!="All")
        {Listing.find({PropertyType:ch})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results});
            })
            .catch(function(err){
                console.log(err);
                res.render("error");
            });}
    else{
        Listing.find({})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results});
            })
            .catch(function(err){
                console.log(err);
                res.render("error");
            });
        }
}

exports.guestSearch=async(req,res) => {
    try{
        const item=req.body.searchTerm;
        console.log("term:"+item);
        // res.render("guest-login");
        Listing.find({$text:{$search:item}})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results});
            })
            .catch(function(error){
                // res.status(500).send({message:error.message || "Error Occured"});
                console.log(error);
                res.render("error");
    
            })
    }
    catch(err){
        // res.status(500).send({message:err.message || "Error Occured"});
        console.log(err);
        res.render("error");
    }
}

exports.guestReserve=async(req,res) => {
    try{
        // get listingID
        const id=req.params.id;
        console.log("id:"+id);
        Listing.findOne({ListingID:id})
        .then(function(results){
            // console.log("len:"+results);
            res.render("guest-reservation",{Listing:results});
        })
        .catch(function(err){
            // res.status(500).send({message:err.message || "Error Occured"});
            console.log(err);
            res.render("error");

        })
    }
    catch(err){
        // res.status(500).send({message:err.message || "Error Occured"});
        console.log(err);
        res.render("error");
    }
}

exports.guestReservePost=async(req,res) => {
    try{
        // get listingID
        // do validation check in separate js file-NO, because repetition in calculating num of days
        // ->check if dates are valid and number of guests is valid
        // goes to confirmation page



        const id=req.params.id;
        console.log("reservation"+id);
        const ci=new Date(req.body.checkin);
        const co=new Date(req.body.checkout);

            const diffms=Math.abs(co-ci);
            const diffInDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
            Listing.find({ListingID:id})
                .then(function(results){
                    // alert("working");
                    console.log(results[0]);
                    res.render("guest-confirmation",{Listing:results[0],num_days:diffInDays, startDate:ci,endDate:co});
                })
                .catch(function(err){
                    // render error page: NOT FOUND ERROR
                    // res.status(500).send({message:err.message || "Error Occured"});
                    console.log(err);
                    res.render("error");
                });
    }
    catch(err){
        console.log(err);
        res.render("error");
    }
}

exports.guestConfirmBooking=async(req,res) => {
    // theres no 
}

exports.guestConfirmBookingPost=async(req,res) => {
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

                console.log();

                if(!(to2<ti1 || ti2>to1 )){
                    console.log("booking dates not available.");
                }
                else{
                    Booking.create(new_booking)
                    .then(function(){
                        console.log("inserted booking");
                        res.render("congrats");

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        // console.log(err);
                        res.render("error");
                    })
                }
            }
            else{
                Booking.create(new_booking)
                    .then(function(){
                        console.log("inserted booking");
                        res.render("congrats");

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        res.render("error");
                    })
            }
        })
        .catch((error) => {
            console.log("error while searching for doc "+error);
            res.render("error")
        })

    }
    catch(err){
        console.log(err);
        res.render("error");
    }
}






