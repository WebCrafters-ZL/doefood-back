import jwt from 'jsonwebtoken';

export const gerarToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado no .env');
  }

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '1h' }
  );
}

export const verificarToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não configurado no .env');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}
