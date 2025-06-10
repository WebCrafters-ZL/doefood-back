import BaseModel from './BaseModel.js';

/**
 * Modelo para manipulação de usuários na coleção 'usuarios'.
 * Estende a classe BaseModel para fornecer operações específicas de usuário.
 *
 * @class
 * @extends BaseModel
 */
class UsuarioModel extends BaseModel {
  constructor() {
    super('usuarios');
  }

  /**
   * Método para buscar um usuário por email.
   * @param {string} email - Email do usuário a ser buscado.
   * @returns {Promise<Object|null>} - Objeto do usuário encontrado ou null se não existir.
   */
  async buscarPorEmail(email) {
    try {
      const usuario = await this.collection.findOne({ email });
      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  }
  /**
   * Método para buscar um usuário por CNPJ.
   * @param {string} CNPJ - CNPJ do usuário a ser buscado.
   * @returns {Promise<Object|null>} - Objeto do usuário encontrado ou null se não existir.
   */
  async buscarPorCNPJ(CNPJ) {
    try {
      const usuario = await this.collection.findOne({ CNPJ });
      return usuario;
    }
    catch (error) {
      console.error('Erro ao buscar usuário por CNPJ:', error);
      throw error;
    }
  }
}

export default UsuarioModel;
