const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//registrar usuario
router.post('/register', async (req,res) =>{
    const{name,email,password}= req.body;
    console.log(email);
    try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({message:'El usuario ya existe'});

        const user = new User({name,email,password});
        const savedUser = await user.save();
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(201).json({token});
    } catch (error){
        res.status(500).json({message:error.message});
    }
});

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar el usuario por email
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }),
        });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor' });
    }
  });

module.exports = router;