const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escutando na porta ${PORT}. Acesse http://localhost:${PORT}/status para verificar o status.`);
});

app.get('/status', (req, res) => {
    const status = {
        "Status": "Rodando"
    };
    res.send(status);
});

module.exports = app;