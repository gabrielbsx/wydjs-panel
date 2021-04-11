require('dotenv').config();

module.exports = async (req, res, next) => {
    res.locals.recaptcha_site = process.env.RECAPTCHA_SITE;
    res.locals.dump = require('util').inspect;
    return next();
};