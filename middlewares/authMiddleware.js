/**
 * Middleware para verificar o token JWT enviado no cabeçalho Authorization.
 * Utiliza o Firebase Admin para validar o token.
 *
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função next do Express para passar o controle ao próximo middleware.
 * @returns {void}
 *
 * @throws {401} Se o token não for fornecido ou for inválido.
 */

import auth from "../services/authService.js";
import { mapFirebaseAuthCodeToMessage } from '../utils/firebaseAuthMessages.js';

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  if (token.length < 100 || !/^[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.?[A-Za-z0-9\-_.+/=]*$/.test(token)) {
    return res.status(401).json({
      code: 'invalid-token-format',
      message: 'Formato do token inválido'
    });
  }

  try {
    const decoded = await auth.verifyIdToken(token, true);
    req.usuario = decoded;
    console.log(`Autenticação bem-sucedida para: ${decoded.email} (${decoded.uid})`);
    res.header({
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff'
    });
    next();
  } catch (error) {
    const code = error.errorInfo?.code || error.code || 'auth/unknown';
    res.status(401).json({
      code: code.replace('auth/', ''),
      message: mapFirebaseAuthCodeToMessage(code),
    });
  }
};

export default verificarToken;
