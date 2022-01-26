
const proxy = [
  {
    context: '/server-api',
    target: 'http://localhost:8080',
    security: false,
    pathRewrite: {'^/server-api' : ''}
  }
];
module.exports = proxy;
