const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, category, collectionName, price, images, color, size, description, amount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct) {
                resolve({
                    err: 1,
                    msg: 'Đã tồn tại tên sản phẩm'
                })
            }
            const newProduct = await Product.create({
                collectionName,
                category: category || 'Đồ trang sức',
                name,
                price,
                images,
                color,
                size,
                description,
                amount
            })
            if (newProduct) {
                resolve({
                    err: 0,
                    msg: 'Đã thêm 1 sản phẩm',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    err: 1,
                    msg: 'Không có sản phẩm'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                err: 0,
                msg: 'Xóa thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    err: 1,
                    msg: 'Không có sản phẩm'
                })
            }

            resolve({
                err: 0,
                msg: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, search, id, category) => {
    return new Promise(async (resolve, reject) => {
        try {
            const total = await Product.count()
            if(id && id !== 'all') {
                const allProductCollection = await Product.find({ collectionName: id }).limit(limit).skip(limit * page)
                resolve({
                    err: 0,
                    msg: 'Success',
                    data: allProductCollection,
                    total,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(total / limit)
                })
            }
            if (search) {
                const allProductSearch = await Product.find({ name: { '$regex': search, '$options': 'i' } }).limit(limit).skip(limit * page)
                resolve({
                    err: 0,
                    msg: 'Success',
                    data: allProductSearch,
                    total,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(total / limit)
                })
            }
            if (sort) {
                
                const allProductSort = await Product.find().limit(limit).skip(limit * page).sort({price: sort})
                resolve({
                    err: 0,
                    msg: 'Success',
                    data: allProductSort,
                    total,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(total / limit)
                })
            }
            if (category) {
                const allProductCategory = await Product.find({category: { '$regex': category}}).limit(limit).skip(limit * page).sort()
                resolve({
                    err: 0,
                    msg: 'Success',
                    data: allProductCategory,
                    total,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(total / limit)
                })
            }
        
            const allProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                err: 0,
                msg: 'Success',
                data: allProduct,
                total,
                pageCurrent: page + 1,
                totalPage: Math.ceil(total / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCollection = (collection, min, max, search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let collectionProduct = await Product.find({
                collectionName: collection
            })
            if (min || max) {
                let collectionProductssss = collectionProduct.filter(item => {
                    if (min <= item.price && item.price <= max) {
                        return item
                    }
                })
                collectionProduct = collectionProductssss
            }
            if (search) {
                let collectionProductSearch = collectionProduct.filter(item => {
                    if (search.toLowerCase().includes(item.name.toLowerCase())) {
                        return item
                    }
                })
                collectionProduct = collectionProductSearch
            }
            resolve({
                err: 0,
                data: collectionProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getCollection,
}