// Login Endpoints

const Router = require('@koa/router');
const controller = require('../../controllers/v1');

const loginRoutes = new Router({ prefix: 'api/v1' });

// Login and validate user
loginRoutes.post('/login', controller.login.login);

module.exports = loginRoutes;


// const login = async (req, res) => {
//   try {
//     const data = await AuthController.login(req.body);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
