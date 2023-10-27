
//yaha pe sab connections honge
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs");

// const assert = require("assert");
const router = express.Router();





require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;
const alert=require("alert");
let objtot = {};
const myusername="user1";
const mypassword="mypassword";
let session;


const Host=require("../models/Host");
const Listing=require("../models/Listing");
const Booking=require("../models/Booking");
const Guest=require("../models/Guest");

exports.hostSignup=async(req,res)=>
{
    
        console.log("hostSignup function called");
        
      
    Host.find({$or: [ { Email: req.body.email }, { UserName: req.body.name } ]})
    .then(function(results){
        if(results.length!=0){
            alert("Account already exists! please login");
            res.render("signup");
        }
        else if(req.body.password == req.body.confirmpassword){  
            Host.create({
                UserName:req.body.name,
                PhoneNumber:req.body.phnum,
                Email:req.body.email,
                password:req.body.password
            })
            .then(function(){
                res.render("login");
            })
            .catch(function(err){
                console.log(err);
            }) 
            }
            else
            {
               res.render("Signup");
            }
    });
    
    
}



// exports.hostedit=async(req,res)=>
// {
    
//     await Host.updateOne(
//         { Username: req.session.Hostid },
//         {
//             $set: {
//                 PhoneNumber: req.body.ph
//             }
//         }
//     );

//     const Hostinfo = [];
//     const hostDocuments = Host.find({ UserName: req.session.Hostid });

//     hostDocuments.forEach((Hostie) => {
//         Hostinfo.push(Hostie);
//     });

//     res.render('profile', { Hostinfo });
// };
//     const Hostinfo=[];
//     const vais=(Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
//         Hostinfo.push(Hostie)
//     });
//     res.render('profile',{Hostinfo});


// }


exports.hostlogin=async(req,res)=>
{
    Host.find({Email:req.body.email})
    .then(async(results)=>
    {        
            if(results.length === 0)
            {
                alert("Incorrect UserEmail / U dont have account");
                res.render("login")
                
            }
            else if(results[0].password==req.body.passw)
            {
               
                objtot.hostUserName=results[0].UserName;
                req.session.Hostid= results[0].UserName;
                
                const houseinfo=[];
                 const hsin=(await Listing.find({'host.0.hostUserName': { $eq: req.session.hostid }})).forEach((house)=>{
                houseinfo.push(house);
    });
    res.render('p12h',{houseinfo});
            }
            else
            {
                alert("Incorrect Password");
                res.render("login")
            }
    })
    .catch(function(err){
        console.log(err);
    })

}
exports.PropertyType=async(req,res)=>{
    objtot.PropertyType=req.body.option;
    console.log(objtot);
     res.render("p3h");
 }
exports.RoomType=async(req,res)=>{
    objtot.RoomType=req.body.btn;
    console.log(objtot);
     res.render("p4h");
}
exports.Address=async(req,res)=>{
    objtot.Address={
        "Line1":req.body.street,
        "Line2":req.body.flat,
        "District":req.body.city,
        "State":req.body.state,
        "Pincode":req.body.code
    }
    
   console.log(objtot);
   res.render("p5h");
}

exports.Info=async(req,res)=>{
    objtot.MaxGuests=req.body.guests;
    objtot.Bedrooms=req.body.bedroom;
    objtot.Bathrooms=req.body.bathroom;
    console.log(objtot);
    res.render("p6h");
 }
exports.Facilities=async(req,res)=>{
    objtot.Facilities = req.body.chkboxs;
    console.log(objtot);
    res.render("p7h");
 }


const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..','..','uploads', 'images-' + Date.now());

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });


exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const files = req.files.map(file => ({
      name: file.originalname,
      path: file.path,
    }));

    
    objtot.img_url1 = files[0];
    objtot.img_url2 = files[1];
    objtot.img_url3 = files[2];
    objtot.img_url4 = files[3];
    objtot.img_url5 = files[4];

    console.log(objtot);

    res.render('p8h');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during processing' });
  }
};

 
 exports.Title=async(req,res)=>{
    objtot.Title=req.body.txtar;
    console.log(objtot);
    res.render("p9h");
 }
 exports.Desc1=async(req,res)=>{
    objtot.Desc1=req.body.txtarr;
    console.log(objtot);
    res.render("p10h");
 }
 exports.CostPerN=async(req,res)=>{
    objtot.CostPerN=req.body.valueinput;
    console.log(objtot);
    res.render("congo");
}


