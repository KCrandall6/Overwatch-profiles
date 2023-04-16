import React, { useState, useEffect, useMemo } from 'react';
import { Image } from 'react-bootstrap';
import Cookies from 'js-cookie';

import PlayerCard from './PlayerCard';

import teamlogo from '../../figures/overwatchteam.png';

// const users = ['PhilMckavity-1588', 'Malais52-1661', 'MasterCheeks-11371', 'HerryBanana-1388', 'IGUSYDUSY-1429', 'GimmeUrMilk-11378', 'Koalii-11847', ]

// const test users = ['Moustache-11527', 'Zombie-2324', 'Banana-22526', 'Pencil-11535', 'Titan-13106', 'Fungus-21317'];

const Home = () => {

  const [userList, setUserList] = useState({});
  const [fav, setFav] = useState('');
  
  useEffect(() => {
    const users = ['PhilMckavity-1588', 'MasterCheeks-11371', 'HerryBanana-1388', 'IGUSYDUSY-1429', 'GimmeUrMilk-11378', 'Koalii-11847'];
    // const users = ['PhilMckavity-1588', 'Koalii-11847'];
    setCookie('profiles', users);
    const favCookie = getCookie('user');
    if (favCookie) {
      setFav(favCookie);
    }
    const requests = users.map((user) => 
        fetch(`https://overfast-api.tekrop.fr/players/${user}/stats/summary`)
        .then((res) => res.json())
        .then((data) => {
            setUserList((prevState) => ({...prevState, [user]: data}));
        })
    );
    Promise.all(requests);
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
      <h3><em>Your Game</em></h3>
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