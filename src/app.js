const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// === PESSOAS ===
app.get('/pessoas', async (req, res) => {
    try {
        const pessoas = await prisma.pessoa.findMany({
            include: {
                experiencias: true,
                formacoes: true,
                habilidades: true,
            },
        });
        res.json(pessoas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/pessoas', async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        const novaPessoa = await prisma.pessoa.create({
            data: { nome, email, telefone },
        });
        res.status(201).json(novaPessoa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/pessoas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;
        const pessoaAtualizada = await prisma.pessoa.update({
            where: { id: Number(id) },
            data: { nome, email, telefone },
        });
        res.json(pessoaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/pessoas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pessoa.delete({ where: { id: Number(id) } });
        res.json({ message: 'Pessoa deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === EXPERIÊNCIAS ===
app.post('/experiencias', async (req, res) => {
    try {
        const { cargo, empresa, periodo, descricao, pessoaId } = req.body;
        const novaExperiencia = await prisma.experiencia.create({
            data: { cargo, empresa, periodo, descricao, pessoaId },
        });
        res.status(201).json(novaExperiencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/experiencias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { cargo, empresa, periodo, descricao } = req.body;
        const experienciaAtualizada = await prisma.experiencia.update({
            where: { id: Number(id) },
            data: { cargo, empresa, periodo, descricao },
        });
        res.json(experienciaAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/experiencias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.experiencia.delete({ where: { id: Number(id) } });
        res.json({ message: 'Experiência deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === FORMAÇÕES ===
app.post('/formacoes', async (req, res) => {
    try {
        const { curso, instituicao, ano, pessoaId } = req.body;
        const novaFormacao = await prisma.formacao.create({
            data: { curso, instituicao, ano, pessoaId },
        });
        res.status(201).json(novaFormacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/formacoes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { curso, instituicao, ano } = req.body;
        const formacaoAtualizada = await prisma.formacao.update({
            where: { id: Number(id) },
            data: { curso, instituicao, ano },
        });
        res.json(formacaoAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/formacoes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.formacao.delete({ where: { id: Number(id) } });
        res.json({ message: 'Formação deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// === HABILIDADES ===
app.post('/habilidades', async (req, res) => {
    try {
        const { nome, nivel, pessoaId } = req.body;
        const novaHabilidade = await prisma.habilidade.create({
            data: { nome, nivel, pessoaId },
        });
        res.status(201).json(novaHabilidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/habilidades/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, nivel } = req.body;
        const habilidadeAtualizada = await prisma.habilidade.update({
            where: { id: Number(id) },
            data: { nome, nivel },
        });
        res.json(habilidadeAtualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/habilidades/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.habilidade.delete({ where: { id: Number(id) } });
        res.json({ message: 'Habilidade deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
