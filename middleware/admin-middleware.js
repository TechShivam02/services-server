const adminMiddleware = async(req,res,next) => {

    try {
        console.log(req.user);

        const isAdmin = req.user.isAdmin;

        if(!isAdmin){    // (See video YToube : #42  for best expln ) ,, for postman How i done : (at login route token generated (for shivam2024 wala) , for admin-users same token added in headers , also shivam2024 was maked admin )  ,, if u create new user new token generate , i(suppose xyz  so xyz new token will be generated ,, now xyz token if u add in admin-users  , it means u login (frontend ) with xyz cred)  , but admin was shivam2024 , so it will threw error access denieed 
            return res.status(403).json({message:"Access denied . User is not a admin. "});
        }

        // res.status(200).json({msg:req.user});
        next();   // id user is admin , proced to the next middleware


    } catch (error) {

        next(error);
        
    }
}

module.exports = adminMiddleware;
