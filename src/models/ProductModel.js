const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        collectionName: { type: String, required: true },
        category: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        color: { type: String },
        size: { type: String },
        amount: { type: Number },
        description: { type: String },
        images: { type: Array},
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
