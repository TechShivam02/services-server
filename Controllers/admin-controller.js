const UserModel = require("../modals/user-modal");
const ContactModel = require("../modals/contact-modal");


const getAllUsers = async(req,res) => {

    try{
        const users = await UserModel.find({},{password:0});  // db.collection.find()  it will give while users data   like u do in mongodb shell 
                            // to except password  , if password : 1 , then it will give only passwrd ,   0 means exculding passwrd

        console.log("Users admin : " , users);
        
        if(!users || users.length === 0){
            return res.status(404).json({message : "No Users Found"});
        }

        res.status(200).json(users);

    }

    catch(error){
        next(error);
    }

}



const getAllContacts = async(req,res) => {

    try{
        const contacts = await ContactModel.find();  // db.collection.find()  it will give while collection data   like u do in mongodb shell 
                          
        console.log("contact admin : " , contacts);
        
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message : "No contacts Found"});
        }
        res.status(200).json(contacts);

    }

    catch(error){
        next(error);
    }

}



const UpdateUserByID = async(req,res) => {
    
    try {
    
        const id = req.params.id;
        const updatethisUserData = req.body;

        const updatedUserData = await UserModel.updateOne({_id:id} , {$set:updatethisUserData});  // to whom  // what to update

        return res.status(200).json(updatedUserData);


    } catch (error) {

        next(error);
    
    }

}






// single user  logic 

const getUserById = async(req,res) => {
    
    try {    
    
        const myid = req.params.id;
        const data = await UserModel.findOne({_id : myid} , {password:0});

        return res.status(200).json(data);

    } 

    catch (error){
        next(error);
    }


}





// user delete logic 

const deleteUserByID = async(req,res) => {
    
    try {    
    
        const myid = req.params.id;
        await UserModel.deleteOne({_id:myid});

        return res.status(200).json({message:"User Deleted Successfully"});

    } 

    catch (error){
        next(error);
    }


}


// Contact delete logic 

const deleteContactByID = async(req,res) => {
    
    try {    
    
        const myid = req.params.id;
        await ContactModel.deleteOne({_id:myid});

        return res.status(200).json({message:"Contact Deleted Successfully"});

    } 

    catch (error){
        next(error);
    }


}




module.exports = {getAllContacts,getAllUsers,deleteUserByID , deleteContactByID , getUserById , UpdateUserByID};