const db = require('../../database/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createID = require('../../utils/createID');
const config = require('./config');

exports.Auth = async (ctx) => {
  const loginViewModel = {
    title: 'Login page'
  };
  await ctx.render('pages/login', loginViewModel);
};

exports.Registration = async (ctx) => {
  const registerViewModel = {
    title: 'Registration page'
  };
  await ctx.render('pages/register', registerViewModel);
};

exports.Register = async (ctx) => {
  const userId = createID();
  const hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
  await db.get('users')
    .push({
      id: `_${userId}`,
      email: ctx.request.body.email,
      password: hashedPassword
    })
    .write();

  const token = jwt.sign(
    { id: userId },
    config.secret,
    { expiresIn: config.tokenLife }
  );
  ctx.body = {auth: true, token: token};
  return ctx;
};

exports.Login = async (ctx) => {
  const user = await db.get('users')
    .find({ email: ctx.request.body.email })
    .value();

  if (!user) { ctx.send('User is not found!'); }

  const passwordIsValid = bcrypt.compareSync(ctx.request.body.password, user.password);
  if (!passwordIsValid) { return ctx.send('Incorrect password!'); }

  const token = jwt.sign(
    { id: user.id },
    config.secret,
    { expiresIn: config.tokenLife }
  );

  ctx.body = {auth: true, token: token};
  return ctx;
};
