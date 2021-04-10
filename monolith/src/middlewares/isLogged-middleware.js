const logged = async (req, res, next) => {
    try {
        if (req.session.user) {
            return next();
        }
        res.flash('notify', {
            type: 'danger',
            message: 'Você não está logado!',
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
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};

module.exports = [logged, notLogged];