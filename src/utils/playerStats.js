export const displayName = battleTag => battleTag?.replace(/-([0-9]+)$/, '') || 'Unknown player';
export const capitalize = value => value ? value.charAt(0).toUpperCase() + value.slice(1) : '—';

export function formatDuration(seconds) {
  const total = Number(seconds);
  if (!Number.isFinite(total) || total < 0) return '—';
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export const formatNumber = value => Number.isFinite(Number(value)) ? new Intl.NumberFormat().format(Number(value)) : '—';
export const formatPercent = value => Number.isFinite(Number(value)) ? `${Number(value).toFixed(1).replace('.0', '')}%` : '—';

export function formatProfileUpdated(value, now = Date.now()) {
  if (!value) return '';
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return '';
  const minutes = Math.floor(Math.max(0, Number(now) - timestamp) / 60_000);
  if (minutes < 1) return 'Blizzard profile updated just now';
  if (minutes < 60) return `Blizzard profile updated ${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Blizzard profile updated ${hours} hr${hours === 1 ? '' : 's'} ago`;
  return `Blizzard profile updated ${new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(timestamp)}`;
}

export function getTopHeroes(heroes = {}, limit = 3) {
  return Object.entries(heroes || {})
    .filter(([, stats]) => Number.isFinite(Number(stats?.time_played)))
    .sort((a, b) => Number(b[1].time_played) - Number(a[1].time_played))
    .slice(0, limit);
}

export function sortHeroStats(entries, sort = 'timeplayed') {
  const value = (entry, path) => path.reduce((object, key) => object?.[key], entry[1]);
  const sorts = {
    name: (a, b) => a[0].localeCompare(b[0]),
    timeplayed: (a, b) => Number(value(b, ['time_played']) || 0) - Number(value(a, ['time_played']) || 0),
    winrate: (a, b) => Number(value(b, ['winrate']) || 0) - Number(value(a, ['winrate']) || 0),
    kda: (a, b) => Number(value(b, ['kda']) || 0) - Number(value(a, ['kda']) || 0),
    damage: (a, b) => Number(value(b, ['average', 'damage']) || 0) - Number(value(a, ['average', 'damage']) || 0),
    eliminations: (a, b) => Number(value(b, ['average', 'eliminations']) || 0) - Number(value(a, ['average', 'eliminations']) || 0),
  };
  return [...entries].sort(sorts[sort] || sorts.timeplayed);
}

export function profileStatus(error) {
  if (error?.status === 404) return { title: 'Player not found', message: 'OverFast could not find this BattleTag.' };
  if (error?.status === 403 || error?.status === 422) return { title: 'Profile unavailable', message: 'The profile may be private or unavailable from Blizzard.' };
  if (error?.status === 429) return { title: 'Stats temporarily unavailable', message: 'OverFast is rate limiting requests. Please retry shortly.' };
  return { title: 'Stats temporarily unavailable', message: 'This tracked player is still here. OverFast could not load their data.' };
}
