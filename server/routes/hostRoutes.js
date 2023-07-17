const express=require("express");
const router=express.Router();
const hostController=require("../controllers/hostController");

router.get("/login",hostController.hostLogin);



module.exports=router;