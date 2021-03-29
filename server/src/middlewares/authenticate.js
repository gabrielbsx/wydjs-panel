const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['x-access-spirit-token'];
        if (!token) return res.status(401).json({
            status: 'error',
            message: 'Failed to authenticate!',
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Error!');
    }
};