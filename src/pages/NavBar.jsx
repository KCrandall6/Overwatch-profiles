import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import navlogo from '../figures/OverwatchPR.png';

export default function NavBar() {
  const [open,setOpen]=useState(false);
  const link=({isActive})=>isActive?'active':'';
  return <header className="site-header"><nav className="site-nav"><NavLink to="/" className="brand" onClick={()=>setOpen(false)}><img src={navlogo} alt="Overwatch PR"/></NavLink><button className="nav-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(v=>!v)}><span/><span/><span/><span className="visually-hidden">Menu</span></button><div id="primary-nav" className={`nav-links ${open?'open':''}`}><NavLink className={link} to="/" onClick={()=>setOpen(false)}>Players</NavLink><NavLink className={link} to="/heroes" onClick={()=>setOpen(false)}>Heroes</NavLink><NavLink className={link} to="/patch-notes" onClick={()=>setOpen(false)}>Patch Notes</NavLink><NavLink className={link} to="/my-player" onClick={()=>setOpen(false)}>My Player</NavLink><NavLink className="share-link" to="/share" onClick={()=>setOpen(false)} aria-label="Share Overwatch PR">↗ Share</NavLink></div></nav></header>;
}
