const jwt = require('jsonwebtoken')

const jwtCheck = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization?.split(" ")[1]
        if (!authHeader) return res.json({ message: "no token found" })

        const decode = jwt.verify(authHeader, process.env.SECREAT_KEY)
        req.user = decode
        next()
        
    } catch (error) {
        res.json({ message: "invalid token" })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const payload = jwt.decode(req.headers.authorization.split(" ")[1])
        const role = payload.role
        console.log(role);
        (role == 'admin') ? next() : res.json({ message: "Un-Authorized, login as an admin to proceed" })

    } catch (error) {
        res.json({ message: "Un-Authorized" })
    }
}

module.exports = { jwtCheck, isAdmin }