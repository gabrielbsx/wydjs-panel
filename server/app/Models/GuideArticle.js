'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GuideArticle extends Model {
  guides() {
    return this.hasOne('App/Models/Guide');
  }
}

module.exports = GuideArticle
