const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');



router.delete('/delete-user/:id', userController.deleteUser)
router.get('/getAll',  userController.getAllUser)
router.post('/login',  userController.loginUser)
router.post('/create',  userController.createUser)



module.exports = router