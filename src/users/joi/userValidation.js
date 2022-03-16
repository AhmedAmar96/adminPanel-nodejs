const Joi = require("joi");

module.exports = {
    signUpSchema: {
        body: Joi.object().required().keys({
            username: Joi.string().required().messages({ "string.empty": "username is required" }),
            email: Joi.string().required().email().messages({ "string.empty": "email is required" }),
            password: Joi.string().required().messages({ "string.empty": "passwoed is required" }),
            cPassword: Joi.any().valid(Joi.ref('password')).required().messages({ "any.only": "Password must match" }),
            phone: Joi.string().required().regex(/^((\+)[0-9]{1,2})?(01)[0-9]{9}$/)
                .messages({
                    "string.empty": "phone is required",
                    "string.pattern.base": "invalid phone number"
                }),
            location: Joi.string().required().messages({ "string.empty": "location is required" })
        })
    },
    signInSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email().messages({ "any.required": "email is required", }),
            password: Joi.string().required().messages({ "string.empty": "passwoed is required" }),
        }),
    },
    updateUserSchema: {
        body: Joi.object().required().keys({
            username: Joi.string().required().messages({ "string.empty": "enter name" }),
            phone: Joi.string().required().regex(/^((\+)[0-9]{1,2})?(01)[0-9]{9}$/)
                .messages({
                    "string.empty": "enter phone",
                    "string.pattern.base": "invalid phone number"
                }),
            location: Joi.string().required().messages({ "string.empty": "enter location" }),
        })
    },
    updatePassSchema: {
        body: Joi.object().required().keys({
            oPassword: Joi.string().required().messages({ "string.empty": "enter old passaword" }),
            nPassword: Joi.string().required().messages({ "string.empty": "enter new passaword" }),
            cPassword: Joi.any().valid(Joi.ref('nPassword')).required().messages({ "any.only": "confirm password must match" }),
        })
    },
    updateImageSchema: {
        body: Joi.object().required().keys({
            userImage: Joi.string()
        })
    }
}