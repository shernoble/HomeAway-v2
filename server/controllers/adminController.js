require('../models/database');

const alert=require("alert");

const Admin=require('../models/Admin');
const Listing=require('../models/Listing');
const Guest=require('../models/Guest');
const Host=require('../models/Host');


exports.adminLogin=async(req,res) => {
    try{
        res.render("admin-login");
    }
    catch(err){
        res.render("error");
    }
}

exports.adminLoginPost=async(req,res) => {
    try{
        // check login creds
        const email=req.body.email;
        const pass=req.body.password;
        console.log(email);
        // console.log(pass);
        Admin.find({'Email':email})
        .then(function(results){
            if(results.length!=0){
                // check pass
                // console.log("yes res"+results.length);
                if(results[0].password==pass){
                    // console.log("passs:"+pass);
                    res.redirect("/admin/homepage");
                }
                else{
                    console.log("incorrect password");
                    
                    res.render("admin-login");
                }
            }
            else{
                console.log("no such user found");
                alert("no such user found");
                res.render("admin-login");
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

exports.adminRegister=async(req,res) => {
    try{
        res.render("admin-register");
    }
    catch(err){
        res.render("error");
    }
}

exports.adminRegisterPost=async(req,res) => {
    try{
        const username=req.body.username;
        const email=req.body.email;
        const phone=req.body.phone;
        const pass=req.body.password;
        // console.log(username);
        // console.log(email);


        Admin.find({Email:email})
        .then(function(results){
            console.log(results);
            if(results.length!=0){
                // alert to change
                alert("email already in use");
                res.redirect("/admin/register");
            }
            else{
                // register user
                Admin.create({
                    UserName:username,
                    Email:email,
                    PhoneNumber:phone,
                    password:pass
                })
                .then(function(){
                    res.redirect("/admin/login");
                })
                .catch(function(err){
                    res.status(500).send({message:err.message || "Error Occured"});
                })
                

            }
        })
    }
    catch(err){
        res.render("error");
    }
}

exports.adminHomePage=async(req,res) => {
    try{
        // find listings
        const results=await Listing.find({});
        res.render('admin-homepage',{All_listings:results});
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminGuestlist=async(req,res) => {
    try{

        const results=await Guest.find({});
        res.render('admin-guestlist',{guestList:results});
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminHostlist=async(req,res) => {
    try{
        const results=await Host.find({});
        res.render('admin-hostlist',{hostList:results});
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminReports=async(req,res) => {
    try{
        res.render('admin-reports');
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminVerification=async(req,res) => {
    try{
        res.render('admin-verification');
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.adminDelete=async(req,res) => {
    const item=req.params.option;
    const id=req.body.elementID;
    if(item=='listing'){
        Listing.findOneAndDelete({ListingID:id})
        .then(function(doc){
            console.log("deleted item : "+doc);
        })
        .catch(function(err){
            res.status(500).send({message:err.message || "Error Occured"});
        })
    }
    else if(item=='guest'){
        Guest.findByIdAndDelete({_id:id})
        .then(function(doc){
            console.log("deleted item : "+doc);
        })
        .catch(function(err){
            res.status(500).send({message:err.message || "Error Occured"});
        })
    }
    else if(item=='host'){
        Host.findByIdAndDelete({_id:id})
        .then(function(doc){
            console.log("deleted item : "+doc);
        })
        .catch(function(err){
            res.status(500).send({message:err.message || "Error Occured"});
        })
    }

}

