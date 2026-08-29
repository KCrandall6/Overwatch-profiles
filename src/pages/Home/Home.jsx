import React, { useState, useEffect, useMemo } from 'react';
import { Alert, Image, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';

import PlayerCard from './PlayerCard';

import teamlogo from '../../figures/overwatchteam.png';
import users from '../../profiles.json';

const Home = () => {

  const [userList, setUserList] = useState(() =>
    Object.fromEntries(users.map((user) => [user, { status: 'loading' }]))
  );
  const [fav, setFav] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      setCookie('profiles', users);
      const favCookie = getCookie('user');
      if (favCookie) {
        setFav(favCookie);
      }
  
      await Promise.all(users.map(async (user) => {
        try {
          const response = await fetch(`https://overfast-api.tekrop.fr/players/${user}/stats/summary`);
          if (!response.ok) throw new Error(`Profile request returned ${response.status}`);
          const data = await response.json();
          if (!data?.general || !data?.roles || !data?.heroes) throw new Error('Profile response did not include stats');
          setUserList((prevState) => ({ ...prevState, [user]: { status: 'ready', data } }));
        } catch (error) {
          console.error(`Error fetching data for user ${user}:`, error);
          setUserList((prevState) => ({ ...prevState, [user]: { status: 'error' } }));
        }
      }));
    };
  
    fetchData();
  }, []);

  const entries = useMemo(() => Object.entries(userList), [userList]);

  const handleFavoriting = (user) => {
    if (fav === user) {
      setFav(null);
      removeCookie('user');
    } else {
      setFav(user);
      setCookie('user', user);
    }
  };

  const setCookie = (name, value) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 90);
    Cookies.set(name, value, { expires: expirationDate });
  };
  const removeCookie = (name) => {
    Cookies.remove(name);
  };
  const getCookie = (name) => {
    return Cookies.get(name);
  }


  return (
    <div className='mainbox d-flex flex-column text-center p-2'>
      <Image
        alt='Overwatch team'
        src={teamlogo}
        className='team-logo'
      />
      <h3><em>Stay on Top and Track</em></h3>
      <h3><em>Your Favorite Players</em></h3>
      <div className="divider"></div>
      <div className="to-flex-wrap">
        {entries.map(([user, profile]) => (
          <div key={user} className="profile-slot">
            {profile.status === 'loading' && <Spinner animation="border" aria-label={`Loading ${user}`} />}
            {profile.status === 'error' && (
              <Alert variant="secondary" className="m-2 profile-error">
                <strong>{user}</strong><br />Profile data is currently unavailable.
              </Alert>
            )}
            {profile.status === 'ready' && (
              <PlayerCard user={user} data={profile.data} isFav={user === fav} onFav={() => handleFavoriting(user)}/>
            )}
          </div>
        ))}
      </div>
    </div>
  )
};

export default Home;