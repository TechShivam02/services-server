const ServiceModel = require("../modals/service-modal");

const services = async (req, res) => {

  try {
    
    const response = await ServiceModel.find();

    if (!response) {
       res.status(404).json({ message: "No Service Found" });
       return;

    }

    res.status(200).json({ message: response });

  } catch (error) {

    // return res.status(500).json({ message: "Error Occured , in fetching services" });
    console.log(`services : ${error}` );

  }

};



module.exports = services;
