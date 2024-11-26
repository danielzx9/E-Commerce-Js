const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'No Autorizado token invalido' });
        }
    } else {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();

    }else{
        res.status(403).json({message: 'Acceso denegado: no eres administrador'});
    }
}

module.exports = { protect, admin};