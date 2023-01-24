import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import PlayerModal from './PlayerModal';


const PlayerCard = ({user, data, isFav, onFav}) => {

  const [show, setShow] = useState(false);
  const [topRole, setTopRole] = useState('');
  const [picSrc, setPicSrc] = useState('');
  const name = user.slice(0, user.lastIndexOf('-'));

  useEffect(() => {
    setTopRole(Object.entries(data.roles).reduce((max, [role, {kda}]) => {
      return kda > max.kda ? {role, kda} : max;
    }, {role: null, kda: -Infinity}).role);

    fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`)
    .then((res) => res.json())
    .then((res) => setPicSrc(res))
  }, [user, data.roles]);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="d-flex align-items-center justify-content-center text-start m-2">
      <Card className="user-cards">
        <PlayerModal user={user} show={show} handleShow={handleShow} name={name} data={data} isFav={isFav} onFav={onFav}/>
        <Card.Header className="d-flex justify-content-between fs-1">
          {name}
          <Button 
            variant={isFav ? 'warning' : 'outline-warning'}
            onClick={onFav}
            style={{backgroundColor: isFav ? '#ffcd68' : '', color: isFav ? 'black' : ''}}
            >
              &#9734;
            </Button>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-row p-2">
            <img
            alt='hero avatar'
            src={picSrc.avatar}
            height='100'
            />
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="fs-3 ps-3 text-break m-auto">{name}</p>
            </div>
          </div>
            <p><b>Total Games Played: </b>{data.general.games_played}</p>
            <p><b>Win Rate: </b>{data.general.winrate}%</p>
            <p><b>Kill/Death ratio: </b>{data.general.kda}</p>
            <p><b>Top Role (<em>by K/D</em>): </b>{topRole}</p>
        </Card.Body>
        <Card.Footer>
        <Button onClick={handleShow} variant="secondary">See More</Button>
        </Card.Footer>
      </Card>
    </div>
  )
};

export default PlayerCard;