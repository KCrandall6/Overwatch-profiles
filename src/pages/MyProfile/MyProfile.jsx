import React, { useState } from 'react';
import Cookies from 'js-cookie';
import profiles from '../../profiles.json';
import ProfileCard from './ProfileCard';
import { displayName } from '../../utils/playerStats';

export default function MyProfile() {
  const [favorite,setFavorite]=useState(()=>Cookies.get('user') || '');
  const select=event=>{ const value=event.target.value; setFavorite(value); Cookies.set('user',value,{expires:90}); };
  return <main className="page-shell"><section className="page-heading"><p className="eyebrow">FAVORITE PROFILE</p><h1>My Player</h1><p>Keep your favorite squad member close at hand.</p><label className="player-picker">Tracked player<select value={favorite} onChange={select}><option value="">Select a player</option>{profiles.map(player=><option key={player} value={player}>{displayName(player)}</option>)}</select></label></section>{favorite ? <ProfileCard fav={favorite}/> : <p className="empty-state panel">Choose a tracked player to make this page yours.</p>}</main>;
}
