const express=require("express");
const router=express.Router();
const hostController=require("../controllers/hostController");

router.get("/login",hostController.hostLogin);
router.get("/register",hostController.hostRegister);

router.post("/login",hostController.hostLoginPost);
router.post("/register",hostController.hostRegisterPost);


module.exports=router;