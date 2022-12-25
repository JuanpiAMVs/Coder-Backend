const errorHandler = (_req, res, err) => {
    res.status(500).json({
        succes: false,
        error: err.message
    })
}

export default errorHandler