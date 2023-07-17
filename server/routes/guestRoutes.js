const express=require("express");
const router=express.Router();
const guestController=require("../controllers/guestController");

router.get("/login",guestController.guestLogin);



module.exports=router;