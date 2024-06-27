require("dotenv").config();

const mongoose = require("mongoose");


// const URI = "mongodb://127.0.0.1:27017/mernThp"
// mongoose.connect(URI);



const URI = process.env.MONGODB_URI;

const connectDb =  async()=>{

    try{

        await mongoose.connect(URI);
        console.log("Connection succ to database");
    }

    catch(err){
        console.log("Database connection failed");
        process.exit(0);
    }
}


module.exports =  connectDb;
