const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: [String], 
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    chapters: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    description: {
        type: String
    }
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
