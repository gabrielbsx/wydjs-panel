'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DonatePackage extends Model {

  donateBonus() {
    return this.hasOne('App/Models/DonateBonus');
  }
}

module.exports = DonatePackage;
