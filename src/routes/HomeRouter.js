const express = require("express");
const router = express.Router()

const HomeController = require('../controllers/HomeController')


router.get('/gethome', HomeController.getHome)
router.post('/createhome', HomeController.createHome)




module.exports = router