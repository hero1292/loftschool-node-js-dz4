const Koa = require('koa');
const json = require('koa-json');
const flash = require('koa-flash');
const logger = require('koa-logger');
const koaStatic = require('koa-static');
const session = require('koa-session');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const path = require('path');

const app = new Koa();
const config = require('./config');

const Pug = require('koa-pug');
const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app
});

app.use(koaStatic(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(json());
app.use(logger());
app.keys = [config.secret];
app.use(session(config, app));
app.use(flash());
app.use(cors());

const indexRoutes = require('./routes/index');
app.use(indexRoutes.routes());
app.use(indexRoutes.allowedMethods());

const authRoutes = require('./routes/auth');
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

const adminRoutes = require('./routes/admin');
app.use(adminRoutes.routes());
app.use(adminRoutes.allowedMethods());

onerror(app);

app.on('error', (err, ctx) => {
  ctx.render('error', {
    status: ctx.response.status,
    error: ctx.response.message,
  });
});

module.exports = app;
