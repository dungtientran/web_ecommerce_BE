const ProductService = require('../services/ProductService')
// const ProductService = require('../services/ProductService')
const Product = require("../models/ProductModel")


const createProduct = async (req, res) => {
    try {
        const { name, collectionName, price } = req.body

        if (!name || !collectionName || !price) {
            return res.status(200).json({
                err: 1,
                msg: 'Thiếu thông tin'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                err: 1,
                msg: 'K có sản phẩm'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                err: 1,
                msg: 'K có sản phẩm'
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort, search, id, category} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 20, Number(page) || 0, sort, search, id, category)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            arr: e
        })
    }
}

const getCollection = async (req, res) => {
    const collection = req.params.id
    let { min, max, search } = req.query
    try {
        const response = await ProductService.getCollection(collection, Number(min) || 0, Number(max) || 13250000, search)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getCollection,
}
