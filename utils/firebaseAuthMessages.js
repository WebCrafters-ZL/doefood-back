// utils/firebaseAuthMessages.js

const firebaseAuthMessages = {
  'auth/id-token-expired': 'Sua sessão expirou. Faça login novamente.',
  'auth/id-token-revoked': 'Seu acesso foi revogado. Faça login novamente.',
  'auth/invalid-id-token': 'Token de autenticação inválido. Tente novamente.',
  'auth/user-disabled': 'Sua conta foi desativada. Contate o suporte.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/email-already-exists': 'Este e-mail já está em uso.',
  'auth/invalid-email': 'O e-mail informado é inválido.',
  'auth/invalid-password': 'A senha informada é inválida.',
  'auth/weak-password': 'A senha é muito fraca. Use pelo menos 6 caracteres.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/operation-not-allowed': 'Operação não permitida. Contate o suporte.',
  'auth/internal-error': 'Erro interno do servidor. Tente novamente mais tarde.',
};

export function mapFirebaseAuthCodeToMessage(code) {
  return (
    firebaseAuthMessages[code] ||
    'Ocorreu um erro de autenticação. Tente novamente.'
  );
}
