const express = require ('express');
const dotenv = require('dotenv');
const cors = require ('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

//variables entorno
dotenv.config();

// conectar BD
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

const productRoutes = require ('./routes/productRoutes');

app.use('/api/products', productRoutes);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

