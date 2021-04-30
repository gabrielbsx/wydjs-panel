exports.home = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/home', {
            layout: 'home',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    } 
};

exports.guildmark = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/guildmark', {
            layout: 'guildmark',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.changepassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/changepassword', {
            layout: 'changepassword',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.recoverynumericpassword = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/recoverynumericpassword', {
            layout: 'recoverypassword',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.donate = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/donate', {
            layout: 'donate',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.donaterules = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/donaterules', {
            layout: 'donaterules',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.rankingplayers = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/rankingplayers', {
            layout: 'rankingplayers',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.rankingcities = async (req, res, next) => {
    try {
        return res.status(200).render('dashboard/pages/user/rankingcities', {
            layout: 'rankingcities',
        });
    } catch (err) {
        return res.status(500).render('dashboard/pages/errors/500');
    }
};

exports.donatepackages = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'undefined') {
            const data = await donatepackagesModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('dashboard/pages/home', {
                layout: 'donatepackages',
                data: data,
            });
        }
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donatepackagesModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        return res.render('dashboard/pages/home', {
            layout: 'donatepackages',
            data: data,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/donate-packages');
    }
};

exports.donateitems = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'undefined') {
            const data = await donateitemsModel.findOne({
                where: {
                    id: id,
                },
            });
            return res.render('dashboard/pages/home', {
                layout: 'donateitems',
                data: data,
            });
        }
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const data = await donateitemsModel.findAndCountAll({
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        const packages = await donatepackagesModel.findAll();
        return res.render('dashboard/pages/home', {
            layout: 'donateitems',
            data: data,
            packages: packages,
        });
    } catch (err) {
        req.flash('error', {
            message: err.details || 'Erro interno!',
        });
        return res.redirect('/donate-items');
    }
};

exports.changedonatepackage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const packages = await donatepackagesModel.findOne({ where: { id: id, } });
        if (packages) {
            return res.render('dashboard/pages/home', {
                layout: 'updatedonatepackages',
                data: packages,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar o pacote de doação!',
            });
        }
        return res.redirect('/donate-packages');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar o pacote de doação!',
        });
        return res.redirect('/donate-packages');
    }
};

exports.listdonateitems = async (req, res, next) => {
    try {
        const { id } = req.params;
        var { page } = req.query;
        page = parseInt(page) || 1;
        if (typeof page === 'undefined' || page < 1) {
            page = 1;
        }
        const items = await donateitemsModel.findAndCountAll({
            where: {
                id_package: id,
            },
            limit: 5,
            offset: (page - 1) * 5 || 0,
        });
        if (items) {
            return res.render('dashboard/pages/home', {
                layout: 'listdonateitems',
                data: items,
                id_package: id,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar o pacote de doação!',
            });
        }
        return res.redirect('/donate-packages');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar o pacote de doação!',
        });
        return res.redirect('/donate-packages');
    }
};

exports.changedonateitem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await donateitemsModel.findOne({
            where: {
                id: id,
            }
        });
        const packages = await donatepackagesModel.findAll();
        if (item) {
            return res.render('dashboard/pages/home', {
                layout: 'updatedonateitems',
                data: item,
                packages: packages,
            });
        } else {
            req.flash('error', {
                message: 'Não foi possível encontrar a bonificação!',
            });
        }
        return res.redirect('/donate-items');
    } catch (err) {
        req.flash('error', {
            message: 'Não foi possível encontrar a bonificação!',
        });
        return res.redirect('/donate-items');
    }
};