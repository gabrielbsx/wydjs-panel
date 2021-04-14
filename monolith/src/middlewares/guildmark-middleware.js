require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        
    } catch (err) {
        return res.status(500).render('dashboard/pages/500');
    }
};