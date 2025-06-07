/**
 * Roteador de usuários para a aplicação Express.
 * 
 * Define as rotas relacionadas às operações de usuários, incluindo:
 * - Criação de usuário
 * - Listagem de usuários
 * - Obtenção de usuário por ID
 * - Atualização de usuário
 * - Exclusão de usuário
 * - Busca de usuário por e-mail
 * - Busca de usuário por CNPJ
 * 
 * @module routes/usuarios
 * @requires express
 * @requires ../../controllers/usuarioController.js
 * 
 * @route POST /           Cria um novo usuário
 * @route GET /            Lista todos os usuários
 * @route GET /:id         Obtém um usuário pelo ID
 * @route GET /email/:email Busca um usuário pelo e-mail
 * @route GET /cnpj/:cnpj   Busca um usuário pelo CNPJ
 * @route PUT /:id         Atualiza um usuário pelo ID
 * @route DELETE /:id      Exclui um usuário pelo ID
 */

import express from 'express';
import {
  criarUsuario,
  obterUsuario,
  atualizarUsuario,
  excluirUsuario,
} from '../../controllers/usuarioController.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/:id', verificarToken, obterUsuario);
router.put('/:id', verificarToken, atualizarUsuario);
router.delete('/:id', verificarToken, excluirUsuario);

export default router;
