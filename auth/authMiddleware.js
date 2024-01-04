const dotenv = require("dotenv"); 
const jwt = require("jsonwebtoken");

dotenv.config();

const auth = (req,res,next)=>{

    console.log(req.cookies);
    const {token} = req.cookies;

    if(!token){
        res.status(403).send("Please login first");
    }

    // const decode = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decode);

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        req.User = decode
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid Token");
    }

    return next();
}

module.exports = auth;