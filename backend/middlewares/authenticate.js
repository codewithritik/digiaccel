require("dotenv").config();
const jwt = require("jsonwebtoken")
// console.log(jwt)

const verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            // console.log("dfdf",err)

            if(err) return reject(err)
    
            return resolve(decoded)
        });
    })
    
}

const authenticate = async (req, res, next) => {
    // console.log(req.cookies.auth_token: )
    
    if (!req.headers.authorization)
        return res.status(400).send({ msg: "Authorization token not found or incorrect" })

    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({ msg: "Authorization token not found or incorrect" })

    const token = req.headers.authorization.trim().split(" ")[1]
    
    // if (!req.headers.cookie)
    // return res.status(400).send({msg : "Please login again"})

 
    // const token = req.headers.cookie.trim().split("=")[1]

    // console.log(token)
    
    // console.log(req.headers.authorization)


    let decoded;
    try{
        decoded = await verifyToken(token)
        // console.log("in try", decoded)
    }
    catch(err){
        // console.log(err)
        return res.status(400).send({
            msg : "Please login again",
            data: []
        })
 
    }

    // console.log(decoded.user._id)

    req.userID = decoded.user._id;

    return next();

}

module.exports = authenticate;