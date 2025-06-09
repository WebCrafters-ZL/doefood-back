/**
 * @fileoverview Configura e inicializa a aplicação Express para o backend DoeFood.
 * Define middlewares para CORS, cabeçalhos de segurança, parsing de JSON, logging e limitação de taxa.
 * Registra o roteador principal para endpoints relacionados a usuários e um endpoint de status para verificação de saúde.
 * Gerencia erros globais e inicia o servidor na porta especificada.
 *
 * @module app
 * @requires express
 * @requires cors
 * @requires helmet
 * @requires morgan
 * @requires express-rate-limit
 * @requires ./routes/usuarios/usuarios.js
 *
 * @description Este arquivo é o ponto de entrada da aplicação, configurando o servidor Express e os middlewares necessários.
 * Ele também define rotas principais e um endpoint de status para monitoramento da saúde do servidor.
 * Além disso, implementa um tratamento de erros global para capturar e responder a erros inesperados.
 * @example
 * // Para iniciar o servidor, execute:
 * npm start
 * // Ou, se estiver usando o Nodemon para desenvolvimento:
 * npm run dev
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import usuariosRouter from './routes/usuarios/usuarios.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/usuarios', usuariosRouter);
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}. Acesse http://localhost:${PORT}/status para verificar o status.`);
});

export default app;
