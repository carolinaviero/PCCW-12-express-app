const authenticationMiddleware = (req, res, next) => {
    if (req.cookies.login === "true") {
        console.log('User is logged in');
        next();
    } else {
        res.send(403)
    }
}

module.exports = { authenticationMiddleware };
   