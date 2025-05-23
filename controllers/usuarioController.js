const UsuarioModel = require('../models/UsuarioModel');
const usuarioModel = new UsuarioModel();

const criarUsuario = async (req, res) => {
  try {
    const novoUsuario = await usuarioModel.create(req.body);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const obterUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.findById(req.params.id);
    usuario ? res.json(usuario) : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const usuarioAtualizado = await usuarioModel.update(req.params.id, req.body);
    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const excluirUsuario = async (req, res) => {
  try {
    await usuarioModel.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Métodos adicionais específicos
const buscarPorEmail = async (req, res) => {
  try {
    const usuario = await usuarioModel.pesquisaPorEmail(req.params.email);
    usuario ? res.json(usuario) : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const buscarPorCnpj = async (req, res) => {
  try {
    const usuario = await usuarioModel.pesquisaPorCnpj(req.params.cnpj);
    usuario ? res.json(usuario) : res.status(404).send('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

module.exports = {
  criarUsuario,
  obterUsuario,
  atualizarUsuario,
  excluirUsuario,
  listarUsuarios,
  buscarPorEmail,
  buscarPorCnpj
};
