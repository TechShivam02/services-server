const express = require("express");
const router = express.Router();

const servicecontroller = require("../Controllers/service-controller.js");


router.route("/service").get(servicecontroller);


module.exports = router; // exports not export