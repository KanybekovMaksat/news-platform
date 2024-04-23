const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const commentRouter = require('./reviewRouter')
const newsRouter = require('./newsRouter')



router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/news', newsRouter);
router.use('/comment', commentRouter);


module.exports = router