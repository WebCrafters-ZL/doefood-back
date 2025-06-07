import BaseModel from './BaseModel.js';

/**
 * Modelo para manipulação de usuários na coleção 'usuarios'.
 * Estende a classe BaseModel para fornecer operações específicas de usuário.
 *
 * @class
 * @extends BaseModel
 */
class UsuarioModel extends BaseModel {
  constructor() {
    super('usuarios');
  }
}

export default UsuarioModel;
