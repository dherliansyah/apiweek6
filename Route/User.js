const userRoute = require('express').Router()
const userController = require('../Controller/User')

userRoute.get('/', userController.getAllUsers)
userRoute.put('/:idUser', userController.puthUser)
userRoute.delete('/:idUser', userController.deletehUser)
userRoute.post('/register', userController.posthUser)
userRoute.get('/login', userController.loginUser)


module.exports = userRoute