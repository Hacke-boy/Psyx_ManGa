const express = require('express');
const router = express.Router();

// In-memory manga data store (for example purposes)
let mangaList = [];

// GET all manga
router.get('/', (req, res) => {
    res.json(mangaList);
});

// POST new manga
router.post('/', (req, res) => {
    const newManga = req.body;
    mangaList.push(newManga);
    res.status(201).json(newManga);
});

// PUT update manga
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedManga = req.body;
    const index = mangaList.findIndex(m => m.id === id);
    if (index !== -1) {
        mangaList[index] = updatedManga;
        res.json(updatedManga);
    } else {
        res.status(404).send('Manga not found');
    }
});

// DELETE manga
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = mangaList.findIndex(m => m.id === id);
    if (index !== -1) {
        mangaList.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Manga not found');
    }
});

module.exports = router;