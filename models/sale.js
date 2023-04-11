const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    sale_date: {
        type: Date,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        tags: [{
            type: String
        }],
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    storeLocation: {
        type: String,
        required: true
    },
    customer: {
        gender: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        satisfaction: {
            type: Number,
            required: true
        }
    },
    couponUsed: {
        type: Boolean,
        required: true
    },
    purchaseMethod: {
        type: String,
        required: true
    }
})

module.exports = Sale = mongoose.model('sales', saleSchema)