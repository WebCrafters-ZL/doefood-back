import db from '../services/firestoreService.js';

/**
 * Classe BaseModel para operações CRUD em uma coleção do banco de dados Firestore.
 *
 * @class
 * @param {string} collectionName - Nome da coleção no Firestore.
 *
 * @property {object} collection - Referência à coleção do Firestore.
 *
 * @method
 * @name create
 * @description Cria um novo documento na coleção.
 * @param {object} data - Dados a serem inseridos no documento.
 * @returns {Promise<object>} Documento criado com o ID gerado.
 *
 * @method
 * @name findById
 * @description Busca um documento pelo seu ID.
 * @param {string} id - ID do documento.
 * @returns {Promise<object|null>} Documento encontrado ou null se não existir.
 *
 * @method
 * @name update
 * @description Atualiza um documento existente pelo ID.
 * @param {string} id - ID do documento.
 * @param {object} data - Dados a serem atualizados.
 * @returns {Promise<object>} Documento atualizado.
 *
 * @method
 * @name delete
 * @description Remove um documento pelo ID.
 * @param {string} id - ID do documento.
 * @returns {Promise<boolean>} Retorna true se a exclusão for bem-sucedida.
 *
 * @method
 * @name findAll
 * @description Retorna todos os documentos da coleção.
 * @returns {Promise<object[]>} Lista de documentos da coleção.
 */
class BaseModel {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  create = async (data) => {
    const docRef = await this.collection.add(data);
    return { id: docRef.id, ...data };
  };

  findById = async (id) => {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  };

  update = async (id, data) => {
    if (!id) {
      throw new Error('ID do documento é obrigatório para atualização.');
    }
    await this.collection.doc(id).update(data);
    return { id, ...data };
  };

  delete = async (id) => {
    await this.collection.doc(id).delete();
    return true;
  };

  findAll = async () => {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
}

export default BaseModel;
