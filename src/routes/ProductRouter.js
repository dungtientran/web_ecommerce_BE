const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const Product = require("../models/ProductModel")


router.post('/create', ProductController.createProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.delete('/delete/:id',  ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
router.get('/get-collection/:id', ProductController.getCollection)

router.post('/get-category', async(req, res) => {
    try{
        const res = await Product.find({
            category: req.body.category
        })
        return res.status(200).json(res)
    }catch(e){
        return res.status(500).json({
            msg: e,
            a: req.body.category
        })
    }
})



module.exports = router