const { ADMIN_ROLE, USER_ROLE, QA_ROLE } = require('../../COMP1640-BE-1/constants/role');

const adminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === ADMIN_ROLE) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};
module.exports = { adminRole };
