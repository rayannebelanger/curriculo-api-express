const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { cargo, empresa, periodo, descricao, pessoaId } = req.body;
    const novaExperiencia = await prisma.experiencia.create({
        data: { cargo, empresa, periodo, descricao, pessoaId },
    });
    res.json(novaExperiencia);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cargo, empresa, periodo, descricao } = req.body;
    const experienciaAtualizada = await prisma.experiencia.update({
        where: { id: Number(id) },
        data: { cargo, empresa, periodo, descricao },
    });
    res.json(experienciaAtualizada);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.experiencia.delete({ where: { id: Number(id) } });
    res.json({ message: 'Experiência deletada com sucesso' });
});

module.exports = router;
