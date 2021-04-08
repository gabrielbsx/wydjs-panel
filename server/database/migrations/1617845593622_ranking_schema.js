'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RankingSchema extends Schema {
  up () {
    this.create('rankings', (table) => {
      table.increments()
      table.string('nick')
      table.integer('level')
      table.integer('class')
      table.integer('evolution')
      table.integer('guild')
      table.integer('kingdom')
      table.timestamps()
    })
  }

  down () {
    this.drop('rankings')
  }
}

module.exports = RankingSchema
