const KoaRouter = require('koa-router');
const router = new KoaRouter();

const upload = require('../utils/upload');

const adminController = require('../controllers/admin');
router.get('/admin', adminController.Admin);

router.post('/skills', adminController.AddSkills);
router.post('/upload', upload.single('photo'), adminController.AddProduct);

module.exports = router;
