const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { nome, nivel, pessoaId } = req.body;
    const novaHabilidade = await prisma.habilidade.create({
        data: { nome, nivel, pessoaId },
    });
    res.json(novaHabilidade);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, nivel } = req.body;
    const habilidadeAtualizada = await prisma.habilidade.update({
        where: { id: Number(id) },
        data: { nome, nivel },
    });
    res.json(habilidadeAtualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.habilidade.delete({ where: { id: Number(id) } });
    res.json({ message: 'Habilidade deletada com sucesso' });
});

module.exports = router;
