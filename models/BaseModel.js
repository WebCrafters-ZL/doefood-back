import db from '../config/firestore.js';


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
    await this.collection.doc(id).update(data);
    return this.findById(id);
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
