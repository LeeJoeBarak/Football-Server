var jwt = require('jsonwebtoken');


const loginRequiredMiddleware = (req, res, next) => {
    // if (req.headers["Authorizartion"]) {
    //     // Bearer awjsdfjdsfjsdf
    //     var token = req.headers["Authorizartion"].split(' ')[1]
    //     try {
    //         var decoded = jwt.verify(token, 'shhhhh');
    //         req.username = decoded.username
    //         next()
    //     }
    //     catch (err) {
    //         res.status(401)
    //     }

    // }
    // else {
    //     res.status(401)
    // }
    
    if(req.session.user_id) {
        next()
    }
    else {
        res.status(401)
    }

}

module.exports = {
    loginRequiredMiddleware: loginRequiredMiddleware
}