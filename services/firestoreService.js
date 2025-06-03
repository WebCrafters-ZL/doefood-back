import adminApp from '../config/firebaseAdmin.js';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Instância do Firestore obtida a partir do aplicativo admin.
 * 
 * @constant
 * @type {FirebaseFirestore.Firestore}
 * @see {@link https://firebase.google.com/docs/firestore}
 */
const db = getFirestore(adminApp);

export default db;
