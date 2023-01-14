import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';

import teamlogo from '../../figures/overwatchteam.png';

const Home = () => {

  useEffect(() => {
    fetch('https://overfast-api.tekrop.fr/players/TeKrop-2217/stats/summary')
    .then((res) => res.json())
    .then((res) => console.log('res', res))
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center p-2'>
      <Image
        alt=''
        src={teamlogo}
        width='100%'
      />
      <h3><em>Stay on Top and Track</em></h3>
      <h3><em>Your Game</em></h3>
      <div className="divider"></div>
    </div>
  )
};

export default Home;