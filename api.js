// Aplication Programming Interface
// REST - Representational State Transfer

// GET
// POST
// PUT / PATCH
// DELETE

// JSON - JavaScript Object Notation
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3100;

// Segredo usado para assinar o token de login.
// Defina JWT_SECRET no ambiente para os logins sobreviverem a reinicios do servidor.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) console.warn('JWT_SECRET nao definido: os logins serao perdidos quando o servidor reiniciar.');
const HASH_FALSO = bcrypt.hashSync('senha-falsa', 10); // usado para o tempo de resposta ser igual quando o e-mail nao existe
const UM_DIA = 24 * 60 * 60 * 1000;

app.use(express.json());
app.use(cookieParser());

// Verifica se o usuario esta logado (cookie com o token)
function exigirLogin(req, res, next) {
    try {
        req.admin = jwt.verify(req.cookies.token, JWT_SECRET, { algorithms: ['HS256'] });
        res.set('Cache-Control', 'no-store'); // impede o botao voltar de mostrar a pagina depois do logout
        next();
    } catch (error) {
        if (req.originalUrl.startsWith('/api')) {
            return res.status(401).json({ erro: 'Faca login para continuar' });
        }
        res.redirect('/login.html');
    }
}

// Pagina chamadas: so entra quem estiver logado (precisa vir ANTES do express.static)
app.use((req, res, next) => {
    let caminho;
    try {
        caminho = decodeURIComponent(req.path).toLowerCase();
    } catch (error) {
        return res.status(400).end();
    }
    if (caminho === '/chamadas.html') return exigirLogin(req, res, next);
    next();
});

// Serve o site (public/index.html aparece em "/")
app.use(express.static(path.join(__dirname, 'public')));

// Campo opcional vazio vira NULL no banco
const opcional = (valor) => (valor && String(valor).trim() !== '' ? String(valor).trim() : null);


app.post('/api/uploads/critica', async (req, res) => {  //UPLOADS CRITICAS
    try {
        const { setor, assunto, descricao, sugestao, nome } = req.body;

        const query = 'INSERT INTO critica (setor, assunto, descricao, sugestao, nome) VALUES (?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [setor, assunto, descricao, opcional(sugestao), opcional(nome)]);

        res.status(201).json({ id: resultado.insertId, mensagem: 'recebido com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar crítica' });
    }
});


app.post('/api/uploads/denuncia', async (req, res) => {  //UPLOADS DENUNCIA
    try {
        const { tipo_denuncia, setor, local, pessoa_envolvidas, descricao, testemunhas, nome, email } = req.body;

        const query = 'INSERT INTO denuncia (tipo_denuncia, setor, local, pessoa_envolvidas, descricao, testemunhas, nome, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [
            tipo_denuncia, setor, opcional(local), opcional(pessoa_envolvidas),
            descricao, opcional(testemunhas), opcional(nome), opcional(email)
        ]);

        res.status(201).json({ id: resultado.insertId, mensagem: 'recebido com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar denúncia' });
    }
});


app.post('/api/uploads/reclamacao', async (req, res) => {  //UPLOADS RECLAMACAO
    try {
        const { categoria, setor, nivel_urgencia, resumo_reclamacao, descricao, tentou_resolver, sugestao, nome } = req.body;

        const query = 'INSERT INTO reclamacao (categoria, setor, nivel_urgencia, resumo_reclamacao, descricao, tentou_resolver, sugestao, nome) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [resultado] = await db.query(query, [
            categoria, setor, nivel_urgencia, resumo_reclamacao, descricao,
            opcional(tentou_resolver), opcional(sugestao), opcional(nome)
        ]);

        res.status(201).json({ id: resultado.insertId, mensagem: 'recebido com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao guardar reclamação' });
    }
});


app.post('/api/login', async (req, res) => {  //LOGIN ADMINISTRADOR
    try {
        const { email, senha, lembrar } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Informe e-mail e senha' });
        }

        const query = 'SELECT id, email, senha_hash FROM administrador WHERE email = ?';
        const [linhas] = await db.query(query, [email]);
        const admin = linhas[0];

        const senhaCorreta = await bcrypt.compare(String(senha), admin ? admin.senha_hash : HASH_FALSO);

        if (!admin || !senhaCorreta) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: lembrar ? '7d' : '2h', algorithm: 'HS256' });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: lembrar ? 7 * UM_DIA : undefined
        });

        res.status(200).json({ mensagem: 'login realizado com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor: ', error);
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
});


app.post('/api/logout', (req, res) => {  //LOGOUT
    res.clearCookie('token');
    res.status(200).json({ mensagem: 'logout realizado com sucesso!' });
});


app.listen(PORT, () => console.log(`O servidor está rodando em http://localhost:${PORT}`));