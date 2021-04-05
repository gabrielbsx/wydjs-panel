'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('username', 12).notNullable().unique()
      table.string('email', 254).notNullable()
      table.string('password', 60).notNullable()
      table.integer('access').unsigned().references('id')
        .inTable('accesses').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('status').unsigned().references('id')
        .inTable('statuses').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
