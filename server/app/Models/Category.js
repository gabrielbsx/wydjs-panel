'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {

  news () {
    return this.hasMany('App/Models/News');
  }
}

module.exports = Category;
