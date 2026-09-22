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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename); 
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public',  'html', 'index.html'));
});

app.listen(PORT, () => console.log(`O servidor está rodando na porta localhost:${PORT} `));

const upload = multer({dest: 'uploads/' });

app.post('/api/upload', upload.single('formCritica'), async (req, res) => {
    try{
        const arquivo = req.file;

        if(!arquivo){
            return res.status(400).json({erro: 'Nenhum arquivo enviado' });
            } else{
                console.log('Arquivo recebido: ',arquivo.originalname);
                console.log('Tamanho: ', arquivo.size);
                console.log('Caminho temporário: ', arquivo.path);
                console.log(arquivo)
        
                res.status(200).json({ mensagem: 'Upload e registro concluídos com sucesso '})
            }
    }  catch(erro) {
        res.status(500).json({ erro: 'Erro interno no servidor. '});
    }
})

/* const db = require('./db');*/