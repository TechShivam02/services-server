require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();


const authRoute = require("./router/auth-router.js");
const contactRoute  = require("./router/contact-router.js");

const serviceRoute = require("./router/service-router.js");

const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middleware/error-middleware.js");

const adminRoute = require("./router/admin-router.js");




const corsOptions = {
    
    

    origin : "https://tservices.vercel.app",
    method:"GET,POST,PUT,DELETE,PATCH,HEAD",

    Credential:true,
}


app.use(cors(corsOptions));


// const cors = require('cors');
// app.use(cors({
//   origin: 'https://services-server-v1.onrender.com',
//   method:"GET,POST,PUT,DELETE,PATCH,HEAD",
//   optionsSuccessStatus: 200
// }));


app.use(express.json());  // middleware



app.use("/api/auth" , authRoute);
app.use("/api/form"  , contactRoute);

app.use("/api/data"  , serviceRoute);

app.use("/api/admin" , adminRoute);



app.use(errorMiddleware);  // use the error middleware , import from error middle ware file


const PORT =  process.env.myportnum;




connectDb().then(() => {
    
    app.listen(PORT , ()=>{
        console.log(`server is running at port ${PORT}`);
    });
    
});

