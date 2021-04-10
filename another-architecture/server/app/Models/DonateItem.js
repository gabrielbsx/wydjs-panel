'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class DonateItem extends Model {

  donateBonus() {
    return this.hasMany('App/Models/DonateBonus');
  }
}

module.exports = DonateItem;
