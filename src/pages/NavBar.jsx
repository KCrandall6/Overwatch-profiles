import React, { useState, useEffect, useRef } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'react-bootstrap';

import navlogo from '../figures/OverwatchPR.png';


function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (navRef.current && !navRef.current.contains(event.target) && window.matchMedia('(max-width: 768px)').matches) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handleResize = () => {
      if (!window.matchMedia('(max-width: 768px)').matches) {
        setExpanded(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar ref={navRef} expand="lg">
      <NavbarBrand href="/">
        <img
          alt='Overwatch PR logo'
          src={navlogo}
          height='25'
        />
      </NavbarBrand>
      { window.matchMedia('(max-width: 768px)').matches && (
        <Button 
          size="sm" 
          onClick={() => setExpanded(!expanded)} aria-controls="navbar-collapse" 
          aria-expanded={expanded}
          style={{ backgroundColor: "#F99B12", border: "none"}}
          >
          <span className={`navbar-toggler-icon ${expanded ? 'open' : 'closed'}`} />
        </Button>
      ) }
      <div id="navbar-collapse" className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
        <Nav className="mr-auto text-center"  navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myprofile">My Profile</NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}


export default NavBar;