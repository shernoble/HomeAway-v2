require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;
const alert=require("alert");

const myusername="user1";
const mypassword="mypassword";
let session;


const Guest=require('../models/Guest');
const Booking=require('../models/Booking');
const Listing=require('../models/Listing');
const Report=require('../models/Report');



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
    // redirect
    let place=req.body.location;
    let num_guests=req.body.guests;
    res.redirect("/guest/homepage/?location="+place+"&guests="+num_guests);
}

exports.guestHomePageFull=async(req,res) => {
    // directy going without filter
    // display page with all listings
    // handle filters for whole db 
    // no filter upon filter
    try{
        let property_type=req.query.property;
        let val=false;
        session=req.session;
        if(session.userid) val=true;
        console.log("property:"+property_type);
        if(property_type !== undefined && property_type!=="All"){
            Listing.find({ PropertyType: property_type })
            .then(function(results){
                res.render("guest-homepage",{All_listings:results,weather_bool:false,weather_location:"all",guests:0,userLoggedIn:val});
            })
            .catch(function(error){
                res.render("error");
                console.log(error);
            
            })
        }
        if(property_type ==undefined || property_type=="All"){
            Listing.find()
            .then(function(results){
                res.render("guest-homepage",{All_listings:results,weather_bool:false,weather_location:"all",guests:0,userLoggedIn:val});
            })
            .catch(function(error){
                res.render("error");
                console.log(error);
            
            })
        }
    }
    catch(err){
        console.log("error:"+err);
        res.render("error");
    }

}

