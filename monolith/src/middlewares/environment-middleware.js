require('dotenv').config();

module.exports = async (req, res, next) => {
    res.locals.recaptcha_site = process.env.RECAPTCHA_SITE;
    return next();
};