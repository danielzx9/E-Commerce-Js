const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(async()=>{
    console.log('Conectado a la base de datos');
    const adminExists = await User.findOne({email:'admin@example.com'});
    if(adminExists){
        console.log('El usuario administrador ya existe');
    } else {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Administrador',
            email: 'admin@example.com',
            password: 'admin123',
            isAdmin: true,
        });
        await admin.save();
        console.log('Usuario administrador creado');

    }
    mongoose.connection.close();
})
.catch(err => console.error(err));