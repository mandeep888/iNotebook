const jwt = require('jsonwebtoken');
const JWT_SECRET= "I AM PRO";

let fetchUser = (req,res,next)=>{
    //GET THE USER FROM THE JWT TOKN AND ADD ID TO THE REQ OBJECT
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "please authentiate using a valid token"});
    }
    try{
    const data  = jwt.verify(token , JWT_SECRET);
    req.user = data.user;
    next();
}
catch(error){
    res.status(401).send({error: "please authentiate using a valid token"});
}
}
module.exports = fetchUser;