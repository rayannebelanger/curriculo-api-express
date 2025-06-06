const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const pessoas = await prisma.pessoa.findMany({
        include: {
            experiencias: true,
            formacoes: true,
            habilidades: true,
        },
    });
    res.json(pessoas);
});

router.post('/', async (req, res) => {
    const { nome, email, telefone } = req.body;
    const novaPessoa = await prisma.pessoa.create({ data: { nome, email, telefone } });
    res.json(novaPessoa);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const pessoaAtualizada = await prisma.pessoa.update({
        where: { id: Number(id) },
        data: { nome, email, telefone },
    });
    res.json(pessoaAtualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.pessoa.delete({ where: { id: Number(id) } });
    res.json({ message: 'Pessoa deletada com sucesso' });
});

module.exports = router;
