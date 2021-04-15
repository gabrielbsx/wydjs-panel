exports.home = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    } 
};

exports.guildmark = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/guildmark');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/changepassword');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/recoverynumericpassword');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.donate = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/donate');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.donaterules = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/donaterules');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.rankingplayers = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/rankingplayers');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.rankingcities = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/rankingcities');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};