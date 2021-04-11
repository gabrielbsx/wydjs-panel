exports.home = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home');
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    } 
};