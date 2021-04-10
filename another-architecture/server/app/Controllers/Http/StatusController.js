'use strict'

const { validateAll } = use('Validator');
const Statuses = use('App/Models/Status');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with statuses
 */
class StatusController {

  errMessage = {
    'name.required': 'Nome do status obrigatório!',
    'name.max': 'Nome do status deve conter no máximo 255 caracteres!',
  };

  /**
   * Show a list of all statuses.
   * GET statuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const status = Database.select().from('statuses');//.where('user_id', auth.user.id);

      return status;
    } catch (err) {
      return response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Render a form to be used for creating a new status.
   * GET statuses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    try {
      const validation = await validateAll(request.all(), {
        name: 'required|max:255',
      }, this.errMessage);

      if (validation.fails()) {
        return response.status(401).json({
          message: validation.messages(),
        });
      }

      const data = request.only(['name']);

      const statuses = await Statuses.create(data);

      return statuses;

    } catch (err) {
      response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Create/save a new status.
   * POST statuses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

  }

  /**
   * Display a single status.
   * GET statuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing status.
   * GET statuses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update status details.
   * PUT or PATCH statuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a status with id.
   * DELETE statuses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = StatusController
