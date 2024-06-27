const express = require("express");

const router = express.Router();



const authcontroller = require("../Controllers/auth-controller");



const {signupschema,loginschema} = require("../validators/auth-validator");


const validate = require("../middleware/validate-middleware");


const authMiddleware =  require("../middleware/auth-middleware");


router.route("/").get(authcontroller.home);


router.route("/register").post( validate(signupschema) , authcontroller.register);
router.route("/login").post( validate(loginschema) , authcontroller.login);




router.route("/user").get( authMiddleware , authcontroller.user);  // first : authMiddleware  ,, user in controller 



// router.route("/register").get((req,res) => {
//     res.status(200).send("Welcome to registeration Page");
// })

// Or another way , but upper is good , also get put update can be given in single shot

// router.get("/register" , (req,res)=>{
//     res.status(200).send("Welcome to the Registeration Page Specially");
// });

module.exports = router; // exports not export
