const express=require("express");
const router=express.Router();
const adminController=require("../controllers/adminController");
const passport=require("passport");

// const adminPassport=require("../../config/passport");

// router.use(adminPassport);

router.get("/login",adminController.adminLogin);

router.get("/homepage",adminController.adminHomePage);
router.get("/guestList",adminController.adminGuestlist);
router.get("/hostList",adminController.adminHostlist);
router.get("/reports",adminController.adminReports);
// router.get("/verification",adminController.adminVerification);
router.get("/register",adminController.adminRegister);
router.get("/logout",adminController.adminLogout);
// router.get("/pr")

// middleware=passport.authenticate('local')->local strategy
router.post("/login",adminController.adminLoginPost);
router.post("/register",adminController.adminRegisterPost);
router.post("/delete/:option",adminController.adminDelete);
// router.post("/delete/:user",adminController.adminDeleteUser);




module.exports=router;