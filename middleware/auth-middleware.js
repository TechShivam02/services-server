require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../modals/user-modal");


const authMiddleware = async(req,res,next) => {
    
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({msg : "Unauthorized HTTP , Token Not Provided"});
    }

    // console.log("token from middleware : " , token);   // token from middleware :  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxYjI0M2FmNGU3ZmQxZDczMDk2MWMiLCJlbWFpbCI6InNoaXZhbTIwMjRAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcwOTczNTMzOSwiZXhwIjoxNzEyMzI3MzM5fQ.RFfzQKo8yXwfEEfA227kICARA_XIeqpsPBTMsZrttog

    // we are getting "Bearer #######"  we have to remove "Bearer space"  , only need token ###  so replace "Bearer "  with ""
    

    const myJwtToken = token.replace("Bearer " , "");
    console.log("token from middleware :" , myJwtToken);  // token from middleware : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxYjI0M2FmNGU3ZmQxZDczMDk2MWMiLCJlbWFpbCI6InNoaXZhbTIwMjRAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcwOTczNTMzOSwiZXhwIjoxNzEyMzI3MzM5fQ.RFfzQKo8yXwfEEfA227kICARA_XIeqpsPBTMsZrttog




    try {
         
        const isVerified = jwt.verify(myJwtToken , process.env.MY_JWT_SECRET_KEY);
        console.log(isVerified);   // userId , email , isAdmin    // that what we passed  the payload (UserModel  (jwt.sign) , so jata pass krte ho jwt.sign vo data in response milta hai , verify k wakt) , while creating jwt token , that's why we passed these infos only
        
        const userData  = await User.findOne({email : isVerified.email}).select({password:0}); // "User"  from  user-model (User we require on top) ,, Note we will get whole user details by findOne("")  .select({password:0})  means Except password
        
        console.log(userData);  // whole data about the user (username , email , phone  , isAdmin)   not gte password bcz password : 0 


        req.user = userData;  // in req.user whole current user details , except password  
        req.token = token;
        req.userID = userData._id;

// anybody can use the  "req.user" when require(auth middleware)   , so in req.user  its complete user data (which is currently logged In) but (Except the password) 
        // is passed through auth-route authController.user  // in user of auth controller  req.user  will have the UserData the above we just passed 

        next();
    
    } catch (error) {
        return res.status(401).json({msg : "Unauthorized HTTP , Token Not Provided"});
        
    }





}

module.exports = authMiddleware;