const fs = require('fs');
const userModel = require('../models/users-model');

module.exports = class Game {
    game = 'D:/_SERVIDOR/';
    binaryAccount = this.game + 'base.bin';
    dbsrv = this.game + 'DBSrv/run/';
    tmsrv = this.game + 'TMSrv/run/';
    common = this.game + 'Common/';
    account = 'account/';
    importDonate = 'importDonate/';
    importPass = 'importPass/';
    importItem = 'importItem/';
    log = 'logs/';

    constructor () {
        this.path = {
            game: game,
            dbsrv: dbsrv,
            tmsrv: tmsrv,
            common: common,
            account: dbsrv + account,
            importDonate: common + importDonate,
            importPass: common + importPass,
            importItem: common + importItem,
            logCreateAccount: common + log + account,
            logImportPass: common + log + importPass,
            logImportDonate: common + log + importDonate,
            logImportItem: common + log + importItem,
        };
    }

    async getInitial(username) {
        try {
            if (username[0].match(/^([a-zA-Z])$/)) {
                return username[0];
            }
            return 'etc';
        } catch (err) {
            return false;
        }
    }

    async userExists(username) {
        try {
            initial = await this.getInitial(username);
            path = `${this.account + initial}/${username}`;
            const user = await userModel.findOne({
                where: {
                    username: username,
                }
            });
            if (fs.existsSync(path) && user) {
                return user;
            }
            return false;
        } catch (err) {
            return false;
        }
    }
    
    async createAccount(username, password) {
        try {
            initial = await this.getInitial(username);
            path = `${this.account + initial}/${username}`;

            var account = fs.readFileSync(this.binaryAccount);
            username = Buffer.from(username, undefined);
            password = Buffer.from(password, undefined);

            for (i = 0; i < username.length; i++) {
                account[i] = username[i];
            }

            for (i = 0; i < password.length; i++) {
                account[(i + 16)] = password[i];
            }

            if (fs.writeFileSync(path, account)) {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }
}