exports.guestHomePage=async(req,res) => {
    try{
        let val=false;
        session=req.session;
        if(session.userid) val=true;
        let place=req.query.location;
        console.log("place:"+place);
        let num_guests=req.query.guests;
        let query;
        query = {
            $and: [
                { 
                    'Address.District': place 
                },
                { 
                    MaxGuests: { 
                        $gte: num_guests 
                    } 
                }
            ]
        };
        let property_type=req.query.property;
        console.log("hgieor:"+property_type);
        if( property_type !== undefined && property_type!== 'All'){
            console.log("correct hehe");
            query.$and.push({ PropertyType: property_type });
        }
        console.log("query:"+query);
        // if( query !== undefined){
            console.log("herhoerh");
            Listing.find(query)
            
            .then(function(results){
                // if(num_guests){
                const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+process.env.WEATHER_API_KEY+"&units=metric";
                fetch(url)
                    .then(response => response.json())
                        .then(weatherData => {
                            // console.log(weatherData);
                            const temp=weatherData.main.temp;
                            // const temp2 = (temp - 32) * 5 / 9;
                            const weatherDesc=weatherData.weather[0].description;
                            const icon=weatherData.weather[0].icon;
                            const icon_url="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                            res.render("guest-homepage",{All_listings:results, weather_desc:weatherDesc,weather_temp:temp,weather_icon:icon_url,weather_location:place,weather_bool:true,guests:num_guests,userLoggedIn:val});
                        })
                .catch(error => {
                    console.log("error",error);
                })
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

exports.guestLogin=async(req,res) => {
    try{
        const reserve_id=req.query.res_id;
        console.log("res-d:"+reserve_id);
        // if(reserve_id !== undefined){
        //     res.redirect("/guest/reserve/"+reserve_id);
        // }
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
        const res_id=req.query.res_id;
        const email=req.body.email;
        const pass=req.body.password;
        Guest.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                bcrypt.compare(pass,results[0].password,function(err,result){
                    
                    if(result){
                        // create session
                        session=req.session;
                        session.userid=email;
                        console.log(req.session);
                        res.redirect("/guest/startingPage");
                    }
                    else{
                        console.log("incorrect password");
                        alert("incorrect password");
                        res.render("guest-login");
                    }
                    
                })
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


        Guest.find({'Email':email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                // alert to change
                alert("email already in use");
                res.redirect("/guest/register");
            }
            else{
                // register user
                bcrypt.hash(pass,saltRounds,function(err, hash){
                    Guest.create({
                        UserName:username,
                        Email:email,
                        PhoneNumber:phone,
                        password:hash
                    })
                    .then(function(){
                        res.redirect("/guest/login");
                    })
                    .catch(function(err){
                        res.status(500).send({message:err.message || "Error Occured"});
                    })
                
                })
                

            }
        })
    }
    catch(err){
        res.render("error");
        console.log(err);
    }
}

exports.guestLogout=async(req,res) => {
        console.log("session:"+req.session);
        req.session.destroy();
        console.log("session:"+req.session);
        res.redirect('/guest/homepagefull');
}

exports.guestFilter=async(req,res) => {
    const ch=req.body.choice;
    const place=req.query.location;
    const num_guests=req.query.guests;
    if(place !== undefined && place!="all"){
        res.redirect("/guest/homepage/?location="+place+"&guests="+num_guests+"&property="+ch);
    }
    else{
        res.redirect("/guest/homepagefull/?property="+ch);
    }
    
}

exports.guestSearch=async(req,res) => {
    try{
        const item=req.body.searchTerm;
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        console.log("term:"+item);
        // res.render("guest-login");
        Listing.find({$text:{$search:item}})
            .then(function(results){
                res.render("guest-homepage",{All_listings:results,weather_bool:false,userLoggedIn:val});
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
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        Listing.findOne({ListingID:id})
        .then(function(results){
            // console.log("len:"+results);
            res.render("guest-reservation",{Listing:results,userLoggedIn:val});
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

        // check sessions
        session=req.session;
        const id=req.params.id;
        console.log("session user:"+session);
        if(session.userid){
            console.log("hello");
            
            console.log("reservation"+id);
            const ci=new Date(req.body.checkin);
            const co=new Date(req.body.checkout);

                const diffms=Math.abs(co-ci);
                const diffInDays = Math.ceil(diffms / (1000 * 60 * 60 * 24));
                Listing.find({ListingID:id})
                    .then(function(results){
                        // alert("working");
                        console.log(results[0]);
                        res.render("guest-confirmation",{Listing:results[0],num_days:diffInDays, startDate:ci,endDate:co,userLoggedIn:true});
                    })
                    .catch(function(err){
                        // render error page: NOT FOUND ERROR
                        // res.status(500).send({message:err.message || "Error Occured"});
                        console.log(err);
                        res.render("error");
                    });
        }
        else{
            alert("you are required to login first");
            console.log("user not logged in");
            const queryParams={
                reserve_id:id
            }
            // pass reservation id and redirect to reservation page on login
            res.redirect("/guest/login?res_id="+id);
        }
    }
    catch(err){
        console.log(err);
        res.render("error");
    }
}

// exports.guestConfirmBooking=async(req,res) => {
//     // theres no 
// }

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
        Booking.findOne({ListingID:List_id})
        .then((document) => {
            if(document){
                const ti1=date1.getTime();
                const to1=date2.getTime();
                const ti2=document.FromDate.getTime();
                const to2=document.ToDate.getTime();

                console.log();

                if(!(to2<ti1 || ti2>to1 )){
                    // direct back to reservation page
                    // res.redirect(history.back());
                    const previousPage = req.headers.referer || '/';
                    res.redirect(previousPage);
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

exports.guestReport=async(req,res) => {
    try{
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        res.render("guest-report",{userLoggedId:val});
    }
    catch(err){
        console.log("err:"+err);
        res.render("error");
    }
}

exports.guestReportPost=async(req,res) => {
    try{
        // get vals
        session=req.session;
        let val=false;
        if(session.userid) val=true;
        let category=req.body.category;
        console.log("cat:"+category);
        let desc=req.body.description;
        let subject=null
        if(category=="others"){
            subject=req.body.subject;
        }
        //create object
        // send it to mongodb
        // get user login as well

        const new_report=new Report({
            guestID:session.userid,
            category:category,
            subject:subject,
            description:desc
        });
        Report.create(new_report)
                    .then(function(){
                        console.log("report sent");
                        res.render("guest-report",{userLoggedId:val});

                    })
                    .catch(function(err){
                        console.log("error while inserting"+err);
                        res.render("error");
                    })

    }
    catch(err){
        console.log("err:"+err);
        res.render('error');
    }
}






