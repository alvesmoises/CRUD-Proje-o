const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco_de_dados'
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados');
});

// Rota para receber os dados do formulário e inserir no banco de dados
app.post('/cadastro-dados', (req, res) => {
  const { nome, email, telefone, data, comentarios } = req.body;

  // Salvar os dados no banco de dados
  const sql = 'INSERT INTO tabela_de_dados (nome, email, telefone, data, comentarios) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nome, email, telefone, data, comentarios], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao salvar os dados' });
      return;
    }
    console.log('Dados inseridos com sucesso no banco de dados');
    res.status(200).json({ message: 'Dados salvos com sucesso' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
