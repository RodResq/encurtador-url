
const proxy = [
  {
    context: '/',
    target: 'http://localhost:8080',
    security: false,
    pathRewrite: {'^/server-api' : ''}
  }
];
module.exports = proxy;
