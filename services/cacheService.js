class CacheService {
    constructor() {
        this.cache = {};
    }

    // Set data in cache with a specified TTL (Time to Live)
    set(key, value, ttl) {
        const expiry = Date.now() + ttl;
        this.cache[key] = { value, expiry };
    }

    // Get data from cache
    get(key) {
        const cachedItem = this.cache[key];
        if (!cachedItem) return null;

        // Check if cache is expired
        if (Date.now() > cachedItem.expiry) {
            delete this.cache[key];
            return null;
        }

        return cachedItem.value;
    }

    // Clear cache
    clear() {
        this.cache = {};
    }
}

module.exports = new CacheService();
