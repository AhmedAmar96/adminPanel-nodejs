var jwt = require("jsonwebtoken");

const isOwner = async (model, token) => {
    try {
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await model.findOne({ _id: decoded._id });
        return user;
    } catch (error) {
        return error;
    }

}

module.exports = isOwner;