import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import PlayerCard from './PlayerCard';
import profiles from '../../profiles.json';
import { clearPlayerCache, getHeroes, getPlayerStats, getPlayerSummary } from '../../api/overfast';

const DEFAULT_SCOPE = { platform: 'console', gamemode: 'competitive' };

export default function Home() {
  const [scope, setScope] = useState(DEFAULT_SCOPE);
  const [favorite, setFavorite] = useState(() => Cookies.get('user') || '');
  const [players, setPlayers] = useState(() => Object.fromEntries(profiles.map(player => [player, { status: 'loading' }])));
  const [heroes, setHeroes] = useState([]);
  const requests = useRef({});

  useEffect(() => {
    Cookies.set('profiles', profiles.join(','), { expires: 90 });
    getHeroes().then(setHeroes).catch(() => setHeroes([]));
  }, []);

  const loadPlayer = useCallback(async player => {
    const request = (requests.current[player] || 0) + 1;
    requests.current[player] = request;
    setPlayers(previous => ({ ...previous, [player]: { ...previous[player], status: 'loading' } }));
    try {
      const [summary, stats] = await Promise.all([getPlayerSummary(player), getPlayerStats(player, scope)]);
      if (requests.current[player] === request) setPlayers(previous => ({ ...previous, [player]: { status: 'ready', summary, stats } }));
    } catch (error) {
      if (requests.current[player] === request) setPlayers(previous => ({ ...previous, [player]: { status: 'error', error } }));
    }
  }, [scope]);

  useEffect(() => { profiles.forEach(loadPlayer); }, [loadPlayer]);

  const toggleFavorite = player => {
    const next = favorite === player ? '' : player;
    setFavorite(next);
    next ? Cookies.set('user', next, { expires: 90 }) : Cookies.remove('user');
  };

  const retryPlayer = player => {
    clearPlayerCache(player);
    loadPlayer(player);
  };

  return (
    <main className="page-shell">
      <section className="squad-hero">
        <div><p className="eyebrow">OVERWATCH PROFILE TRACKER</p><h1>Your Squad</h1><p>Clear, scoped performance data for {profiles.length} tracked players.</p></div>
        <div className="scope-controls" aria-label="Dashboard data scope">
          <fieldset><legend>Platform</legend>{['console', 'pc'].map(value => <button key={value} className={scope.platform === value ? 'active' : ''} onClick={() => setScope(s => ({ ...s, platform: value }))}>{value === 'pc' ? 'PC' : 'Console'}</button>)}</fieldset>
          <fieldset><legend>Game mode</legend>{['competitive', 'quickplay'].map(value => <button key={value} className={scope.gamemode === value ? 'active' : ''} onClick={() => setScope(s => ({ ...s, gamemode: value }))}>{value === 'quickplay' ? 'Quick Play' : 'Competitive'}</button>)}</fieldset>
        </div>
      </section>
      <p className="scope-note">Showing <strong>{scope.gamemode === 'quickplay' ? 'Quick Play' : 'Competitive'} · {scope.platform === 'pc' ? 'PC' : 'Console'}</strong>. Data is never combined across modes or platforms.</p>
      <section className="player-grid" aria-live="polite">
        {profiles.map(player => <PlayerCard key={player} player={player} state={players[player]} scope={scope} heroes={heroes} isFavorite={favorite === player} onFavorite={() => toggleFavorite(player)} onRetry={() => retryPlayer(player)} />)}
      </section>
    </main>
  );
}
