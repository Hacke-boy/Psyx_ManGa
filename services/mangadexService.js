// mangadexService.js

const axios = require('axios');

// Base URL for MangaDex API
const baseURL = 'https://api.mangadex.org';

/**
 * Fetches the latest chapters for a given manga ID.
 * @param {string} mangaId - The ID of the manga.
 * @returns {Promise<Object>} - A promise that resolves to the latest chapters.
 */
const fetchLatestChapters = async (mangaId) => {
    try {
        const response = await axios.get(`${baseURL}/manga/${mangaId}/aggregates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latest chapters:', error);
        throw error;
    }
};

/**
 * Fetches information about a specific manga.
 * @param {string} mangaId - The ID of the manga.
 * @returns {Promise<Object>} - A promise that resolves to the manga info.
 */
const fetchMangaInfo = async (mangaId) => {
    try {
        const response = await axios.get(`${baseURL}/manga/${mangaId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching manga info:', error);
        throw error;
    }
};

module.exports = { fetchLatestChapters, fetchMangaInfo };