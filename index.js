import express from "express"
import { config } from 'dotenv'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'

config()

const app = express()
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

const productschema = new mongoose.Schema({
    availableQuantity: Number,
    catchPhrase: String,
    category: [String],
    discountedPrice: Number,
    id: String,
    imgAlt: String,
    imgLink: String,
    name: String,
    price: Number,
    productUrl: String,
    productsize: String,
    quantity: Number,
    type: String,
    variations: String,
}, {collection : 'products'})

const ProductModel = mongoose.model("products", productschema)

app.get("/getProducts", async (req, res) => {
    try {
        const data = await ProductModel.find()
        res.json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

const orderSchema = new mongoose.Schema({
    payment: Object,
    products: Object,
    shippingAdress: Object,
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.listen(5000, () => console.log("Server is running"))