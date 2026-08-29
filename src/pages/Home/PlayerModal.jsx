import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { getPlayerStats } from '../../api/overfast';
import { capitalize, displayName, formatDuration, formatNumber, formatPercent, formatProfileUpdated, sortHeroStats } from '../../utils/playerStats';

const ROLES = ['tank', 'damage', 'support'];
const SORTS = { timeplayed: 'Time Played', name: 'Name', winrate: 'Win Rate', kda: 'KDA', damage: 'Avg. Damage', eliminations: 'Avg. Eliminations' };

export default function PlayerModal({ player, initialSummary, initialStats, initialScope, heroes, show, onHide, isFavorite, onFavorite }) {
  const [scope, setScope] = useState(initialScope);
  const [stats, setStats] = useState(initialStats);
  const [status, setStatus] = useState('ready');
  const [role, setRole] = useState('all');
  const [sort, setSort] = useState('timeplayed');
  const metadata = useMemo(() => Object.fromEntries(heroes.map(hero => [hero.key, hero])), [heroes]);

  useEffect(() => { setScope(initialScope); setStats(initialStats); }, [initialScope, initialStats]);
  useEffect(() => {
    if (!show) return;
    if (scope.platform === initialScope.platform && scope.gamemode === initialScope.gamemode) {
      setStats(initialStats);
      setStatus('ready');
      return;
    }
    const controller = new AbortController();
    setStatus('loading');
    getPlayerStats(player, { ...scope, signal: controller.signal }).then(data => {
      if (!controller.signal.aborted) { setStats(data); setStatus('ready'); }
    }).catch(error => { if (error.name !== 'AbortError' && !controller.signal.aborted) setStatus('error'); });
    return () => controller.abort();
  }, [show, player, scope, initialScope, initialStats]);

  const heroRows = useMemo(() => sortHeroStats(Object.entries(stats?.heroes || {}).filter(([key]) => role === 'all' || metadata[key]?.role === role), sort), [stats, metadata, role, sort]);
  const general = stats?.general || {};
  const ranks = initialSummary?.competitive?.[scope.platform] || {};
  const label = `${scope.gamemode === 'quickplay' ? 'Quick Play' : 'Competitive'} · ${scope.platform === 'pc' ? 'PC' : 'Console'}`;
  const platformLabel = scope.platform === 'pc' ? 'PC' : 'Console';
  const season = Number(ranks.season) > 0 ? ` · Season ${Number(ranks.season)}` : '';
  const name = initialSummary?.username || displayName(player);
  const freshness = formatProfileUpdated(initialSummary?.last_updated_at);
  const rankCard = (item, text = capitalize(item)) => {
    const rank = ranks[item];
    return <div key={item}><span>{text}</span>{rank?.rank_icon && <img src={rank.rank_icon} alt=""/>}<strong>{rank?.division ? `${capitalize(rank.division)} ${rank.tier}` : 'Unranked'}</strong></div>;
  };

  return <Modal show={show} onHide={onHide} size="lg" centered scrollable dialogClassName="player-modal">
    <Modal.Header closeButton><div className="modal-identity"><img src={initialSummary?.avatar} alt=""/><div><span className="scope-badge">PLAYER PROFILE</span><Modal.Title>{name}</Modal.Title>{initialSummary?.endorsement?.level != null && <small className="endorsement-level">Endorsement {initialSummary.endorsement.level}</small>}{freshness && <small className="profile-freshness">{freshness}</small>}</div></div><button className="favorite" onClick={onFavorite} aria-label="Toggle favorite">{isFavorite ? '★' : '☆'}</button></Modal.Header>
    <Modal.Body>
      <div className="scope-controls modal-controls"><fieldset><legend>Platform</legend>{['console','pc'].map(value => <button key={value} className={scope.platform === value ? 'active' : ''} onClick={() => setScope(s => ({...s, platform:value}))}>{value === 'pc' ? 'PC' : 'Console'}</button>)}</fieldset><fieldset><legend>Game mode</legend>{['competitive','quickplay'].map(value => <button key={value} className={scope.gamemode === value ? 'active' : ''} onClick={() => setScope(s => ({...s, gamemode:value}))}>{value === 'quickplay' ? 'Quick Play' : 'Competitive'}</button>)}</fieldset></div>
      <p className="scope-note compact">Career statistics below are scoped to <strong>{label}</strong>.</p>
      {status === 'loading' ? <div className="modal-skeleton"><div className="skeleton ranks"/><div className="skeleton heroes"/></div> : status === 'error' ? <div className="empty-state panel">Statistics are unavailable for this selection. Try another mode or platform.</div> : <>
        {scope.gamemode === 'competitive' && <section><div className="section-heading"><h3>Competitive Ranks</h3><small>{platformLabel}{season}</small></div><h4 className="rank-group-title">Role Queue</h4><div className="rank-grid detailed">{ROLES.map(item => rankCard(item))}</div><h4 className="rank-group-title">Open Queue</h4><div className="rank-grid open-queue detailed">{rankCard('open', 'Open Queue')}</div></section>}
        <section><div className="section-heading"><h3>Career Statistics</h3><small>{label}</small></div><div className="stat-grid"><div><span>Time Played</span><strong>{formatDuration(general.time_played)}</strong></div><div><span>Games Played</span><strong>{formatNumber(general.games_played)}</strong></div><div><span>Win Rate</span><strong>{formatPercent(general.winrate)}</strong></div><div><span>KDA</span><strong>{formatNumber(general.kda)}</strong></div><div><span>Avg. Eliminations</span><strong>{formatNumber(general.average?.eliminations)}</strong></div><div><span>Avg. Damage</span><strong>{formatNumber(general.average?.damage)}</strong></div></div></section>
        <section><div className="section-heading"><h3>Career Hero Statistics</h3><small>{heroRows.length} heroes · {label}</small></div><div className="toolbar"><div>{['all','tank','damage','support'].map(value => <button className={role === value ? 'active' : ''} onClick={() => setRole(value)} key={value}>{capitalize(value)}</button>)}</div><label>Sort <select value={sort} onChange={event => setSort(event.target.value)}>{Object.entries(SORTS).map(([value,text]) => <option value={value} key={value}>{text}</option>)}</select></label></div>
        <div className="hero-stats-list">{heroRows.length ? heroRows.map(([key,hero]) => <article key={key}><img src={metadata[key]?.portrait} alt=""/><div className="hero-stat-name"><strong>{metadata[key]?.name || capitalize(key)}</strong><span>{capitalize(metadata[key]?.role)}</span></div><dl><div><dt>Time</dt><dd>{formatDuration(hero.time_played)}</dd></div><div><dt>Win rate</dt><dd>{formatPercent(hero.winrate)}</dd></div><div><dt>KDA</dt><dd>{formatNumber(hero.kda)}</dd></div><div><dt>Avg. damage</dt><dd>{formatNumber(hero.average?.damage)}</dd></div><div><dt>Avg. eliminations</dt><dd>{formatNumber(hero.average?.eliminations)}</dd></div></dl></article>) : <p className="empty-state panel">No hero statistics are available for this selection.</p>}</div></section>
      </>}
    </Modal.Body>
  </Modal>;
}
