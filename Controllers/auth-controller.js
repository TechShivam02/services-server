const User = require("../modals/user-modal");

const bcrypt = require("bcryptjs");



const home = async(req,res)=>{
    try{
        res.status(200).send("welcome to home using Controller");
    }
    catch(error){
        console.log(error);
    }
}



const register =  async (req,res)=>{

    try{
        console.log(req.body);

        const{username , email , phone , password} = req.body;

         const userExist = await User.findOne({email : email}); // firstOne <- from database  // Second <-- the current entered email

         if(userExist){
            return res.status(400).json({message : "Email already exists"});
         }


//prev method to hash the password ,, but now done by middleware in usermodel     

// this is method to hash a password before making a entruy in database , also the curretn user u are making haven't existed before (checked by email upper )

        //  const saltRounds=10;
        //  const hashedpswrd = await bcrypt.hash(password,saltRounds);

        // const userCreated = await User.create({ username , email , phone , password:hashedpswrd });   // hashsed password send in the passwrd form 



// Now first the control goes to   (pre   middleware )  in usermodel.js     then comes here , after succ hashing the password check first   the pre middleware in usermodel
        const CurrentUserCreation = await User.create({ username , email , phone , password });


        res.status(201).json({
            msg : CurrentUserCreation , 
            token : await CurrentUserCreation.generateToken() , 
            userId : CurrentUserCreation._id.toString() 
        
        });
    
    }
    

    catch(error){
        res.status(400).json("Internal Server Error");
    }

}






const login  = async (req,res) => {

    try{

        const{email,password} = req.body;   // the email and password u will enter while login

        const CurrentUserExist = await User.findOne({email});   // Note : while findOne it will give the complete entry of user if it found

        if(!CurrentUserExist){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        // const userPasswordMatch = await bcrypt.compare(password , CurrentUserExist.password);  // the entered password while login   // the exists user (password) from database

        const userPasswordMatch = await CurrentUserExist.comparePassword(password);  // // with the help of function and methods ( check in user modal ) 


        if(userPasswordMatch){
        
            res.status(201).json({

                msg : "Login Successful" , 
                token : await CurrentUserExist.generateToken() ,   // CurrentUserExist  // bcz in this it contain complete current user details // check in generatetoken
                userId : CurrentUserExist._id.toString()   // CurrentUserExist  // it contains complete details of the current user 
                
                });
        }

        else{
            res.status(400).json({message : "Invalid email or password"});
        }

    }

    catch(error){
        next(error);
        // res.status(500).json("Internal Server Error");
    }
}




// to send user data - User Logic 

const user  = async(req,res) => {
    try {
        
    const userData = req.user;   // 1 step : auth router  creating route(autmiddleware, controller of user) // 2nd step :  auth-middleware , verifyis the jwt and   sending in req.user the userdata  , to get here 
    console.log(userData);   // this is the userData which is we getting from token (which curent user login in )

    return res.status(200).json({userData});

 
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


module.exports = {home,register,login , user};
