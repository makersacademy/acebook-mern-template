const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyAPI = {
  target: process.env.MONGO_URL
    ? "https://acebook-brachiosauruses-api.onrender.com/"
    : "http://localhost:8080",
  changeOrigin: true,
  pathRewrite: {
    '/api/': '/'
  },
};
module.exports = function (app) {
  app.use("/api/*", createProxyMiddleware(proxyAPI));
};