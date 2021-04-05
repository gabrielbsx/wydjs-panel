'use strict'

const { validateAll } = use('Validator');
const News = use('App/Models/News');
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with news
 */
class NewsController {

  errMessage = {
    'title.required': 'Título obrigatório!',
    'title.max': 'Título deve conter no máximo 255 caracteres!',
    'slug.required': 'Slug obrigatório!',
    'slug.unique': 'Slug existente!',
    'slug.max': 'Slug deve conter no máximo 255 caracteres!',
    'slug.regex': 'Slug inválido!',
    'description.required': 'Descrição obrigatório!',
    'description.max': 'Descrição deve conter no máximo 255 caracteres!',
    'category.required': 'Categoria obrigatória!',
    'category.min': 'Categoria inválida!',
    'category.max': 'Categoria inválida!',
  };

  /**
   * Show a list of all news.
   * GET news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const news = Database.select('title', 'description', 'slug', 'category').from('news');//.where('user_id', auth.user.id);

    return news;
  }

  /**
   * Render a form to be used for creating a new news.
   * GET news/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new news.
   * POST news
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const { id } = auth.user;

      const validation = await validateAll(request.all(), {
        title: 'required|max:255',
        description: 'required|max:255',
        category: 'required|min:0|max:5',
        slug: 'required|max:255|unique:news|regex:^[a-z][-a-z0-9]*$',
      }, this.errMessage);

      if (validation.fails()) {
        return response.status(401).json({
          message: validation.messages(),
        });
      }

      const data = request.only(['title', 'description', 'content', 'slug', 'category']);

      const news = await News.create({ ...data, user_id: id });

      return news;
    } catch (err) {
      response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Display a single news.
   * GET news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const news = await News.query().where('id', params.id).first();

    if (!news) {
      return response.status(404).json({
        message: 'Nenhuma notícia encontrada!',
      });
    }

    return news;
  }

  /**
   * Render a form to update an existing news.
   * GET news/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update news details.
   * PUT or PATCH news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { title, description, content, category, slug } = request.all();

      const news = News.query().where('id', params.id).first();

      if (!news) {
        return response.status(404).json({
            message: 'Nenhuma notícia encontrada!',
        });
      }

      news.title = title;
      news.slug = slug;
      news.description = description;
      news.content = content;
      news.category = category;
      news.id = params.id;

      await news.save();

      return news;
    } catch (err) {
      return response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }

  /**
   * Delete a news with id.
   * DELETE news/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const news = await News.query().where('id', params.id).first()
      if(!news) {
          return response.status(404).json({
            message: 'Nenhuma notícia necontrada!',
          });
      }
      await news.delete();
      return response.status(200).json({
        message: 'Notícia deletada com sucesso!',
      });
    } catch (err) {
      return response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }
}

module.exports = NewsController
