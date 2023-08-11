const express=require("express");
const router=express.Router();
const guestController=require("../controllers/guestController");

router.get("/login",guestController.guestLogin);
router.get("/register",guestController.guestRegister);
router.get('/homepage',guestController.guestHomepage);
router.get('/reserve/:id',guestController.guestReserve);
router.get('/confirmBooking/:id',guestController.guestConfirmBooking);

router.post("/login",guestController.guestLoginPost);
router.post("/register",guestController.guestRegisterPost);
router.post('/reserve/:id',guestController.guestReservePost);
router.post('/confirmBooking/:id',guestController.guestConfirmBookingPost);
router.post('/search',guestController.guestSearch);
router.post('/filter',guestController.guestFilter);



module.exports=router;