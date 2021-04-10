'use strict'

const { validateAll } = use('validator');
const Ranking = use('App/Models/Ranking');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rankings
 */
class RankingController {

  errMessage = {
    'nick.required': 'Nick obrigatório!',
    'nick.max': 'Nick deve conter no máximo 16 caracteres!',
    'nick.alpha_numeric': 'Nick deve conter apenas caracteres alfa numéricos!',
    'level.required': 'Level obrigatório!',
    'level.integer': 'Level deve conter apenas número inteiros',
    'class.required': 'Classe obrigatória!',
    'class.integer': 'Classe deve conter apenas número inteiros',
    'evolution.required': 'Evolução obrigatório!',
    'evolution.integer': 'Evolução deve conter apenas número inteiros',
    'guild.required': 'Guild obrigatório!',
    'guild.integer': 'Guild deve conter apenas número inteiros',
    'kingdom.required': 'Reino obrigatório!',
    'kingdom.integer': 'Reino deve conter apenas número inteiros',
  };

  /**
   * Show a list of all rankings.
   * GET rankings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const ranking = Database().select('*').from('ranking');
      return ranking;
    } catch (err) {
      return response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Render a form to be used for creating a new ranking.
   * GET rankings/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new ranking.
   * POST rankings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const validation = await validateAll(request.all(), {
        'nick': 'required|max:16|alpha_numeric',
        'level': 'required|integer',
        'class': 'required|integer',
        'evolution': 'required|integer',
        'guild': 'required|integer',
        'kingdom': 'required|integer',
      }, this.errMessage);

      const data = request.only(['nick', 'level', 'class', 'evolution', 'guild', 'kingdom']);

      const ranking = await Ranking.create(data);

      return ranking;
    } catch (err) {
      response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Display a single ranking.
   * GET rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const ranking = await Ranking.query().where('id', params.id).first();

    if (!ranking) {
      return response.status(404).json({
        message: 'Não foi possível encontrar o player',
      });
    }

    return ranking;
  }

  /**
   * Render a form to update an existing ranking.
   * GET rankings/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update ranking details.
   * PUT or PATCH rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a ranking with id.
   * DELETE rankings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Delete all ranking.
   * DELETE rankings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async trunace ({ request, response }) {
    return await Ranking.truncate();
  }
}

module.exports = RankingController
