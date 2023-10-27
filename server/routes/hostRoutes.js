
const express=require("express");
const router=express.Router();
const multer = require("multer");
const path = require('path');
const uploadDir = path.join(__dirname,'..','..', 'uploads', 'images-' + Date.now());
const hostController=require("../controllers/hostController");
const { route } = require("./genRoutes");
// const hostRoutes=require("./server/routes/hostRoutes");
const { get } = require("http");
const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended:true}));


// router.set("view engine",'ejs');
// router.set('views','./views');
router.get("/p12h",hostController.Listingofhost);
router.get("/profile",hostController.hostprofile);
router.post("/logout1",hostController.logouthost);
router.get("/reset",hostController.resetfun);
router.get("/goedit",hostController.editpage);



router.post("/p2h",hostController.PropertyType);
router.post("/p3h",hostController.RoomType);
router.post("/p4h",hostController.Address);
router.post("/p5h",hostController.Info);
router.post("/p6h",hostController.Facilities);
router.post("/p8h",hostController.Title);
router.post("/p9h",hostController.Desc1);
router.post("/p10h",hostController.CostPerN);
router.post("/congo",hostController.houses);
router.post("/prof",hostController.profilehost);

router.post("/reset",hostController.resetfun);
router.post("/signup",hostController.hostSignup); 
router.post("/login",hostController.hostlogin);
router.post("/gop12h",hostController.listpage);
router.post('/p7h', multer({ dest: uploadDir }).array('images'), hostController.uploadImages);

module.exports=router;
// In your hostRoutes file
// hostRoutes.get("/test", (req, res) => {
//     res.send("Test route is working.");
//   });
  