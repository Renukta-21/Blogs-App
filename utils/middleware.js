const logger =  (req, res, next) => {
    if(req.url!=='favico.ico' && process.env.NODE_ENV !== 'test'){
        console.log(`${req.method} ----- ${req.url}`)
    }
    next()
}

const errorHandler = (err, req,res,next) =>{
    /* console.log(err) */
    if(err.name === 'ValidationError'){
        return res.status(400).json({ error: err.message })
    }else if (err.code === 11000) {
        return res.status(409).json({ error: 'Username already taken' });
      }
}
module.exports = {
    logger, errorHandler
}

