module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  cookieExpire: process.env.COOKIE_EXPIRE,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL
};