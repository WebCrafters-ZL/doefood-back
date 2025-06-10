import DoacaoModel from "../models/DoacaoModel.js";

/**
 * Instância do modelo de Doação para manipulação de dados de doações.
 * @type {DoacaoModel}
 */
const doacaoModel = new DoacaoModel();

/**
 * Cria uma nova doação no banco de dados.
 *
 * @async
 * @function criarDoacao
 * @param {import('express').Request} req - Objeto de requisição do Express contendo os dados da doação no corpo da requisição.
 * @param {import('express').Response} res - Objeto de resposta do Express utilizado para enviar a resposta ao cliente.
 * @returns {Promise<void>} Retorna uma resposta JSON com a doação criada ou um erro.
 */
export const criarDoacao = async (req, res) => {
    try {
        const novaDoacao = await doacaoModel.create(req.body);
        res.status(201).json(novaDoacao);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

/**
 * Obtém uma doação pelo ID fornecido nos parâmetros da requisição.
 *
 * @async
 * @function obterDoacao
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o parâmetro 'id' da doação.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com a doação encontrada ou um erro apropriado.
 */
export const obterDoacao = async (req, res) => {
    try {
        const doacao = await doacaoModel.findById(req.params.id);
        doacao
            ? res.status(200).json(doacao)
            : res.status(404).send('Doação não encontrada');
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

/** Obtém todas as doações de um doador específico pelo ID do doador.
 *
 * @async
 * @function buscarDoacoesPorDoador
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID do doador em `params.id`.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com as doações do doador ou um erro.
 */
export const buscarDoacoesPorDoador = async (req, res) => {
    try {
        const doacoes = await doacaoModel.buscarPorDoadorId(req.params.id);
        res.status(200).json(doacoes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

/**
 * Obtém todas as doações de um beneficiário específico pelo ID do beneficiário.
 *
 * @async
 * @function buscarDoacoesPorBeneficiario
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID do beneficiário em `params.id`.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com as doações do beneficiário ou um erro.
 */
export const buscarDoacoesPorBeneficiario = async (req, res) => {
    try {
        const doacoes = await doacaoModel.buscarPorBeneficiarioId(req.params.id);
        res.status(200).json(doacoes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

/**
 * Obtém todas as doações registradas no banco de dados.
 *
 * @async
 * @function obterTodasDoacoes
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON com a lista de todas as doações ou um erro.
 */
export const obterTodasDoacoes = async (req, res) => {
    try {
        const doacoes = await doacaoModel.findAll();
        res.status(200).json(doacoes);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

/**
 * Atualiza uma doação existente com os dados fornecidos.
 *
 * @async
 * @function atualizarDoacao
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID da doação em `params.id` e os dados atualizados em `body`.
 * @param {import('express').Response} res - Objeto de resposta do Express, utilizado para enviar a resposta JSON.
 * @returns {Promise<void>} Retorna uma resposta JSON com a doação atualizada ou um erro.
 */
export const atualizarDoacao = async (req, res) => {
    try {
        const doacaoAtualizada = await doacaoModel.update(req.params.id, req.body);
        res.status(200).json(doacaoAtualizada);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

/**
 * Exclui uma doação com base no ID fornecido nos parâmetros da requisição.
 *
 * @async
 * @function excluirDoacao
 * @param {import('express').Request} req - Objeto de requisição do Express, contendo o ID da doação em `params.id`.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @returns {Promise<void>} Retorna uma resposta JSON confirmando a exclusão ou um erro.
 */
export const excluirDoacao = async (req, res) => {
    try {
        await doacaoModel.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}
