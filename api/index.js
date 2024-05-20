import express from 'express';
import mongoose from 'mongoose';



const app = express();
app.use(express.json());
const port = 3000;


const Paciente = mongoose.model('Paciente', {
    nome: String,
});

app.get("/", async (req, res) => {
    const pacientes = await Paciente.find()
    res.send(pacientes)
});
app.post("/", async(req, res) => {
    const paciente = new Paciente({
        nome: req.body.nome
    })
    await paciente.save()
    res.send(paciente)
});
app.delete("/:id", async(req, res) => {
    const paciente = await Paciente.findByIdAndDelete(req.params.id)
    return res.send(paciente)
});
app.put("/:id", async(req, res) => {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome
    },
    {
        new: true
    })
    return res.send(paciente)
});

app.listen(port, () => {
    mongoose.connect('mongodb+srv://projetoevoluti:Hp9R6836ZbvSvLen@evoluti.iw8yc2g.mongodb.net/?retryWrites=true&w=majority&appName=evoluti')
    console.log('Tudo funcionando')
});