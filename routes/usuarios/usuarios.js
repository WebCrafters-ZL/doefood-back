import express from 'express';
import {
  criarUsuario,
  listarUsuarios,
  obterUsuario,
  atualizarUsuario,
  excluirUsuario,
  buscarPorEmail,
  buscarPorCnpj
} from '../../controllers/usuarioController.js';

const router = express.Router();

router.post('/', criarUsuario);
router.get('/', listarUsuarios);
router.get('/:id', obterUsuario);
router.put('/:id', atualizarUsuario);
router.delete('/:id', excluirUsuario);

// (Opcional) novas rotas específicas
router.get('/email/:email', buscarPorEmail);
router.get('/cnpj/:cnpj', buscarPorCnpj);

export default router;