exports.houses=async(req,res)=>{
    console.log(objtot);
const path1 = objtot.img_url1.path;
const path2 = objtot.img_url2.path;
const path3 = objtot.img_url3.path;
const path4 = objtot.img_url4.path;
const path5 = objtot.img_url5.path;
const startIndex = path1.indexOf("uploads");
const trimmedPath1 = path1.substring(startIndex); 
const trimmedPath2 = path2.substring(startIndex); 
const trimmedPath3 = path3.substring(startIndex);
const trimmedPath4 = path4.substring(startIndex);
const trimmedPath5 = path5.substring(startIndex);

    
   await  Listing.create({
        
        img_url1:trimmedPath1,
        img_url2:trimmedPath2,
        img_url3:trimmedPath3,
        img_url4:trimmedPath4,
        img_url5:trimmedPath5,
        Title:objtot.Title,
        Address:[objtot.Address],
        Desc1:objtot.Desc1,
        CostPerN:objtot.CostPerN,
        Bedrooms:objtot.Bedrooms,
        Bathrooms:objtot.Bathrooms,
        PropertyType:objtot.PropertyType,
        RoomType:objtot.RoomType,
        host:{
            hostUserName:objtot.hostUserName
        },
        MaxGuests:objtot.MaxGuests,
        Facilities:[objtot.Facilities]

    })
    const houseinfo=[];
                 const hsin=(await Listing.find({'host.0.hostUserName': { $eq: req.session.hostid }})).forEach((house)=>{
                houseinfo.push(house);
                 });
    res.render('p12h',{houseinfo});
}
exports.profilehost=async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
}
exports.editpage=async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('edit',{Hostinfo});
}
exports.listpage=async(req,res)=>{
    const houseinfo=[];
    const hsin=(await Listing.find({'host.0.hostUserName': { $eq: req.session.hostid }})).forEach((house)=>{
        houseinfo.push(house);
    });
    res.render('p12h',{houseinfo});
}
exports.resetfun=async(req,res)=>
{
    await Host.find({Username:req.body.edit})
        .then(async(result)=>
        {    
            result.email=req.body.edit2;
            result.PhoneNumber=req.body.edit3;
        })
    
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
}





exports.Listingofhost=async(req,res)=>{
    const houseinfo=[];
    const hsin=(await Listing.find({'host.0.hostUserName': { $eq: req.session.hostid }})).forEach((house)=>{
        houseinfo.push(house);
    });
    res.render('p12h',{houseinfo});
}
exports.hostprofile=async(req,res)=>{
    const Hostinfo=[];
    const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
        Hostinfo.push(Hostie)
    });
    res.render('profile',{Hostinfo});
}
exports.logouthost=async(req,res)=>
{
    req.session.destroy();
    console.log("logged out successfully");
    res.redirect('/');
};

    
    
//     exports.hosteditprof = async (req, res) => {
        
//             // Update the host's email and phone number in the database
//          await   Host.updateOne(
//                 { Username: req.body.edit },
//                 {
//                     $set: {
//                         email: req.body.edit2,
//                         PhoneNumber: req.body.edit3
//                     }
//                 }
//             );
//     const Hostinfo=[];
//     const vais=(await Host.find({UserName:req.session.Hostid})).forEach((Hostie)=>{
//         Hostinfo.push(Hostie)
//     });
//     res.render('profile',{Hostinfo});
    
    
// }



// require('../models/database');

// const bcrypt=require("bcrypt");
// const saltRounds=10;
// const alert=require("alert");

// const myusername="user1";
// const mypassword="mypassword";
// let session;


// const Host=require("../models/Host");
// const Listing=require("../models/Listing");
// const Booking=require("../models/Booking");
// const Guest=require("../models/Guest");



// exports.hostLogin=async(req,res) => {
//     try{
//         res.render("host-login");
//     }
//     catch(err){
        
//     }
// }

// exports.hostLoginPost=async(req,res) => {
//     try{
//         // check login creds
//         const email=req.body.email;
//         const pass=req.body.password;
//         Host.find({'Email':email})
//         .then(function(results){
//             if(results.length!=0){
//                 // check pass
//                 bcrypt.compare(pass,results[0].password,function(err,result){
                    
//                     if(result){
//                         // create session
//                         session=req.session;
//                         session.userid=email;
//                         console.log(req.session);
//                         res.redirect("/host/homepage");
//                     }
//                     else{
//                         console.log("incorrect password");
//                         alert("incorrect password");
//                         res.render("host-login");
//                     }
                    
//                 })
//             }
//             else{
//                 console.log("no such user found");
//                 alert("no such user found");
//                 res.render("host-login");
//             }
//         })
//         .catch(function(error){
//             res.render("error");
//             console.log(error);
//         })
//     }
//     catch(err){
//         res.render("error");
//         console.log(err);
//     }
// }

// exports.hostRegister=async(req,res) => {
//     try{
//         res.render('host-register');
//     }
//     catch(err){
        
//     }
// }

// exports.hostRegisterPost=async(req,res) => {
//     try{
//         const username=req.body.username;
//             const email=req.body.email;
//             const phone=req.body.phone;
//             const pass=req.body.password;
//             // console.log(username);
//             // console.log(email);
    
    
//             Host.find({Email:email})
//             .then(function(results){
//                 console.log(results);
//                 if(results.length!=0){
//                     // alert to change
//                     alert("email already in use");
//                     res.redirect("/host/register");
//                 }
//                 else{
//                     // register user
//                     bcrypt.hash(pass,saltRounds,function(err, hash){
//                         Host.create({
//                             UserName:username,
//                             Email:email,
//                             PhoneNumber:phone,
//                             password:hash
//                         })
//                         .then(function(){
//                             res.redirect("/host/login");
//                         })
//                         .catch(function(err){
//                             res.status(500).send({message:err.message || "Error Occured"});
//                         })
                    
//                     })
                    
    
//                 }
//             })
//         }
//         catch(err){
//             res.render("error");
//             console.log(err);
//         }
// }

// exports.hostLogout=async(req,res) => {
//     req.session.destroy();
//     res.redirect('/');
// }
