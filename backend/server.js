import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { User } from './models/UserModel.js';
import dotenv from 'dotenv'; // Import dotenv
import { CreateProduct } from './controllers/CreateProduct.js';
import { GetProduct, GetProducts } from './controllers/GetProducts.js';
import { login, signUp } from './controllers/UserController.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
  }));
  app.use(express.urlencoded())

mongoose.connect('mongodb://localhost:27017',{
    dbName:'Water'
}).then(() => {
    console.log('db connected');
}).catch(() => {
    console.log('error connecting db');
});

app.post('/create',CreateProduct)
app.get('/get',GetProducts)
app.get('/get/:id',GetProduct)
app.post('/signup',signUp)
app.get('/login',login)

app.get('/',(req,res)=>{
    res.send('hey there')
})

app.listen(8080, () => {
    console.log('server started ');
});