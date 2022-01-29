
const proxy = [
  {
    context: '/',
    target: 'http://localhost:8081',
    security: false,
    pathRewrite: {'^/server-api' : ''}
  }
];
module.exports = proxy;
