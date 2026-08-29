import React, { useState } from 'react';
import PlayerModal from './PlayerModal';
import { capitalize, displayName, formatDuration, getTopHeroes, profileStatus } from '../../utils/playerStats';

const ROLES = ['tank', 'damage', 'support'];

export default function PlayerCard({ player, state = { status: 'loading' }, scope, heroes, isFavorite, onFavorite, onRetry }) {
  const [show, setShow] = useState(false);
  const name = state.summary?.username || displayName(player);
  const metadata = Object.fromEntries(heroes.map(hero => [hero.key, hero]));

  if (state.status === 'loading') return <article className="player-card skeleton-card" aria-label={`Loading ${name}`}><div className="skeleton hero-line"/><div className="identity"><div className="skeleton avatar"/><div className="skeleton text-line"/></div><div className="skeleton ranks"/><div className="skeleton heroes"/></article>;

  if (state.status === 'error') {
    const unavailable = profileStatus(state.error);
    return <article className="player-card unavailable-card"><header><div><span className="scope-badge">Tracked player</span><h2>{name}</h2></div><button className="favorite" onClick={onFavorite} aria-label={`${isFavorite ? 'Remove' : 'Add'} favorite`}>{isFavorite ? '★' : '☆'}</button></header><div className="unavailable-content"><span className="status-icon">!</span><h3>{unavailable.title}</h3><p>{unavailable.message}</p>{state.error?.retryAfter && <small>Retry after {state.error.retryAfter}.</small>}<button className="primary-button" onClick={onRetry}>Retry</button></div></article>;
  }

  const { summary, stats } = state;
  const ranks = summary?.competitive?.[scope.platform] || {};
  const topHeroes = getTopHeroes(stats?.heroes, 3);
  const scopeLabel = `${scope.gamemode === 'quickplay' ? 'Quick Play' : 'Competitive'} · ${scope.platform === 'pc' ? 'PC' : 'Console'}`;
  return <>
    <article className="player-card">
      <header><div><span className="scope-badge">{scopeLabel}</span><h2>{name}</h2></div><button className="favorite" onClick={onFavorite} aria-label={`${isFavorite ? 'Remove' : 'Add'} favorite`}>{isFavorite ? '★' : '☆'}</button></header>
      <div className="identity"><img src={summary?.avatar} alt=""/><div><strong>{name}</strong><span>{summary?.title || 'Overwatch player'}</span></div>{summary?.endorsement?.frame && <img className="endorsement" src={summary.endorsement.frame} alt={summary.endorsement.level ? `Endorsement ${summary.endorsement.level}` : 'Endorsement'}/>}</div>
      {scope.gamemode === 'competitive' && <><div className="rank-grid">{ROLES.map(role => { const rank = ranks?.[role]; return <div key={role}><span>{capitalize(role)}</span>{rank?.rank_icon && <img src={rank.rank_icon} alt=""/>}<strong>{rank?.division ? `${capitalize(rank.division)} ${rank.tier}` : 'Unranked'}</strong></div>; })}</div><div className="compact-open-rank"><span>Open Queue</span><strong>{ranks.open?.division ? `${capitalize(ranks.open.division)} ${ranks.open.tier}` : 'Unranked'}</strong></div></>}
      <section className="most-played"><div className="section-heading"><h3>Most Played Heroes</h3><small>{scopeLabel}</small></div>{topHeroes.length ? topHeroes.map(([key, hero]) => <div className="hero-row" key={key}><img src={metadata[key]?.portrait} alt=""/><span>{metadata[key]?.name || capitalize(key)}</span><strong>{formatDuration(hero.time_played)}</strong></div>) : <p className="empty-state">No hero statistics are available for this scope.</p>}</section>
      <button className="primary-button full" onClick={() => setShow(true)}>View full profile</button>
    </article>
    <PlayerModal player={player} initialSummary={summary} initialStats={stats} initialScope={scope} heroes={heroes} show={show} onHide={() => setShow(false)} isFavorite={isFavorite} onFavorite={onFavorite}/>
  </>;
}
