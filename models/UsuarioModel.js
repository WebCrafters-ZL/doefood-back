import BaseModel from './BaseModel.js';

class UsuarioModel extends BaseModel {
  constructor() {
    super('usuarios');
  }

  findByEmail = async (email) => {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  };

  findByCnpj = async (cnpj) => {
    const snapshot = await this.collection.where('cnpj', '==', cnpj).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  };
}

export default UsuarioModel;
