/**
 *  Controlador para manipulação de usuários.
 *  Este controlador fornece funcionalidades para criar, obter, atualizar e listar usuários,
 *  além de buscar usuários por email ou CNPJ.
 *  @module usuarioController
 *  @requires UsuarioModel
 */
import UsuarioModel from '../models/UsuarioModel.js';
import auth from '../services/authService.js';
/**
 * Instância do modelo de Usuário para manipulação de dados de usuários.
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
    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
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
    return usuario
      ? res.status(200).json(usuario)
      : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

/**
 * Busca usuários por email.
 * @async
 * @function buscarUsuarioPorEmail
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o email do usuário a ser buscado em `query.email`.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário encontrado ou um erro.
 */
export const buscarUsuarioPorEmail = async (req, res) => {
  try {
    const usuario = await usuarioModel.buscarPorEmail(req.query.email);
    return usuario
      ? res.status(200).json(usuario)
      : res.status(404).json({ message: "Usuário não encontrado" });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

/**
 * Busca usuários por email de forma simples, sem utilizar o objeto de requisição.
 *
 * @async
 * @function buscarUsuarioPorEmailSimples
 * @param {string} email - O email do usuário a ser buscado.
 * @returns {Promise<Object|null>} Retorna o usuário encontrado ou null se não encontrado.
 */
export const buscarUsuarioPorEmailSimples = async (email) => {
  if (!email) {
    throw new Error('Email é obrigatório para busca de usuário.');
  }
  const registroUsuario = await auth.getUserByEmail(email);
  const uid = registroUsuario.uid;

  const usuario = await usuarioModel.findById(uid);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  return usuario;
};

/**
 * Busca usuários por CNPJ.
 * @async
 * @function buscarUsuarioPorCnpj
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o CNPJ do usuário a ser buscado em `query.CNPJ`.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com o usuário encontrado ou um erro.
 */
export const buscarUsuarioPorCnpj = async (req, res) => {
  try {
    const usuario = await usuarioModel.buscarPorCNPJ(req.query.CNPJ);
    return usuario
      ? res.status(200).json(usuario)
      : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

/**
 * Lista todos os usuários cadastrados.
 *
 * @async
 * @function listarTodosUsuarios
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com a lista de usuários ou um erro.
 */
export const listarTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
}

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
    const id = req.params.id;
    const dados = req.body;

    if (!id) {
      throw new Error('ID do usuário não pode ser vazio ao atualizar');
    }
    await usuarioModel.update(id, dados);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
};

/**
 * Salva um token de redefinição de senha para um usuário específico.
 *
 * @async
 * @function salvarTokenRedefinicao
 * @param {number|string} userId - ID do usuário para o qual o token será salvo.
 * @param {string} token - Token de redefinição de senha a ser salvo.
 * @returns {Promise<[number, any[]]>} Retorna uma promessa com o resultado da atualização.
 */
export const salvarTokenRedefinicao = async (userId, token) => {
  return usuarioModel.update(userId, { token_redefinicao: token });
};

/**
 * Invalida o token de redefinição de senha de um usuário, removendo-o do registro.
 *
 * @async
 * @function invalidarTokenRedefinicao
 * @param {number|string} userId - ID do usuário cujo token será invalidado.
 * @returns {Promise<[number, any[]]>} Retorna uma promessa com o resultado da atualização.
 */
export const invalidarTokenRedefinicao = async (userId) => {
  return usuarioModel.update(userId, { token_redefinicao: null });
};

/**
 * Valida se o token de redefinição de senha fornecido corresponde ao usuário.
 *
 * @async
 * @function validarTokenRedefinicao
 * @param {number|string} userId - ID do usuário a ser validado.
 * @param {string} token - Token de redefinição de senha a ser validado.
 * @returns {Promise<Object|null>} Retorna o usuário se o token for válido, ou null caso contrário.
 */
export const validarTokenRedefinicao = async (userId, token) => {
  const usuario = await usuarioModel.findById(userId);
  if (usuario && usuario.token_redefinicao === token) {
    return usuario;
  }
  return null;
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

