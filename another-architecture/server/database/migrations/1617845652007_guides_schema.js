'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GuidesSchema extends Schema {
  up () {
    this.create('guides', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('guides')
  }
}

module.exports = GuidesSchema
