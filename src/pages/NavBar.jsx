import React, { useState, useEffect, useRef } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'react-bootstrap';

import navlogo from '../figures/OverwatchPR.png';

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = event => {
          if (navRef.current && !navRef.current.contains(event.target)) {
              setExpanded(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <Navbar ref={navRef} expand="lg">
          <NavbarBrand href="/">
            <img
            alt=''
            src={navlogo}
            height='25'
            />
            </NavbarBrand>
          <Button size="sm" onClick={() => setExpanded(!expanded)} aria-controls="navbar-collapse" aria-expanded={expanded}>
              <span className={`navbar-toggler-icon ${expanded ? 'open' : 'closed'}`} />
          </Button>
          <div id="navbar-collapse" className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
              <Nav className="mr-auto" navbar>
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