import React, { useState, useEffect, useMemo } from 'react';
import { Image } from 'react-bootstrap';
import Cookies from 'js-cookie';

import PlayerCard from './PlayerCard';

import teamlogo from '../../figures/overwatchteam.png';

// List of mine and my friend's accounts for tracking when profiles are available (waiting on Blizzard to update)
// const users = ['PhilMckavity-1588', 'Malais52-1661', 'MasterCheeks-11371', 'HerryBanana-1388', 'IGUSYDUSY-1429', 'GimmeUrMilk-11378', 'Koalii-11847', 'XAYAW-1551'];
const users = ['PhilMckavity-1588', 'IGUSYDUSY-1429', 'XAYAW-1551'];

// List of streamers/professional OW2 players
// const users = ['mL7-21877', 'emongg-11183', 'Fitzyhere-1294', 'Masaa-1182', 'Eskay-11565', 'Mace2theFace-21713'];

const Home = () => {

  const [userList, setUserList] = useState({});
  const [fav, setFav] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      setCookie('profiles', users);
      const favCookie = getCookie('user');
      if (favCookie) {
        setFav(favCookie);
      }
  
      for (const user of users) {
        try {
          const response = await fetch(`https://overfast-api.tekrop.fr/players/${user}/stats/summary`);
          const data = await response.json();
          setUserList((prevState) => ({ ...prevState, [user]: data }));
        } catch (error) {
          console.error(`Error fetching data for user ${user}:`, error);
        }
      }
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
        alt=''
        src={teamlogo}
        width='100%'
      />
      <h3><em>Stay on Top and Track</em></h3>
      <h3><em>Your Favorite Players</em></h3>
      <div className="divider"></div>
      <div className="to-flex-wrap">
        {entries.map(([user, data]) => {
          return (
            <div key={data.general.games_played} >
              <PlayerCard user={user} data={data} isFav={user === fav} onFav={() => handleFavoriting(user)}/>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Home;