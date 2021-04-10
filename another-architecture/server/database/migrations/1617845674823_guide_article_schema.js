'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuideArticleSchema extends Schema {
  up () {
    this.create('guide_articles', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('guide_articles')
  }
}

module.exports = GuideArticleSchema
