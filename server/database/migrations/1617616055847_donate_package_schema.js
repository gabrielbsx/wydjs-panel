'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonatePackageSchema extends Schema {
  up () {
    this.create('donate_packages', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.float('value').unsigned().notNullable()
      table.integer('bonus_id').unsigned().references('id')
        .inTable('donate_bonuses').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('donate_packages')
  }
}

module.exports = DonatePackageSchema
