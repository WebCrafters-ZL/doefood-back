/**
 * Roteador de doações para a aplicação Express.
 * 
 * Define as rotas relacionadas às operações de doações, incluindo:
 * - Criação de doação
 * - Obtenção de doação por ID
 * - Busca de doações por ID de usuário
 * - Listagem de todas as doações
 * @module routes/doacoes
 * @requires express
 * @requires ../../controllers/doacaoController.js
 * 
 * @route POST /           Cria uma nova doação
 * @route GET /:id         Obtém uma doação pelo ID
 * @route GET /usuario/:id  Busca doações por ID de usuário
 * @route GET /            Lista todas as doações 
 */

import express from 'express';
import {
  criarDoacao,
  obterDoacao,
  buscarDoacoesPorUsuarioId,
  obterTodasDoacoes,
} from '../../controllers/doacaoController.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, criarDoacao);
router.get('/:id', verificarToken, obterDoacao);
router.get('/usuario/:id', verificarToken, buscarDoacoesPorUsuarioId);
router.get('/', verificarToken, obterTodasDoacoes);

export default router;