const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : 'http://localhost:8080';

module.exports = apiUrl;
