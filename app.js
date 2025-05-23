/**
 * @fileoverview Main application file for the DoeFood backend.
 * Initializes and configures the Express server.
 * 
 * @module app
 */

import express from 'express';
import db from './config/firestore.js';

/**
 * Express application instance.
 * @const {import('express').Application}
 */
const app = express();

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

import usuariosRouter from './routes/usuarios/usuarios.js';
app.use('/usuarios', usuariosRouter);

/**
 * Server port number.
 * Defaults to 3000 if the PORT environment variable is not set.
 * @const {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the server and listens on the specified port.
 * Logs a message indicating the server is running and provides a status endpoint.
 */
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}. Acesse http://localhost:${PORT}/status para verificar o status.`);
});

/**
 * GET /status
 * Endpoint to check the status of the server.
 * Responds with a JSON object indicating the server is running.
 * 
 * @name GetStatus
 * @function
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
app.get('/status', (req, res) => {
    const status = {
        Status: "Rodando"
    };
    res.send(status);
});

export default app;