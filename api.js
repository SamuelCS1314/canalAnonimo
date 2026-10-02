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

const upload = multer({ dest: 'uploads/' });
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
import db from './db.js';


app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')); /* provavel erro*/
});


app.post('/api/uploads/critica', async (req, res) => {  //UPLOADS CRITICAS
    try {
        const { setor, data, assunto, descricao, sugestao, nome } = req.body;

        const query = 'INSERT INTO criticas (setor, assunto, descricao, sugestao, nome) VALUES ( ?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [setor, assunto, descricao, sugestao, nome]);

        const id = resultado.insertId

        res.status(201).json({ id: id, mensagem: 'recebido com sucesso! ', })
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar crítica' });
    }
});


app.post('/api/uploads/denuncia', async (req, res) => {  //UPLOADS DENUNCIA
    try {
        const { tipo_denuncia, setor, local, pessoa_envolvidas, descricao, testemunhas, nome, email} = req.body;

        const query = 'INSERT INTO denuncia (tipo_denuncia, setor, local, pessoa_envolvidas, descricao, testemunhas, nome, email) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [tipo_denuncia, setor, local, pessoa_envolvidas, descricao, testemunhas, nome, email]);

        const id = resultado.insertId

        res.status(201).json({ id: id, mensagem: 'recebido com sucesso! ', })
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar criticas' });
    }
});


app.post('/api/uploads/reclamacao', async (req, res) => {  //UPLOADS RECLAMACAO
    try {
        const { categoria, setor, nivel_urgencia, resumo_reclamacao, descricao, tentou_resolver, sugestao, nome} = req.body;

        const query = 'INSERT INTO reclamacao (categoria, setor, nivel_urgencia, resumo_reclamacao, descricao, tentou_resolver, sugestao, nome) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [categoria, setor, nivel_urgencia, resumo_reclamacao, descricao, tentou_resolver, sugestao, nome]);

        const id = resultado.insertId

        res.status(201).json({ id: id, mensagem: 'recebido com sucesso! ', })
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar reclamacao' });
    }
});

app.get("/api/manifestacoes", async function (req, res) {
    try {
        const [criticas] = await db.query(
            "SELECT * FROM criticas"
        );

        const [denuncias] = await db.query(
            "SELECT * FROM denuncia"
        );

        const [reclamacoes] = await db.query(
            "SELECT * FROM reclamacao"
        );

        const manifestacoes = [
            ...criticas.map(function (item) {
                return {
                    protocolo: "CRI-" + item.id,
                    tipo: "Crítica",
                    assunto: item.assunto,
                    data: item.data,
                    setor: item.setor,
                    autor: item.nome || "Anônimo",
                    anonimo: !item.nome,
                    descricao: item.descricao,
                    complemento:
                        item.sugestao || "Não informado",
                    anexo: "Não informado"
                };
            }),

            ...denuncias.map(function (item) {
                return {
                    protocolo: "DEN-" + item.id,
                    tipo: "Denúncia",
                    assunto: item.tipo_denuncia,
                    data: item.data,
                    setor: item.setor,
                    autor: item.nome || "Anônimo",
                    anonimo: !item.nome,
                    descricao: item.descricao,
                    complemento:
                        item.testemunhas || "Não informado",
                    anexo: "Não informado"
                };
            }),

            ...reclamacoes.map(function (item) {
                return {
                    protocolo: "REC-" + item.id,
                    tipo: "Reclamação",
                    assunto: item.resumo_reclamacao,
                    data: item.data,
                    setor: item.setor,
                    autor: item.nome || "Anônimo",
                    anonimo: !item.nome,
                    descricao: item.descricao,
                    complemento:
                        item.sugestao || "Não informado",
                    anexo: "Não informado"
                };
            })
        ];

        manifestacoes.sort(function (a, b) {
            return new Date(b.data) - new Date(a.data);
        });

        res.status(200).json(manifestacoes);
    } catch (erro) {
        console.error(
            "Erro ao buscar manifestações:",
            erro
        );

        res.status(500).json({
            erro: "Erro ao buscar manifestações"
        });
    }
});


app.listen(PORT, () => console.log(`O servidor está rodando na porta localhost:${PORT} `));