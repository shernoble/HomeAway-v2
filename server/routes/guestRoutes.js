const express=require("express");
const router=express.Router();
const guestController=require("../controllers/guestController");

router.get("/login",guestController.guestLogin);
router.get("/register",guestController.guestRegister);
router.get('/startingPage',guestController.guestStartingPage);
router.get('/homepage',guestController.guestHomePage);
router.get('/homepagefull',guestController.guestHomePageFull);
router.get('/reserve/:id',guestController.guestReserve);
router.get("/logout",guestController.guestLogout);
router.get("/report",guestController.guestReport);
router.get('/profile',guestController.guestProfile);

// router.get('/confirmBooking/:id',guestController.guestConfirmBooking);


router.post("/login",guestController.guestLoginPost);
router.post("/register",guestController.guestRegisterPost);
router.post("/startingPage",guestController.guestStartingPagePost);
router.post('/reserve/:id',guestController.guestReservePost);
router.post('/confirmBooking',guestController.guestConfirmBookingPost);
router.post('/search',guestController.guestSearch);
router.post('/filter',guestController.guestFilter);
router.post('/report',guestController.guestReportPost);



module.exports=router;