// Aplication Programming Interface
// REST - Representational State Transfer

// GET
// POST
// PUT / PATCH
// DELETE

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
import db from './db.js';


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public',  'html', 'index.html'));
});


app.post('/api/uploads/criticas', async (req, res) => {
    try{
        const  { nome, data, assunto, descricao, sugestao, setor } = req.body;
        console.log('Json Recebido ');
        const query = 'INSERT INTO critica (setor, data, assunto, descricao, sugestao, nome) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(query, [nome, data, assunto, descricao, sugestao, setor]);

    res.status(201).json({ mensagem: 'recebido com sucesso!',})
}    catch(error){
    console.error('Erro no servidor: ', error);
    res.status(500).json({ erro: 'Erro ao guardar crítica'});
}
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta localhost:${PORT} `));