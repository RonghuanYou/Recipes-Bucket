const jwt = require("jsonwebtoken");

// PROTECTION
// console.log(process.env.SECRET_KEY)
module.exports.authenticate = (req, res, next) => {
    console.log("COOKIE: ", req.cookies)
    jwt.verify(req.cookies.usertoken, process.env.SERCRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}