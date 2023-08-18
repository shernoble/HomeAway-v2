const express=require("express");
const router=express.Router();
const adminController=require("../controllers/adminController");

router.get("/login",adminController.adminLogin);

router.get("/homepage",adminController.adminHomePage);
router.get("/guestList",adminController.adminGuestlist);
router.get("/hostList",adminController.adminHostlist);
router.get("/reports",adminController.adminReports);
router.get("/verification",adminController.adminVerification);
router.get("/register",adminController.adminRegister);

router.post("/login",adminController.adminLoginPost);
router.post("/register",adminController.adminRegisterPost);
router.post("/delete/:option",adminController.adminDelete);
// router.post("/delete/:user",adminController.adminDeleteUser);




module.exports=router;