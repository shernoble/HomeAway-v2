const express = require("express");
const sessions = require("express-session");
const cookieParser=require("cookie-parser");
const bodyParser=require('body-parser');
// const MongoStore = require("connect-mongo");
// const mongoose = require("mongoose");
// const passport = require("passport");

// const admin_passport=require("./config/passport");
// const guest_passport=require("./config/guest-passport");


require('dotenv').config();

const app=express();

app.set('view engine','ejs');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// sessions
// const sessionStore=new MongoStore({mongooseConnection:mongoose.connection});
//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

app.use(
    sessions({
        secret:'Our lil secret.',
        resave:false,
        saveUninitialized:true,
        // store:MongoStore.create({
        //     mongoUrl:process.env.MONGODB_URI
        // }),
        cookie:{
            maxAge:1000*60*60*24//equal to 1 day
        }
    })
);

// passport authentication


// PASSPORT
// initialize passport middleware-so that it doesnt get "stale"-refreshes passport middleware everytime we load the website
// app.use(passport.initialize());

// tell app to use passport to set up session-works with express.session middleware
// app.use(passport.session());

// app.use("/admin",passport.authenticate('admin'));
// app.use("/admin",admin_passport);

const genRoutes=require("./server/routes/genRoutes.js");
app.use("/",genRoutes);

const adminRoutes=require("./server/routes/adminRoutes");
app.use("/admin",adminRoutes);

const guestRoutes=require("./server/routes/guestRoutes");
app.use("/guest",guestRoutes);

const hostRoutes=require("./server/routes/hostRoutes");
// const { connection } = require("mongoose");
app.use("/host",hostRoutes);




app.listen(3000, () => {
    console.log("server started at port 3000");
});

