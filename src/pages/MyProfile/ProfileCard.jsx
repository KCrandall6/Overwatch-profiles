import React, { useEffect, useState } from 'react';
import { getHeroes, getPlayerStats, getPlayerSummary } from '../../api/overfast';
import PlayerCard from '../Home/PlayerCard';

const DEFAULT_SCOPE = { platform: 'console', gamemode: 'competitive' };

export default function ProfileCard({ fav }) {
  const [state,setState]=useState({status:'loading'}), [heroes,setHeroes]=useState([]);
  useEffect(()=>{ let active=true; setState({status:'loading'}); Promise.all([getPlayerSummary(fav),getPlayerStats(fav,DEFAULT_SCOPE),getHeroes()]).then(([summary,stats,heroData])=>{if(active){setHeroes(heroData);setState({status:'ready',summary,stats})}}).catch(error=>active&&setState({status:'error',error})); return()=>{active=false}; },[fav]);
  return <section className="single-player"><PlayerCard player={fav} state={state} heroes={heroes} scope={DEFAULT_SCOPE} isFavorite onFavorite={()=>{}} onRetry={()=>setState({status:'loading'})}/></section>;
}
