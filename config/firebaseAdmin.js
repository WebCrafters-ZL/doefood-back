import { initializeApp, cert, getApps } from 'firebase-admin/app';
import serviceAccount from '../serviceAccountKey.json' with { type: 'json' };

let adminApp;
if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount)
  });
} else {
  adminApp = getApps()[0];
}

/**
 * Instância inicializada do Firebase Admin SDK.
 *
 * @constant
 * @type {import('firebase-admin').app.App}
 * @description Esta constante representa a aplicação Firebase Admin já configurada e pronta para uso.
 * Pode ser utilizada para acessar serviços administrativos do Firebase, como autenticação, Firestore, Storage, entre outros.
 */
export default adminApp;
