require('../models/database');


exports.firstPage=async(req,res) => {
    try{
        // res.redirect('https://www.bing.com/ck/a?!&&p=04708d4a0511ddf8JmltdHM9MTY4NjcwMDgwMCZpZ3VpZD0yZGFkODU1Ni1jZDhiLTY1ZWMtMGViNS05N2RmY2M3YzY0YzEmaW5zaWQ9NTE4Ng&ptn=3&hsh=3&fclid=2dad8556-cd8b-65ec-0eb5-97dfcc7c64c1&psq=youtube&u=a1aHR0cDovL2luLnlvdXR1YmUuY29tLw&ntb=1');
        // res.render('Login');
        res.render('admin-homepage');
    }
    catch(err){
        console.log(err);
    }
}