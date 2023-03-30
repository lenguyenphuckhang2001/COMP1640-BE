const Role = require('../constants/role');

const adminRole = (req, res, next) => {
  const { role } = req.user;
  if (role === Role.ADMIN_ROLE) {
    next();
  } else {
    res.status(403).json({ message: 'You cant use this function' });
  }
};

const userRole = (req, res, next) => {
  const { role } = req.user;
  if (role === Role.USER_ROLE) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

const qaRole = (req, res, next) => {
  const { role } = req.user;
  if (role === Role.QA_ROLE) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

const qaCoordinatorRole = (req, res, next) => {
  const { role } = req.user;
  if (role === Role.QA_COORDINATOR_ROLE) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

module.exports = { adminRole, userRole, qaRole, qaCoordinatorRole };
