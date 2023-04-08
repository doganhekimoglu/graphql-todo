export default {
  port: process.env.PORT || 3001,
  secrets: {
    jwt: process.env.JWT_SECRET,
  },
};
