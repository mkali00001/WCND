const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // console.log(req)
  const token = req.cookies.auth_token;
  if(!token){
    return res.status(401).json({error:"Access denied!"})
  }

  try{
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode;
    next()
  }
  catch(e){
    return res.status(401).json({error:"Invalide token!"})
  }
};

module.exports = authMiddleware;
