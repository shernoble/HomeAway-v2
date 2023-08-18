require('../models/database');

const Host=require("../models/Host");
const Listing=require("../models/Listing");
const Booking=require("../models/Booking");
const Guest=require("../models/Guest");

const alert=require("alert");

exports.hostLogin=async(req,res) => {
    try{
        res.render("host-login");
    }
    catch(err){
        
    }
}

exports.hostLoginPost=async(req,res) => {
    try{
        // check login creds
        const email=req.body.email;
        const pass=req.body.password;
        Host.find({'Email':email})
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

exports.hostRegister=async(req,res) => {
    try{
        res.render('host-register');
    }
    catch(err){
        
    }
}

exports.hostRegisterPost=async(req,res) => {
    try{
        const username=req.body.username;
            const email=req.body.email;
            const phone=req.body.phone;
            const pass=req.body.password;
            // console.log(username);
            // console.log(email);
    
    
            Host.find({Email:email})
            .then(function(results){
                console.log(results);
                if(results.length!=0){
                    // alert to change
                    alert("email already in use");
                    res.redirect("/host/register");
                }
                else{
                    // register user
                    Host.create({
                        UserName:username,
                        Email:email,
                        PhoneNumber:phone,
                        password:pass
                    })
                    .then(function(){
                        res.redirect("/host/login");
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
