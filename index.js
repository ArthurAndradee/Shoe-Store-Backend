import express from "express"
import mongoose from 'mongoose';
import cors from "cors"
import { products } from "./products.js"

const app = express()

mongoose.connect("mongodb://localhost:27017/ShoeStore")

const ProductSchema = new mongoose.Schema({
    id: String,
    imgAlt: String,
    imgLink: String,
    name: String,
    type: String,
    category: [String],
    catchPhrase: String,
    price: Number,
    discountedPrice: Number,
    variations: String,
    productUrl: String,
    productSize: String,
    quantity: Number,
    availableQuantity: Number
}, {collection : 'Products'})

const ProductModel = mongoose.model("Products", ProductSchema)

app.get("/getProducts", async (req, res) => {
    try {
        const data = await ProductModel.find()
        res.json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

app.listen(5000, () => console.log("server is running"))