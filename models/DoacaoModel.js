import BaseModel from "./BaseModel.js";

/**
 * Modelo para manipulação de doações na coleção 'doacoes'.
 * Estende a classe BaseModel para fornecer operações específicas de doação.
 *
 * @class
 * @extends BaseModel
 */

class DoacaoModel extends BaseModel {
  constructor() {
    super("doacoes");
  }

  /**
   * Método para buscar doações por ID de usuário.
   * @param {string} usuarioId - ID do usuário cujas doações serão buscadas.
   * @returns {Promise<Array>} - Lista de doações associadas ao usuário.
   */
  async buscarPorUsuarioId(usuarioId) {
    try {
      const doacoes = await this.collection.find({ usuarioId }).toArray();
      return doacoes;
    } catch (error) {
      console.error("Erro ao buscar doações por usuário:", error);
      throw error;
    }
  }
}

export default DoacaoModel;
