/**
 * @module firestore
 * @description Firestore database instance for the DoeFood application.
 * 
 * This module initializes the Firebase Admin SDK and exports the Firestore database instance.
 * It uses a service account key for authentication.
 * 
 * @requires firebase-admin
 * @requires firebase-admin/firestore
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../serviceAccountKey.json' with { type: "json" };
/**
 * Firebase Admin SDK initialization.
 * Uses a service account key to authenticate with Firebase.
 */
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
/**
 * Firestore database instance.
 * @const {import('firebase-admin').firestore.Firestore}
 */

export default db;