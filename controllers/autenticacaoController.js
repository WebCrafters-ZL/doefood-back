/**
 *  Controlador de Autenticação
 *  Este módulo contém funções para gerenciar a recuperação e redefinição de senha dos usuários.
 *  Ele utiliza serviços de autenticação, token e email para realizar as operações necessárias.
 *  @module autenticacaoController
 */
import * as usuarioController from './usuarioController.js';
import * as tokenService from '../services/tokenService.js';
import * as emailService from '../services/emailService.js';
import auth from '../services/authService.js';

/**
 * Controlador para gerenciar a recuperação e redefinição de senha dos usuários.
 * Este controlador lida com a solicitação de redefinição de senha, validação do token e atualização da senha.
 * Ele utiliza serviços de autenticação, token e email para realizar as operações necessárias.
 * @module autenticacaoController
 * @requires usuarioController
 * @requires tokenService
 * @requires emailService
 * @requires authService
 */
export const recuperarSenha = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ mensagem: 'E-mail é obrigatório' });
        }

        const usuario = await usuarioController.buscarUsuarioPorEmailSimples(email);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        // Use o campo correto do usuário Firestore
        const payload = { uid: usuario.id }; // Aqui, 'id' é o uid do Auth
        const token = tokenService.gerarToken(payload);

        await usuarioController.salvarTokenRedefinicao(usuario.id, token);

        const linkRedefinicao = `${process.env.FRONTEND_URL}/autenticacao/redefinir-senha/${token}`;

        await emailService.enviarEmailRedefinicao(email, linkRedefinicao);

        return res.status(200).json({
            mensagem: 'E-mail de redefinição enviado com sucesso'
        });

    } catch (error) {
        console.error('Erro na solicitação de redefinição:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

/**
 * Controlador para redefinir a senha do usuário.
 * Este controlador valida o token de redefinição, atualiza a senha do usuário e invalida o token após a redefinição.
 * @module autenticacaoController
 * @requires usuarioController
 * @requires tokenService
 * @requires authService
 */
export const redefinirSenha = async (req, res) => {
    try {
        const { token } = req.params;
        const { novaSenha } = req.body;

        const decoded = tokenService.verificarToken(token);
        const uid = decoded.uid; // ou decoded.userId, conforme o payload
        if (!uid) {
            return res.status(400).json({ erro: 'UID inválido para redefinição de senha.' });
        }

        const usuario = await usuarioController.validarTokenRedefinicao(uid, token);

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Token inválido ou expirado' });
        }

        await auth.updateUser(uid, {
            password: novaSenha
        });

        await usuarioController.invalidarTokenRedefinicao(usuario.id);

        return res.status(200).json({ mensagem: 'Senha redefinida com sucesso' });

    } catch (error) {
        console.error('Erro na redefinição de senha:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'Token expirado' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ mensagem: 'Token inválido' });
        }

        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};
