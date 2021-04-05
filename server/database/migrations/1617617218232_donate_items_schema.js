'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonateItemsSchema extends Schema {
  up () {
    this.create('donate_items', (table) => {
      table.increments()
      table.integer('id_donate_bonus').unsigned().references('id').inTable('donate_bonuses').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('name').notNullable()
      table.integer('itemid').notNullable().unsigned()
      table.integer('item_eff1').notNullable().unsigned()
      table.integer('item_effv1').notNullable().unsigned()
      table.integer('item_eff2').notNullable().unsigned()
      table.integer('item_effv2').notNullable().unsigned()
      table.integer('item_eff3').notNullable().unsigned()
      table.integer('item_effv3').notNullable().unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('donate_items')
  }
}

module.exports = DonateItemsSchema
