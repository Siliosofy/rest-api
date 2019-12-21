const app = require('../app');
const supertest = require('supertest');

const setup = async () => {
  const service = app();
  let api = null;

  try {
    await service.setupLogger();
    await service.validateEnvironment();
    await service.setupMongoDB();
    await service.setupExpress();
    api = await service.createService();
    await service.startService();
    return api;
  }
  catch (error) {
    process.exit(1);
  }
};

describe('API', () => {
  let api = null;

  beforeAll(async () => {
    api = supertest(await setup());
  });

  it ('GET /health', async (done) => {
    const response = await api.get('/health');
    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({ "message": "no token provided" });
    done();
  });

  it ('GET unknown route /testing', async (done) => {
    const response = await api.get('/testing');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ "info": "Resource not found." });
    done();
  });
});
