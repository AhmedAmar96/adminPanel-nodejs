const { StatusCodes } = require("http-status-codes");

module.exports = (schema) => {
    return (req, res, next) => {
        const validationArr = [];
        const validationResult = schema.body.validate(req.body);
        if (validationResult.error) {
            
            validationArr.push(validationResult.error.details[0].message);
        }
        if (validationArr.length) {
            console.log(validationArr);
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "error", data: validationArr.join() })
        } else {
            next();
        }
    }
}