const express=require("express");
const expressLayouts=require("express-ejs-layouts");

require('dotenv').config();

const app=express();


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(expressLayouts);

app.set('layout','./layouts/main');
app.set('view engine','ejs');

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

