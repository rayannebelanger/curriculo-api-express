const express = require('express');
const serverless = require('serverless-http');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// === PESSOAS ===
app.get('/pessoas', async (req, res) => {
    const pessoas = await prisma.pessoa.findMany({
        include: {
            experiencias: true,
            formacoes: true,
            habilidades: true,
        },
    });
    res.json(pessoas);
});

app.post('/pessoas', async (req, res) => {
    const { nome, email, telefone } = req.body;
    const novaPessoa = await prisma.pessoa.create({ data: { nome, email, telefone } });
    res.json(novaPessoa);
});

app.put('/pessoas/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const pessoaAtualizada = await prisma.pessoa.update({
        where: { id: Number(id) },
        data: { nome, email, telefone },
    });
    res.json(pessoaAtualizada);
});

app.delete('/pessoas/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.pessoa.delete({ where: { id: Number(id) } });
    res.json({ message: 'Pessoa deletada com sucesso' });
});

// === EXPERIÊNCIAS ===
app.post('/experiencias', async (req, res) => {
    const { cargo, empresa, periodo, descricao, pessoaId } = req.body;
    const novaExperiencia = await prisma.experiencia.create({
        data: { cargo, empresa, periodo, descricao, pessoaId },
    });
    res.json(novaExperiencia);
});

app.put('/experiencias/:id', async (req, res) => {
    const { id } = req.params;
    const { cargo, empresa, periodo, descricao } = req.body;
    const experienciaAtualizada = await prisma.experiencia.update({
        where: { id: Number(id) },
        data: { cargo, empresa, periodo, descricao },
    });
    res.json(experienciaAtualizada);
});

app.delete('/experiencias/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.experiencia.delete({ where: { id: Number(id) } });
    res.json({ message: 'Experiência deletada com sucesso' });
});

// === FORMAÇÕES ===
app.post('/formacoes', async (req, res) => {
    const { curso, instituicao, ano, pessoaId } = req.body;
    const novaFormacao = await prisma.formacao.create({
        data: { curso, instituicao, ano, pessoaId },
    });
    res.json(novaFormacao);
});

app.put('/formacoes/:id', async (req, res) => {
    const { id } = req.params;
    const { curso, instituicao, ano } = req.body;
    const formacaoAtualizada = await prisma.formacao.update({
        where: { id: Number(id) },
        data: { curso, instituicao, ano },
    });
    res.json(formacaoAtualizada);
});

app.delete('/formacoes/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.formacao.delete({ where: { id: Number(id) } });
    res.json({ message: 'Formação deletada com sucesso' });
});

// === HABILIDADES ===
app.post('/habilidades', async (req, res) => {
    const { nome, nivel, pessoaId } = req.body;
    const novaHabilidade = await prisma.habilidade.create({
        data: { nome, nivel, pessoaId },
    });
    res.json(novaHabilidade);
});

app.put('/habilidades/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, nivel } = req.body;
    const habilidadeAtualizada = await prisma.habilidade.update({
        where: { id: Number(id) },
        data: { nome, nivel },
    });
    res.json(habilidadeAtualizada);
});

app.delete('/habilidades/:id', async (start, res) => {
    const { id } = req.params;
    await prisma.habilidade.delete({ where: { id: Number(id) } });
    res.json({ message: 'Habilidade deletada com sucesso' });
});

module.exports.handler = serverless(app);