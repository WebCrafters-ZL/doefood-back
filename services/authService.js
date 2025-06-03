import adminApp from '../config/firebaseAdmin.js';
import { getAuth } from 'firebase-admin/auth';

/**
 * Instância do serviço de autenticação Firebase associada ao aplicativo admin.
 * 
 * @type {import('firebase-admin').auth.Auth}
 */
const auth = getAuth(adminApp);

export default auth;
