import express from 'express';
import mongoose from 'mongoose';
import usuarioRoutes from './routes/usuario.js';
import clinicaRoutes from './routes/clinica.js';
import pacienteRoutes from './routes/paciente.js';
import enderecoRoutes from './routes/endereco.js';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://projetoevoluti:4qljdqqZmwQKFgRp@evoluti.iw8yc2g.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  }
};

// Middleware para JSON
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Usar as rotas
app.use('/api', usuarioRoutes);
app.use('/api', clinicaRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', enderecoRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
