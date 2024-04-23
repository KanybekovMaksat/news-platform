const Router = require('express')
const router = Router()
const newsController = require('../controllers/newsController')

router.post('/', newsController.create)
router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)
router.delete('/:id', newsController.delete)
router.get("/user/:userId", newsController.getNewsByAuthor)
module.exports = router