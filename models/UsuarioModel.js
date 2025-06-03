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
   * Busca um usuário pelo e-mail.
   *
   * @async
   * @param {string} email - O e-mail do usuário a ser buscado.
   * @returns {Promise<Object|null>} Retorna o usuário encontrado ou null se não existir.
   */
  findByEmail = async (email) => {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  };

  /**
   * Busca um usuário pelo CNPJ.
   *
   * @async
   * @param {string} cnpj - O CNPJ do usuário a ser buscado.
   * @returns {Promise<Object|null>} Retorna o usuário encontrado ou null se não existir.
   */
  findByCnpj = async (cnpj) => {
    const snapshot = await this.collection.where('cnpj', '==', cnpj).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  };
}

export default UsuarioModel;
