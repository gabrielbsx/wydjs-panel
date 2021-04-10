exports.login = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/login');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
};

exports.register = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/register');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.recovery = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(200).render('dashboard/pages/recovery');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.create = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/register');
        }
        return res.redirect('/');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.read = async (req, res, next) => {
    try {
        if (!req.session.user) {
            if (true) {
                res.locals.user = {
                    username: 'kentaro',
                };
                return res.redirect('/');
            }
        }
        return res.redirect('/login');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
}

exports.get = async (req, res, next) => {
    try {
        if (!req.session.user) {
            if (true) {
                return res.redirect('/login');
            }
        }
        return res.redirect('/recovery');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
};