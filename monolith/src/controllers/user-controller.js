exports.index = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/index', {
            layout: 'login',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.login = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home/login', {
            layout: 'login',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.register = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home/register', {
            layout: 'register',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home/recovery', {
            layout: 'recovery',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
}

exports.logout = async (req, res, next) => {
    try {
        delete req.session.user;
        req.flash('success', {
            message: 'Deslogado com sucesso!',
        });
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};