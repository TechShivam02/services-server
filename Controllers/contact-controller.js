const Contact = require("../modals/contact-modal");



const contactform = async (req,res) => {

    try {

    const{username , email , message } = req.body;

    await Contact.create({username , email , message});
    
    return res.status(200).json({message : "Message send successfully"});
    

    } catch (error) {

        return res.status(500).json({message : "Message Not Delivered"});
    
    }
}



module.exports = {contactform};  

