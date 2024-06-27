// this schema is from ZOD schema....

//  await schema.parseAsync is the line where u use ZOD to validate the request body data against the defined schema


const validate = (schema) => async (req, res, next) => {
  try {
    
    const parseBody = await schema.parseAsync(req.body); //  checks for the validation // in req.body is ur current entering user ( new user registeration)
    req.body = parseBody;
    next();

  } 
  
  catch (err) {
    // res.status(400).json({ msg: err.errors[0].message });   // before creating an error middleware file

    // res.status(400).json({ msg: err });   // before creating an error middleware file

    
    // After using error middleware (written in error middleware file) // it can be written as here below

    const status = 422;
    const message = "Fill the input Properly";
    const extraDetails= err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails
    }

    console.log(error);

    next(error);

  }

};

module.exports = validate;
