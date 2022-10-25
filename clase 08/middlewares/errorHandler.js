const errorHandler = (err, _req, res,_next) => {
    res.status(500).json({
        succes: false,
        error: err.message
    })
}

module.exports = errorHandler