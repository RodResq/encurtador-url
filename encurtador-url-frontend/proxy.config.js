
const proxy = [
  {
    context: '/',
    target: '',
    security: false,
    pathRewrite: {'^/server-api' : ''}
  }
];
module.exports = proxy;
