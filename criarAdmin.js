// Cria um administrador no banco (a senha é guardada criptografada).
// Uso: node criarAdmin.js email@exemplo.com minhaSenha
import bcrypt from 'bcryptjs';
import db from './db.js';

const [email, senha] = process.argv.slice(2);

if (!email || !senha) {
    console.log('Uso: node criarAdmin.js email senha');
    process.exit(1);
}

try {
    const senhaHash = await bcrypt.hash(senha, 10);
    await db.query('INSERT INTO administrador (email, senha_hash) VALUES (?, ?)', [email, senhaHash]);
    console.log('Administrador criado: ', email);
} catch (error) {
    console.error('Erro ao criar administrador: ', error.message);
} finally {
    await db.end();
}
