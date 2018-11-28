const KoaRouter = require('koa-router');
const router = new KoaRouter();

const indexController = require('../controllers/index');
router.get('/', indexController.Index);
router.post('/', indexController.SendEmail);

module.exports = router;
