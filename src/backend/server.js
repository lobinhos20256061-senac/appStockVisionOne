require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- INCLUÍDO: Necessário para mapear os caminhos de pastas
const connectDB = require('./config/database.js');

// --- IMPORTAÇÃO DOS ROTEADORES DO ECOSSISTEMA ---
const authRoutes = require('./routes/authRoutes.js');
const stockRoutes = require('./routes/stockRoutes.js');
const esgRoutes = require('./routes/esgRoutes.js');
const supplyRoutes = require('./routes/supplyRoutes.js'); 
const demandRoutes = require('./routes/demandRoutes.js');   // Módulo Preditivo IA
const reverseRoutes = require('./routes/reverseRoutes.js'); // Módulo Logística Reversa

const app = express();

// Inicializa conexão NoSQL com MongoDB
connectDB();

// Middlewares Globais de Segurança e Payload
app.use(cors());
app.use(express.json());

// --- MAPEAMENTO DAS ROTAS DA API ---
app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/esg', esgRoutes);
app.use('/api/supply', supplyRoutes);   
app.use('/api/demand', demandRoutes);   // Injeção do motor IA de Demanda
app.use('/api/reverse', reverseRoutes); // Injeção da Economia Circular/ESG

// --- SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND ---
// Como server.js está em src/backend, subimos duas pastas para achar o frontend na raiz
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rota curinga: Qualquer link que não seja da API vai abrir o index.html principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[Servidor] StockVision operacional e sincronizado na porta ${PORT}`);
});