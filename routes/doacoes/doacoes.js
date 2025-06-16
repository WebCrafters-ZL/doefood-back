/**
 * Roteador de doações para a aplicação Express.
 * 
 * Define as rotas relacionadas às operações de doações, incluindo:
 * - Criação de doação
 * - Obtenção de doação por ID
 * - Busca de doações por ID de doador
 * - Busca de doações por ID de beneficiário
 * - Listagem de todas as doações
 * - Atualização de doação (PATCH)
 * @module routes/doacoes
 * @requires express
 * @requires ../../controllers/doacaoController.js
 * 
 * @route POST /           Cria uma nova doação
 * @route GET /:id         Obtém uma doação pelo ID
 * @route GET /doador/:id  Busca doações por ID de doador
 * @route GET /beneficiario/:id Busca doações por ID de beneficiário
 * @route GET /            Lista todas as doações 
 * @route PATCH /:id       Atualiza uma doação pelo ID
 */

import express from 'express';
import {
  criarDoacao,
  obterDoacao,
  buscarDoacoesPorDoador,
  buscarDoacoesPorBeneficiario,
  obterTodasDoacoes,
  atualizarDoacao, // <-- Adicione esta linha
} from '../../controllers/doacaoController.js';
import verificarToken from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, criarDoacao);
router.get('/:id', verificarToken, obterDoacao);
router.get('/doador/:id', verificarToken, buscarDoacoesPorDoador);
router.get('/beneficiario/:id', verificarToken, buscarDoacoesPorBeneficiario);
router.get('/', verificarToken, obterTodasDoacoes);
router.patch('/:id', verificarToken, atualizarDoacao); // <-- Adicione esta linha

export default router;
