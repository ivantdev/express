const boom = require("@hapi/boom");

function checkRoles(...roles) {
  return (req, res, next) => {
    const { user } = req;
    if(roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized("You are not authorized"));
    }
  }
}

module.exports = checkRoles;
