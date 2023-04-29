const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  const token = ctx.header.authorization;

  if (!token) {
    ctx.throw(401, 'Authentication required');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = decodedToken;
  } catch (err) {
    ctx.throw(401, 'Authentication failed');
  }

  await next();
};