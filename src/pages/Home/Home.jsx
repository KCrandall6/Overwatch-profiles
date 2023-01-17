import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

import PlayerCard from './PlayerCard';

import teamlogo from '../../figures/overwatchteam.png';

// const users = ['PhilMckavity-1588', 'Malais52-1661', 'MasterCheeks-11371', 'HerryBanana-1388', 'IGUSYDUSY-1429', 'GimmeUrMilk-11378', 'Koalii-11847', ]

const Home = () => {

  const [userList, setUserList] = useState({});

  
  useEffect(() => {
    const users = ['TeKrop-2217', 'roll-11736', 'banana-12938', 'Toyota-21458', 'Titan-13106'];
    const requests = users.map((user) => 
        fetch(`https://overfast-api.tekrop.fr/players/${user}/stats/summary`)
        .then((res) => res.json())
        .then((data) => {
            setUserList((prevState) => ({...prevState, [user]: data}));
        })
    );
    Promise.all(requests);
  }, []);

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
        {Object.entries(userList).map(([user, data]) => {
          return (
            <div key={data.general.games_played} >
              <PlayerCard user={user} data={data}/>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Home;