const Koa = require('koa');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const mask = require('koa-json-mask');
// Middlewares
const middlewares = require('./middlewares');
// v1 route imports
const v1Routes = require('./routes/v1');


const init = (logger) => {
  // Set Koa server
  logger.info('Setting Koa API.');
  const app = new Koa();

  // Set header with API response time
  logger.info('Setting Middleware [Respose-TIme]');
  app.use(middlewares.responseTime());

  // HTTP header security
  logger.info('Setting API security policy.');
  app.use(helmet());

  // Error handler
  logger.info('Setting Middleware [Error-Handler]');
  app.use(middlewares.errorHandler());

  // Enable CORS for all users
  logger.info('Setting CORS');
  app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Accept'],
    exposeHeaders: ['rest-api-count', 'rest-api-response-time'],
  }));

  // Set header with total objects returned
  logger.info('Setting Middleware [Count]');
  app.use(middlewares.count());

  // Allow pretty print via pretty=true querystring
  // Pretty printed json will NOT be cached
  app.use(middlewares.prettyJSON({
    pretty: false,
    param: {
      pretty: true,
    },
  }));

  // Allow user to restrict the keys returned
  logger.info('Setting Mask');
  app.use(mask({ name: 'filter' }));

  // v1 routes
  // app.use(v1Routes.loginRoutes.routes());
  // app.use(v1Routes.usersRoutes.routes());
  app.use(v1Routes.health.routes());

  if (!app) {
    logger.error('KOA server not set');
    throw new Error('KOA server not set');
  }

  logger.info('KOA server set');

  app.listen(3001);
  return app;
};

module.exports = {
  init,
};
