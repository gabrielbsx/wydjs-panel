'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonateBonusSchema extends Schema {
  up () {
    this.create('donate_bonuses', (table) => {
      table.increments()
      table.integer('percent')
      table.timestamps()
    })
  }

  down () {
    this.drop('donate_bonuses')
  }
}

module.exports = DonateBonusSchema
