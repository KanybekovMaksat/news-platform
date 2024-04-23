const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.put("/update/:id", userController.update)
router.post("/forgot", userController.reset)
router.get("/reset/:id/:token", userController.confirm)
router.post("/reset/:id/:token", userController.confirmPass)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/:id', userController.getUserById);



module.exports = router