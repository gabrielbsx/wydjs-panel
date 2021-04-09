'use strict'

const User = use('App/Models/User');
const { validateAll } = use('Validator');

class UserController {

  errMessage = {
    'name.required': 'Nome obrigatório!',
    'name.min': 'Nome deve conter no mínimo 4 caracteres!',
    'name.max': 'Nome deve conter no máximo 80 caracteres!',
    'username.required': 'Usuário obrigatório!',
    'username.unique': 'Usuário existente!',
    'username.min': 'Usuário deve conter no mínimo 4 caracteres!',
    'username.max': 'Usuário deve conter no máximo 12 caracteres!',
    'username.alpha_numeric': 'Usuário deve conter apenas caracteres alfa numérico!',
    'email.required': 'Email obrigatório!',
    'email.email': 'Email inválido!',
    'password.required': 'Senha obrigatória!',
    'password.min': 'Senha deve conter no mínimo 4 caracteres alfa numérico!',
    'password.max': 'Senha deve conter no máximo 12 caraacteres alfa numérico!',
    'username.alpha_numeric': 'Senha deve conter apenas caracteres alfa numérico!',
  };

  async create({ request, response }) {
    try {

      const validation = await validateAll(request.all(), {
        name: 'required|min:4|max:80',
        username: 'required|min:4|max:12|alpha_numeric|unique:users',
        email: 'required|email',
        password: 'required|min:4|max:12|alpha_numeric',
      }, this.errMessage);

      if (validation.fails()) {
        return response.status(401).json({
          message: validation.messages(),
        });
      }

      const data = request.only(['name', 'username', 'email', 'password']);

      const user = await User.create(data);

      if (user) {
        //escrever conta
      }

      return user;

    } catch (err) {
      response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }

  }

  async login({ request, response, auth }) {
    try {
      const { username, password } = request.all();

      const validation = await validateAll(request.all(), {
        username: 'required|min:4|max:12|alpha_numeric',
        password: 'required|min:4|max:12|alpha_numeric'
      }, this.errMessage);

      if (validation.fails()) {
        return response.status(401).json({
          message: validation.messages(),
        });
      }

      const validateToken = await auth.attempt(username, password);

      return validateToken;
    } catch (err) {
      response.status(500).json({
        error: `Error: ${err.message}`,
      });
    }
  }
}

module.exports = UserController;
