const mongoose = require('mongoose');

// Função de conexão com o banco de dados
const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://projetoevoluti:Hp9R6836ZbvSvLen@evoluti.iw8yc2g.mongodb.net/?retryWrites=true&w=majority&appName=evoluti';
        
        // Tenta conectar ao banco de dados
        await mongoose.connect(uri, {
            useNewUrlParser: true, // Usa o novo parser de URL do MongoDB
            useUnifiedTopology: true // Usa o novo mecanismo de descoberta e monitoramento de servidores
        });
        console.log('Conexão com o MongoDB Atlas estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB Atlas:', error);

        // Encerra o processo do Node.js com código de saída 1 (erro)
        process.exit(1);
    }
}
module.exports = connectDB;
