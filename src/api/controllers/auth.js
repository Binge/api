const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.register = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, 'Invalid username or password');
  }

  const user = await User.findOne({ username });

  if (user) {
    ctx.throw(400, 'Username already exists');
  }
  const crosskey = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    crosskey,
    username,
    password: hashedPassword
  });

  await newUser.save();

  ctx.status = 201;
  ctx.body = {
    message: 'User registered successfully'
  };
};

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.throw(400, 'Invalid username or password');
  }

  const user = await User.findOne({ username });

  if (!user) {
    ctx.throw(401, 'Authentication failed');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    ctx.throw(401, 'Authentication failed');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  ctx.status = 200;
  ctx.body = {
    message: 'User authenticated successfully',
    token
  };
};

exports.forgotPassword = async (ctx) => {
  const { username } = ctx.request.body;

  if (!username) {
    ctx.throw(400, 'Invalid username');
  }

  const user = await User.findOne({ username });

  if (!user) {
    ctx.throw(400, 'User not found');
  }

  // TODO: Implement password reset email

  ctx.status = 200;
  ctx.body = {
    message: 'Password reset email sent successfully'
  };
};

exports.resetPassword = async (ctx) => {
    const { username, password, resetToken } = ctx.request.body;
    
    if (!username || !password || !resetToken) {
    ctx.throw(400, 'Invalid username, password, or reset token');
    }
    
    const user = await User.findOne({ username });
    
    if (!user) {
    ctx.throw(400, 'User not found');
    }
    
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
    
    if (decodedToken.id !== user._id.toString()) {
    ctx.throw(400, 'Invalid reset token');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    user.password = hashedPassword;
    
    await user.save();
    
    ctx.status = 200;
    ctx.body = {
    message: 'Password reset successfully'
    };
};
        