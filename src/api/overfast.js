export const OVERFAST_BASE_URL = 'https://overfast-api.tekrop.fr';

const cache = new Map();

export class OverfastError extends Error {
  constructor(message, { status, retryAfter, cause } = {}) {
    super(message);
    this.name = 'OverfastError';
    this.status = status;
    this.retryAfter = retryAfter;
    this.cause = cause;
  }
}

async function request(path, { signal, cacheKey, ttl = 0 } = {}) {
  const key = cacheKey || path;
  const cached = cache.get(key);
  if (cached && (!cached.expires || cached.expires > Date.now())) return cached.value;

  const promise = fetch(`${OVERFAST_BASE_URL}${path}`, { signal, headers: { Accept: 'application/json' } })
    .then(async response => {
      if (!response.ok) {
        let detail;
        try { detail = await response.json(); } catch (_) { /* response has no JSON body */ }
        throw new OverfastError(detail?.detail || `OverFast returned ${response.status}`, {
          status: response.status,
          retryAfter: response.headers?.get?.('retry-after') || detail?.retry_after,
        });
      }
      return response.json();
    })
    .catch(error => {
      cache.delete(key);
      if (error.name === 'AbortError' || error instanceof OverfastError) throw error;
      throw new OverfastError('Unable to reach OverFast', { cause: error });
    });

  cache.set(key, { value: promise, expires: ttl ? Date.now() + ttl : 0 });
  return promise;
}

export const getPlayerSummary = (player, options = {}) =>
  request(`/players/${encodeURIComponent(player)}/summary`, { ...options, cacheKey: `summary:${player}`, ttl: 60_000 });

export const getPlayerStats = (player, { platform, gamemode, signal } = {}) => {
  if (!['pc', 'console'].includes(platform) || !['competitive', 'quickplay'].includes(gamemode)) {
    return Promise.reject(new TypeError('Player stats require an explicit platform and gamemode'));
  }
  const query = new URLSearchParams({ platform, gamemode });
  return request(`/players/${encodeURIComponent(player)}/stats/summary?${query}`, {
    signal, cacheKey: `stats:${player}:${platform}:${gamemode}`, ttl: 60_000,
  });
};

export const getHeroes = (options = {}) => request('/heroes', { ...options, cacheKey: 'heroes', ttl: 24 * 60 * 60_000 });
export const getHeroDetails = (hero, options = {}) => request(`/heroes/${encodeURIComponent(hero)}`, { ...options, cacheKey: `hero:${hero}`, ttl: 24 * 60 * 60_000 });
export const clearPlayerCache = player => [...cache.keys()].filter(key => key.includes(`:${player}`)).forEach(key => cache.delete(key));

