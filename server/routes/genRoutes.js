const express=require("express");
const router=express.Router();
const genController=require("../controllers/genController");

router.get("/",genController.firstPage);
router.get('/contactus',genController.contactPage);
router.get('/aboutus',genController.aboutPage);
router.get('/faqs',genController.faqsPage);


module.exports=router;