'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RankingCitySchema extends Schema {
  up () {
    this.create('ranking_cities', (table) => {
      table.increments()
      table.string('name')
      table.integer('guild')
      table.integer('kingdom')
      table.timestamps()
    })
  }

  down () {
    this.drop('ranking_cities')
  }
}

module.exports = RankingCitySchema
