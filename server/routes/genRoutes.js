const express=require("express");
const router=express.Router();
const genController=require("../controllers/genController");

router.get("/",genController.firstPage);
// router.post("/",genController.formUser);


module.exports=router;