# DoeFood Back

Backend da aplicação DoeFood, responsável pela gestão de doações de alimentos.

## Tecnologias

- Node.js
- Express
- Firebase Cloud Firestore
- Firebase Authentication

## Requisitos

- Node.js >= 18.x

## Instalação

```bash
git clone https://github.com/WebCrafters-ZL/doefood-back.git
cd doefood-back
npm install
```

## Configuração

Crie um arquivo `.env.development.local` baseado no `.env.example`:

```bash
cp .env.example .env.development.local
```

Edite as variáveis conforme necessário.

## Rodando o projeto

### Local

```bash
npm run dev
```

## Scripts

- `npm run dev`: inicia o servidor em modo desenvolvimento
- `npm start`: inicia o servidor em modo produção

## Estrutura de Pastas

```
src/
    controllers/
    models/
    routes/
    middlewares/
    services/
    utils/
```

## Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha feature'`
4. Push para o branch: `git push origin minha-feature`
5. Abra um Pull Request
