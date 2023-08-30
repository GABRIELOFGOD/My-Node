const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        const verifyToken = jwt.verify(token, process.env.JWT_TOKEN)
        if(!verifyToken){
            return res.redirect('/admin/login')
        }
        next();
    } else{
        res.redirect('/admin/login')
    }

}


module.exports = adminAuth
