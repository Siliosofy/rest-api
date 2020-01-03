const os = require('os');

const all = async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    upTime: process.uptime(),
    osFreeMem: os.freemem(),
    serviceMemoryUsage: process.memoryUsage(),
  };
};

module.exports = {
  all,
};
