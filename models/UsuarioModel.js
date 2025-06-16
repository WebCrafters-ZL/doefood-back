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
    if (!email) {
      throw new Error('Email é obrigatório para busca de usuário.');
    }

    try {
      const snapshot = await this.collection.where('email', '==', email).limit(1).get();
      if (snapshot.empty) {
        return null;
      }
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  }
  /**
   * Método para buscar um usuário por CNPJ.
   * @param {string} cnpj - CNPJ do usuário a ser buscado.
   * @returns {Promise<Object|null>} - Objeto do usuário encontrado ou null se não existir.
   */
  async buscarPorCnpj(cnpj) {
    if (!cnpj) {
      throw new Error('CNPJ é obrigatório para busca de usuário.');
    }

    try {
      const snapshot = await this.collection.where('cnpj', '==', cnpj).limit(1).get();
      if (snapshot.empty) {
        return null;
      }
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar usuário por CNPJ:', error);
      throw error;
    }
  }
}

export default UsuarioModel;
