//what this files does?
//this file is used to validate the user input for sign up and login against a schema
//it uses joi to validate the user input
//if the user input is valid then it will return  error message
//else it will call the next middleware

const Joi = require("joi");

const SignUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {

        console.log(error);
        return res
            .status(400)
            .json({ message: "Incorrect Credentials", error });
    }

    next();
};

const LogInValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json({ message: "Incorrect Credentials", error });
    }

    next();
};

module.exports = { SignUpValidation, LogInValidation };
