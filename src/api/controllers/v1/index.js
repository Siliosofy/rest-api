const AuthController = require('./authenticate');
const HealthController = require('./health');
const UserController = require('./users');

module.exports = {
  users: UserController,
  health: HealthController,
  login: AuthController,
};
