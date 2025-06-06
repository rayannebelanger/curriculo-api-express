const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { curso, instituicao, ano, pessoaId } = req.body;
    const novaFormacao = await prisma.formacao.create({
        data: { curso, instituicao, ano, pessoaId },
    });
    res.json(novaFormacao);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { curso, instituicao, ano } = req.body;
    const formacaoAtualizada = await prisma.formacao.update({
        where: { id: Number(id) },
        data: { curso, instituicao, ano },
    });
    res.json(formacaoAtualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.formacao.delete({ where: { id: Number(id) } });
    res.json({ message: 'Formação deletada com sucesso' });
});

module.exports = router;
