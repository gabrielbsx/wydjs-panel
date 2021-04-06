'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DonateBonus extends Model {

  donatePackage() {
    return this.hasOne('App/Models/DonatePackage');
  }

  donateItems() {
    return this.hasMany('App/Models/DonateItems');
  }
}

module.exports = DonateBonus;
