const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
const User = require("../../src/users/model/user.model");
const rbac = require("../rbac/rbac")

module.exports = (endPoint) => {
  return async (req, res, next) => {
    console.log(".... is auth");
    if (req.headers.authorization.split(" ")[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "UNAUTHORIZED" });
        } else {
          req.user = user;
          // const found = roles.find((r) => r == user.role);
          const isAllowed = await rbac.can(user.role, endPoint);
          if (isAllowed) {
            next();
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: "UNAUTHORIZED" });
          }
        }
      } catch (err) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "error", err });
      }
    }
  };
};
