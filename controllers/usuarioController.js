import UsuarioModel from '../models/UsuarioModel.js';
/**
 * Instance of the UsuarioModel class used to interact with user-related data and operations.
 * @type {UsuarioModel}
 */
const usuarioModel = new UsuarioModel();

/**
 * Cria um novo usuário no banco de dados.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express contendo os dados do usuário no corpo da requisição.
 * @param {import('express').Response} res - Objeto de resposta do Express utilizado para enviar a resposta ao cliente.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário criado ou um erro.
 */
export const criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuarioModel.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

/**
 * Obtém um usuário pelo ID fornecido nos parâmetros da requisição.
 *
 * @async
 * @function obterUsuario
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o parâmetro 'id' do usuário.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário encontrado ou um erro apropriado.
 */
export const obterUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.findById(req.params.id);
    usuario
      ? res.json(usuario)
      : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * Atualiza um usuário existente com os dados fornecidos.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID do usuário em `params.id` e os dados atualizados em `body`.
 * @param {import('express').Response} res - Objeto de resposta do Express, utilizado para enviar a resposta JSON.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário atualizado ou um erro.
 */
export const atualizarUsuario = async (req, res) => {
  try {
    const usuarioAtualizado = await usuarioModel.update(req.params.id, req.body);
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

/**
 * Exclui um usuário com base no ID fornecido nos parâmetros da requisição.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID do usuário em req.params.id.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta HTTP 204 em caso de sucesso ou 500 em caso de erro.
 */
export const excluirUsuario = async (req, res) => {
  try {
    await usuarioModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * Lista todos os usuários.
 *
 * @async
 * @function listarUsuarios
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com a lista de usuários ou um erro.
 */
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * Busca um usuário pelo email fornecido nos parâmetros da requisição.
 *
 * @async
 * @function buscarPorEmail
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o parâmetro 'email'.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário encontrado ou um erro.
 */
export const buscarPorEmail = async (req, res) => {
  try {
    const usuario = await usuarioModel.findByEmail(req.params.email);
    usuario
      ? res.json(usuario)
      : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * Busca um usuário pelo CNPJ fornecido nos parâmetros da requisição.
 *
 * @async
 * @function buscarPorCnpj
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o CNPJ em req.params.cnpj.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário encontrado ou um erro apropriado.
 */
export const buscarPorCnpj = async (req, res) => {
  try {
    const usuario = await usuarioModel.findByCnpj(req.params.cnpj);
    usuario
      ? res.json(usuario)
      : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
