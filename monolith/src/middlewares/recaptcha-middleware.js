require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res, next) => {
    try {
        recaptchaResponse = req.body['g-recaptcha-response'];
        if (recaptchaResponse) {
            var verifyRecaptcha = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaResponse}&remoteip=${req.connection.remoteAddress}`;
            const verified = await axios.post(verifyRecaptcha);

            if (verified.data.success) {
                return next();
            }
        }
        req.flash('notify', {
            type: 'danger',
            message: 'Recaptcha inválido!',
        });
        return res.status(401).redirect(req.originalUrl);
    } catch (err) {
        return res.status(500).render('dashboard/pages/500', { err: err, });
    }
};