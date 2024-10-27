const logger =  (req, res, next) => {
    if(req.url!=='favico.ico' && process.env.NODE_ENV !== 'test'){
        console.log(`${req.method} ----- ${req.url}`)
    }
    next()
}

module.exports = {
    logger
}

