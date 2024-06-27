const express = require("express");

const adminController = require("../Controllers/admin-controller");



const authMiddleware = require("../middleware/auth-middleware");

const adminMiddleware = require("../middleware/admin-middleware");


const router = express.Router();


router.route("/users").get(authMiddleware , adminMiddleware ,   adminController.getAllUsers);  // authmiddleware : for like user autheticated or not ( eg : like user login or not (only for login))  // adminMiddleware : the admin user only login or not  


router.route("/users/:id").get(authMiddleware , adminMiddleware ,   adminController.getUserById);


router.route("/users/update/:id").patch(authMiddleware , adminMiddleware ,   adminController.UpdateUserByID);  // authmiddleware : (1step  :only if user have loggedIn ) , 2nd step admin middleware : user is must admin // 3rd update 


router.route("/users/delete/:id").delete(authMiddleware , adminMiddleware ,   adminController.deleteUserByID);  // authmiddleware : (1step  :only if user have loggedIn ) , 2nd step admin middleware : user is must admin // 3rd delete 


router.route("/contacts/delete/:id").delete(authMiddleware , adminMiddleware ,   adminController.deleteContactByID);  // authmiddleware : (1step  :only if user have loggedIn ) , 2nd step admin middleware : user is must admin // 3rd delete 

router.route("/contacts").get(authMiddleware , adminMiddleware , adminController.getAllContacts);

module.exports = router;