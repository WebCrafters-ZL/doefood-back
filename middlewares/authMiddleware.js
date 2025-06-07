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
import admin from "firebase-admin";

const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export default verificarToken;
