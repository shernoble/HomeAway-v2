require('../models/database');

const bcrypt=require("bcrypt");
const saltRounds=10;
const alert=require("alert");

const Host=require("../models/Host");
const Listing=require("../models/Listing");
const Booking=require("../models/Booking");
const Guest=require("../models/Guest");



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
                bcrypt.compare(pass,results[0].password,function(err,result){
                    
                    if(result){
                        res.redirect("/host/homepage");
                    }
                    else{
                        console.log("incorrect password");
                        alert("incorrect password");
                        res.render("host-login");
                    }
                    
                })
            }
            else{
                console.log("no such user found");
                alert("no such user found");
                res.render("host-login");
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
                    bcrypt.hash(pass,saltRounds,function(err, hash){
                        Host.create({
                            UserName:username,
                            Email:email,
                            PhoneNumber:phone,
                            password:hash
                        })
                        .then(function(){
                            res.redirect("/host/login");
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
