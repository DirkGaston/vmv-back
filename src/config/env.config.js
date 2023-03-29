export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || "production",
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    "2ac70179f0d4d50f1c71a4372cc5bbfec7199ef5496d79ee70c40acc264b76d5",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    "53541553522fd693e08699a6ca4d5be758cfb256fcb212d12f62eaa6453c4663",
};
