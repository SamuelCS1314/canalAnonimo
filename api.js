// Aplication Programming Interface
// REST - Representational State Transfer

// GET
// POST
// PUT / PATCH
// DELEETE


// JSON - JavaScript Object Notation
import express from "express";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";

const upload = multer({dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename); 
const app = express();
const PORT = 3000;
const db = require('./db');


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public',  'html', 'index.html'));
});


app.post('/api/uploads', async (req, res) => {
    const formCritica = req.body;
    console.log('Json Recebido ', formCritica);
    const query = 'INSERT INTO critica (nome, data, assunto, descricao, sugestao, setor) VALUES ($nome, $data, $assunto, $descricao, $sugestao, $setor)';
    await db.query(query, [nome, data, assunto, descricao, sugestao, setor]);

    res.status(201).json({ mensagem: 'recebido com sucesso!',});
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta localhost:${PORT} `));