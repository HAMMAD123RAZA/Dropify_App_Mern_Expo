import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { User } from './models/UserModel.js';
import dotenv from 'dotenv'; // Import dotenv
import { CreateProduct } from './controllers/CreateProduct.js';
import { filProduct, GetProduct, GetProducts } from './controllers/GetProducts.js';
import { login, signUp } from './controllers/UserController.js';
import { delProduct } from './controllers/DelProduct.js';
import { createOrder } from './controllers/CreateOrder.js';

dotenv.config();

const app = express();
app.use(express.json());

// app.use(cors())

app.use(cors());

app.use(express.urlencoded({ extended: true }));
//db.js

const url =`mongodb+srv://01hammadraza:k84M0ckvAP9VsNp5@cluster0.aykiz.mongodb.net/`;

const connectionParams = {};
mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error(`Error connecting to the database. \n${err}`));


app.post('/create',CreateProduct)
app.get('/get',GetProducts)
app.get('/get/:id',GetProduct)
app.post('/signup',signUp)
app.get('/login',login)
app.get('/filter',filProduct)
app.delete('/delete/:id',delProduct)
app.post('/sendOrder',createOrder)

app.get('/',(req,res)=>{
    res.send('hey there')
})

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');  
    next();
});

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.listen(8080, '0.0.0.0', () => {
    console.log('Server started on port 8080');
});