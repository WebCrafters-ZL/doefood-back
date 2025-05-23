import UsuarioModel from '../models/UsuarioModel.js';
const usuarioModel = new UsuarioModel();

export const criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuarioModel.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

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

export const atualizarUsuario = async (req, res) => {
  try {
    const usuarioAtualizado = await usuarioModel.update(req.params.id, req.body);
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const excluirUsuario = async (req, res) => {
  try {
    await usuarioModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

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
