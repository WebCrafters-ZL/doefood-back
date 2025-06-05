import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Porta padrão do Vite
  credentials: true // Caso use cookies 
}));

app.use(express.json());

import usuariosRouter from './routes/usuarios/usuarios.js';
app.use('/usuarios', usuariosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}. Acesse http://localhost:${PORT}/status para verificar o status.`);
});

app.get('/status', (req, res) => {
    const status = {
        Status: "Rodando"
    };
    res.send(status);
});

export default app;
