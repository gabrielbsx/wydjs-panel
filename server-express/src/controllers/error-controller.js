exports.error404 = (req, res, next) => {
    return res.status(404).render('dashboard/pages/404');
};

exports.error500 = (req, res, next) => {
    return res.status(404).render('dashboard/pages/500');
};