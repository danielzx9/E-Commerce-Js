const express = require ('express');
const dotenv = require('dotenv');
const cors = require ('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

//variables entorno
dotenv.config();

// conectar BD
connectDB();

const app = express();
app.use(express.json());

//middleware
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use(cors());
app.use(bodyParser.json());

const productRoutes = require ('./routes/productRoutes');

app.use('/api/products', productRoutes);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

