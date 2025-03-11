const proxy = require('http-proxy-middleware');
console.log('proxy')
module.exports = function(app) {
  app.use(
    // '/CISSA-REST-API',
    "/api",
    proxy({
      target: 'http://192.168.0.64/ismse-rest-api',
      // target: 'http://server-1/ISMSE-REST-API/api',
      changeOrigin: true,
    })
  );
};