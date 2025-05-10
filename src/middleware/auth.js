const jwt = require('jsonwebtoken');
const {BUYER, SELLER} = require('../../constants');

const authenticate = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);
    if(!token){
        res.status(401).send("Unauthenticated User");
    }

    const user = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    req.user = user;
    next();
}

const isSeller = (req, res, next)=>{

    if(req.user.role === SELLER){
        console.log(SELLER);
        next();
    }
    else{
        res.status(403).send({message: "Forbidden!!"});
    }
}
const isBuyer = (req, res, next)=>{
    if(req.user.role === BUYER){
        next();
    }
    else{
        res.send(403).send({message: "Forbidden!!"});
    }
}

module.exports = {
    authenticate,
    isSeller,
    isBuyer
}