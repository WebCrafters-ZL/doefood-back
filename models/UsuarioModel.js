const BaseModel = require('./BaseModel');

class UsuarioModel extends BaseModel {
  constructor() {
    super('usuarios'); // Nome da coleção no Firestore
  }


  async findByEmail(email) {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async findByCnpj(cnpj) {
    const snapshot = await this.collection.where('cnpj', '==', cnpj).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  // Métodos específicos podem ser adicionados aqui
}

module.exports = UsuarioModel;
