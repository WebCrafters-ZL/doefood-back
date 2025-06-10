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
  };

  /**
   * Método para buscar doações por ID de doador.
   * @param {string} doadorId - ID do doador cujas doações serão buscadas.
   * @returns {Promise<Array>} - Lista de doações associadas ao doador.
   */
  async buscarPorDoadorId(doadorId) {
    try {
      const snapshot = await this.collection.where("doadorId", "==", doadorId).get();
      const doacoes = [];
      snapshot.forEach(doc => {
        doacoes.push({ id: doc.id, ...doc.data() });
      });
      return doacoes;
    } catch (error) {
      console.error("Erro ao buscar doações por doador:", error);
      throw error;
    }
  };

  /**
   * Método para buscar doações por ID de beneficiário.
   * @param {string} beneficiarioId - ID do beneficiário cujas doações serão buscadas.
   * @returns {Promise<Array>} - Lista de doações associadas ao beneficiário.
   */
  async buscarPorBeneficiarioId(beneficiarioId) {
    try {
      const snapshot = await this.collection.where("beneficiarioId", "==", beneficiarioId).get();
      const doacoes = [];
      snapshot.forEach(doc => {
        doacoes.push({ id: doc.id, ...doc.data() });
      });
      return doacoes;
    } catch (error) {
      console.error("Erro ao buscar doações por beneficiário:", error);
      throw error;
    }
  };
};

export default DoacaoModel;
