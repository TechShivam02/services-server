const express = require("express");

const router = express.Router();



const contactcontroller = require("../Controllers/contact-controller.js");


// const signupschema = require("../validators/auth-validator");
 
// const validate = require("../middleware/validate-middleware");



router.route("/contact").post(contactcontroller.contactform);


module.exports = router; // exports not export
