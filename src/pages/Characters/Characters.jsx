import React, { useEffect, useMemo, useState } from 'react';
import Hero from './Hero';
import { getHeroes } from '../../api/overfast';
import { capitalize } from '../../utils/playerStats';

export default function Characters() {
  const [heroes, setHeroes] = useState([]);
  const [status, setStatus] = useState('loading');
  const [role, setRole] = useState('all');
  const [sort, setSort] = useState('name');
  useEffect(() => { getHeroes().then(data => { setHeroes(data); setStatus('ready'); }).catch(() => setStatus('error')); }, []);
  const visible = useMemo(() => heroes.filter(hero => role === 'all' || hero.role === role).sort((a,b) => String(a[sort]).localeCompare(String(b[sort]))), [heroes, role, sort]);
  return <main className="page-shell"><section className="page-heading"><p className="eyebrow">HERO ARCHIVE</p><h1>Heroes</h1><p>Explore the people, abilities, and stories behind Overwatch.</p></section><div className="toolbar hero-toolbar"><div>{['all','tank','damage','support'].map(value => <button key={value} className={role===value?'active':''} onClick={() => setRole(value)}>{capitalize(value)}</button>)}</div><label>Sort <select value={sort} onChange={e => setSort(e.target.value)}><option value="name">Name</option><option value="role">Role</option></select></label></div>{status==='loading' && <div className="hero-browser-grid">{[1,2,3,4,5,6].map(i=><div className="hero-browser-card skeleton-card" key={i}><div className="skeleton heroes"/></div>)}</div>}{status==='error' && <p className="empty-state panel">The hero archive is temporarily unavailable.</p>}{status==='ready' && <section className="hero-browser-grid">{visible.map(hero => <Hero key={hero.key} hero={hero}/>)}</section>}</main>;
}
