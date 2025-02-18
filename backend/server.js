// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');  // Importa o CORS

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para permitir CORS
app.use(cors());  // Isso permitirá requisições de qualquer origem

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rota para criar crachá
app.post('/api/badges', (req, res) => {
  const { firstName, lastName, email, position, department } = req.body;

  const query = 'INSERT INTO badges (firstName, lastName, email, position, department) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [firstName, lastName, email, position, department], (err, result) => {
    if (err) {
      console.error('Erro ao inserir crachá: ', err);
      return res.status(500).send('Erro ao criar crachá');
    }
    res.status(201).send({ id: result.insertId, firstName, lastName, email, position, department });
  });
});

// Rota para obter todos os crachás
app.get('/api/badges', (req, res) => {
  const query = 'SELECT * FROM badges';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar crachás: ', err);
      return res.status(500).send('Erro ao buscar crachás');
    }
    res.status(200).json(results);
  });
});
// backend/server.js

// Rota para buscar um crachá específico para edição
app.get('/api/badges/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM badges WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar crachá:', err);
      return res.status(500).send('Erro ao buscar crachá');
    }
    res.status(200).json(results[0]);
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
