const jwt = require('jsonwebtoken');

module.exports = (EventData) => {
  return jwt.sign({ EventData }, process.env.VIRTUAL_EVENT_JWT_SECRETKEY, { expiresIn: '4h' });
};
