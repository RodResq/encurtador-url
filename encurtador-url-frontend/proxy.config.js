
const proxy = [
  {
    context: '/',
    target: 'http://localhost:8081/',
    security: false,
    pathRewrite: {'^/' : ''}
  }
];
module.exports = proxy;
