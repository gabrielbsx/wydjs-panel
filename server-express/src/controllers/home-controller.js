module.exports = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        return res.status(200).render('dashboard/pages/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/internalError');
    }
};