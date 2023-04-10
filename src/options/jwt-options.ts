export const JwtOptions = {
  global: true,
  secret: process.env.ACCESS_SECRET_KEY,
  signOptions: { expiresIn: process.env.EXPIRES_IN },
};
