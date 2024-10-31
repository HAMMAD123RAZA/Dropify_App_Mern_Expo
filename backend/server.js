// Import statements
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { User } from './models/UserModel.js';
import { CreateProduct } from './controllers/CreateProduct.js';
import { filProduct, GetProduct, GetProducts } from './controllers/GetProducts.js';
import { login, signUp } from './controllers/UserController.js';
import { delProduct } from './controllers/DelProduct.js';
import { createOrder } from './controllers/CreateOrder.js';

// Configure environment variables
dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Database connection function
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://01hammadraza:mymongodbatlas@waterservices.yt1p9.mongodb.net/?retryWrites=true&w=majority&appName=WaterServices', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "Water"
        });
        console.log('DB connected');
    } catch (error) {
        console.log('Error in DB connection:', error);
    }
};

// async function connectDb() {
//     mongoose.set('strictQuery', true);
//     const newDb = 'mongodb+srv://01hammadraza:mymongodbatlas@waterservices.yt1p9.mongodb.net/?retryWrites=true&w=majority&appName=WaterServices'

//     mongoose.connect(newDb);
//     const db = await mongoose.connection;

//     return db.once('open', () => {
//         console.log('\t\t\t\t\t\t Server is now liveeely connected on: ', newDb);
//         return true;
//     });
// }

// Define routes
app.post('/create', CreateProduct);
app.get('/get', GetProducts);
app.get('/get/:id', GetProduct);
app.post('/signup', signUp);
app.get('/login', login);
app.get('/filter', filProduct);
app.delete('/delete/:id', delProduct);
app.post('/sendOrder', createOrder);

// Basic route
app.get('/', (req, res) => {
    res.send('hey there');
});

// Disable caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Start server and connect to DB
app.listen(8080, '0.0.0.0', async () => {
    await connectDb();
    console.log('Server started on port 8080');
});

// IvYUe57Tj5Smdjoc
// mongodb+srv://myusername:IvYUe57Tj5Smdjoc@cluster0.88ykp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0