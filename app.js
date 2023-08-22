const express=require("express");
// const expressLayouts=require("express-ejs-layouts");
// const alert=require("alert");
const session=require("express-session");
const cookieParser=require("cookie-parser");

require('dotenv').config();

const app=express();

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({
//     secret:'',
//     saveUninitialized:true,
//     cookie:{maxAge:oneDay},
//     resave:false

// }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// app.use(expressLayouts);

app.use(cookieParser());

// app.set('layout','./layouts/main');
app.set('view engine','ejs');

// const myusername = 'user1'
// const mypassword = 'mypassword'
// var session;


const genRoutes=require("./server/routes/genRoutes.js");
app.use("/",genRoutes);

const adminRoutes=require("./server/routes/adminRoutes");
app.use("/admin",adminRoutes);

const guestRoutes=require("./server/routes/guestRoutes");
app.use("/guest",guestRoutes);

const hostRoutes=require("./server/routes/hostRoutes");
app.use("/host",hostRoutes);




app.listen(3000, () => {
    console.log("server started at port 3000");
});

