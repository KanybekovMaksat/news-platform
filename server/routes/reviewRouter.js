const Router = require('express')
const router = Router()
const commentController = require('../controllers/commentController')

router.post('/', commentController.create)
router.get('/:id', commentController.getAll)
router.delete('/:id', commentController.delete)


module.exports = router