const KoaRouter = require('koa-router');
const router = new KoaRouter();

const authController = require('../controllers/auth');
router.get('/auth/login', authController.Auth);
router.post('/auth/login', authController.Login);
router.get('/auth/register', authController.Registration);
router.post('/auth/register', authController.Register);

module.exports = router;
