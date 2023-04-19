


const notAuth = (req,res,next) => {
    if (!req.session.userId) {
        next()
    } else {
        res.redirect('/')
    }
}


const isAuth = (req,res,next) => {
    if (req.session.userId) {
        next()
    } else {
        res.redirect('/')
    }
}



module.exports = {notAuth,isAuth}