const { SUPER, ADMIN, USER } = require("../../enum/roles");
const superAdminPolicy = require("./superAdminPolicy");
const adminPolicy = require("./adminPolicy");
const userPolicy = require("./userPolicy");

const opts = {
    [SUPER]: superAdminPolicy,
    [ADMIN]: adminPolicy,
    [USER]: {
        can: userPolicy
    },
};

module.exports = opts;