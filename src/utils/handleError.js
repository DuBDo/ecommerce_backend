const handleError = (err, req, res, next)=>{
    console.log('This is error', err);
    res.status(err.status).send(err);
}

module.exports = handleError;