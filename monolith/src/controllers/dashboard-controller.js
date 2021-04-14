exports.home = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    } 
};

exports.guildmark = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/guildmark');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/changepassword');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/recoverynumericpassword');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.donate = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/donate');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.donaterules = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/donaterules');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

exports.sendguildmark = async (req, res, next) => {
    try {

    } catch (err) {

    }
};