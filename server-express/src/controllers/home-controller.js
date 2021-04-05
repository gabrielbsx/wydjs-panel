module.exports = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 'success',
            message: 'Welcome to the Kentaro API',
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.toString(),
        });
    }
};