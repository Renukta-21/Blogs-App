const logger =  (req, res, next) => {
    if(req.url!=='favico.ico'){
        console.log(`${req.method} ----- ${req.url}`)
    }
    next()
}

module.exports = {
    logger
}

