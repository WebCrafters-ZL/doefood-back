/**
 * Roteador de usuários para a aplicação Express.
 * 
 * Define as rotas relacionadas às operações de usuários, incluindo:
 * - Criação de usuário 
 * - Obtenção de usuário por ID
 * - Busca de usuário por e-mail
 * - Busca de usuário por CNPJ
 * - Listagem de usuários
 * - Atualização de usuário
 * - Exclusão de usuário
 * 
 * @module routes/usuarios
 * @requires express
 * @requires ../../controllers/usuarioController.js
 * 
 * @route POST /           Cria um novo usuário
 * @route GET /:id         Obtém um usuário pelo ID
 * @route GET /email/:email Busca um usuário pelo e-mail
 * @route GET /cnpj/:cnpj   Busca um usuário pelo CNPJ
 * @route GET /            Lista todos os usuários
 * @route PUT /:id         Atualiza um usuário pelo ID
 * @route DELETE /:id      Exclui um usuário pelo ID
 */

import express from 'express';
import {
  criarUsuario,
  obterUsuario,
  buscarUsuarioPorEmail,
  buscarUsuarioPorCnpj,
  listarTodosUsuarios,
  atualizarUsuario,
  excluirUsuario,
} from '../../controllers/usuarioController.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/:id', verificarToken, obterUsuario);
router.get('/email/:email', verificarToken, buscarUsuarioPorEmail);
router.get('/cnpj/:cnpj', verificarToken, buscarUsuarioPorCnpj);
router.get('/', verificarToken, listarTodosUsuarios);
router.put('/:id', verificarToken, atualizarUsuario);
router.delete('/:id', verificarToken, excluirUsuario);

export default router;
