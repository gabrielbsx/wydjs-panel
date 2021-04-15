exports.login = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.register = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/register');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/recovery');
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
        return res.redirect('/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};