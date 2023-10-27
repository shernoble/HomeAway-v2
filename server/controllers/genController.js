require('../models/database');
const session=require("express-session");


exports.firstPage=async(req,res) => {
    try{
        // add 3 way choice here
        res.render('firstPageUser');
    }
    catch(err){
        console.log(err);
        res.render('error');
    }
}

exports.contactPage=async(req,res) => {
    try{
        res.render('contactus');
    }
    catch(err){
        console.log(err);
        res.render('error');
    }
}
exports.faqsPage=async(req,res) => {
    try{
        res.render('FAQs');
    }
    catch(err){
        console.log(err);
        res.render('error');
    }
}
exports.aboutPage=async(req,res) => {
    try{
        res.render('aboutus');
    }
    catch(err){
        console.log(err);
        res.render('error');
    }
}