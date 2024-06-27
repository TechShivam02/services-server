const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



const userschema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },

     email : {
        type:String,
        required:true
    },

     phone : {
        type:Number,
        required:true
    },


    password : {
        type:String,
        required:true
    },

    isAdmin : {
        type:Boolean,
        default:false
    },

})





// secure the password with bcrypt 


// pre: The pre-save hook is called when the save() function is called in a callback.
userschema.pre("save" , async function(){
    
    // console.log("pre method " , this);   // it means before creating a collection the data  comes first here then user will be created in controller file   by .create se  
// in this ,, all details of current user is stored  , ( when u hit send in postman for any user ) . . . . 

    const currentuserdetails = this;

    if(!currentuserdetails.isModified("password")){
        next();  
    }

    
    try{   // else it means , for the first time  password is created(new user created) , so hash the password by bcryptjs
        const saltRounds = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(currentuserdetails.password , saltRounds);

        currentuserdetails.password = hashpassword;

    }

    catch(error){
        console.log(error);
        next(error);
    }
})







userschema.methods.comparePassword = async function(password){

    return bcrypt.compare(password , this.password);  // the entered password while login   // in "this"  current exteereed user details ...

}







            // Instance method , u can generate no of instance methods as u can
userschema.methods.generateToken = async function(){

    
    try {
        
        return jwt.sign(
            
            
        {   // payload (user object in our case)
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        } , 

        // signature/secretkey  ( it can be anything)
        process.env.MY_JWT_SECRET_KEY , 

        
        // options  (where can set an expiration time among other things)
        {
            expiresIn : "30d",    // Optional
        }
        
        )


    } catch (error) {
        console.log(error);
    }

}

// after all it will go to controller



const User = new mongoose.model("User" , userschema);


module.exports = User;
