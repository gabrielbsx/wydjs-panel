'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Guide extends Model {
  guideArticle() {
    return this.hasMany('App/Models/GuideArticle');
  }
}

module.exports = Guide
