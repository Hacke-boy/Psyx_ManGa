// jikanService.js

const axios = require('axios');

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

// Fetch the latest manga
async function fetchLatestManga() {
    try {
        const response = await axios.get(`${JIKAN_API_URL}/manga?order_by=published&sort=desc`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latest manga:', error);
        throw error;
    }
}

// Search for a specific manga
async function searchManga(query) {
    try {
        const response = await axios.get(`${JIKAN_API_URL}/manga?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error searching for manga:', error);
        throw error;
    }
}

module.exports = {
    fetchLatestManga,
    searchManga
};