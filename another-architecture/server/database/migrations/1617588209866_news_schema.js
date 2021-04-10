'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsSchema extends Schema {
  up () {
    this.create('news', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id')
        .inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('content')
      table.string('description').notNullable()
      table.integer('category').unsigned().references('id')
        .inTable('categories').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('news')
  }
}

module.exports = NewsSchema
