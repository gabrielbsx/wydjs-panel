const logged = async (req, res, next) => {
    try {
        if (req.session.user) {
            return next();
        }
        req.flash('error', {
            message: 'Efetue o login para entrar no painel de controle!',
        });
        return res.redirect('/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

const notLogged = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return next();
        }
        return res.redirect('/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

module.exports = {
    logged,
    notLogged,
};