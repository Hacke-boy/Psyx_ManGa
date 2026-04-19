const express = require('express');
const router = express.Router();
const chapters = []; // This array will act as a dummy database

// GET all chapters
router.get('/', (req, res) => {
    res.json(chapters);
});

// GET chapter by ID
router.get('/:id', (req, res) => {
    const chapter = chapters.find(ch => ch.id === parseInt(req.params.id));
    if (!chapter) return res.status(404).send('Chapter not found');
    res.json(chapter);
});

// POST a new chapter
router.post('/', (req, res) => {
    const chapter = {
        id: chapters.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    chapters.push(chapter);
    res.status(201).json(chapter);
});

// PUT update an existing chapter
router.put('/:id', (req, res) => {
    const chapter = chapters.find(ch => ch.id === parseInt(req.params.id));
    if (!chapter) return res.status(404).send('Chapter not found');

    chapter.title = req.body.title;
    chapter.content = req.body.content;
    res.json(chapter);
});

// DELETE a chapter by ID
router.delete('/:id', (req, res) => {
    const index = chapters.findIndex(ch => ch.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Chapter not found');

    chapters.splice(index, 1);
    res.status(204).send();
});

module.exports = router;