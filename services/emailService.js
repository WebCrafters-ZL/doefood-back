import nodemailer from 'nodemailer';

// Configurar transporter do Ethereal (para desenvolvimento)
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS
  }
});

export const enviarEmailRedefinicao = async (email, link) => {
  const mensagem = {
    from: '"Suporte DoeFood" <suporte@doefood.com>',
    to: email,
    subject: 'Redefinição de Senha - DoeFood',
    text: `Clique no link para redefinir sua senha: ${link}`,
    html: `
      <p>Você solicitou a redefinição de senha. Clique no link abaixo:</p>
      <a href="${link}">Redefinir Senha</a>
      <p>Se não foi você, ignore este e-mail.</p>
    `
  };

  return transporter.sendMail(mensagem);
};
