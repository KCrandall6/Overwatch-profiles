import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ProfileCard = ({fav}) => {

  const [profileInfo, setProfileInfo] = useState({})
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  let index = fav.lastIndexOf('-');
  let shortenedName = fav.substring(0, index);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://overfast-api.tekrop.fr/players/${fav}/summary`)
      .then((res) => res.json())
      .then((res) => setProfilePic(res)),

      fetch(`https://overfast-api.tekrop.fr/players/${fav}/stats/summary`)
      .then((res) => res.json())
      .then((res) => setProfileInfo(res))
    ])
    .then(() => setLoading(false));
  }, [fav]);

  if (!loading) {
    return (
      <div className='p-3'>
        <div className="d-flex flex-row">
          <img
              alt="profile"
              src={profilePic.avatar}
              height="125"
              />
            <div className="d-flex flex-column overflow-auto text-center">
              <p className="fs-1 ps-3 text-break m-auto text-center"><b>{shortenedName}</b></p>
            </div>
        </div>
        <div className="text-center">
            <p className="titles">General Stats</p>
            <p className="labels">Total Games Played: </p>
            <p >{profileInfo.general.games_played}</p>
            <p className="labels">Win Rate: </p>
            <p >{profileInfo.general.winrate}%</p>
            <p className="labels">Kill/Death Rate: </p>
            <p >{profileInfo.general.kda}</p>
            <div className="divider"></div>
        </div>
            <Container className="show-grid text-center">
            <Row>
              <Col>
                <p className="head1">Totals</p>
                <p className="labels">Kills: </p>
                <p>{profileInfo.general.total.eliminations}</p>
                <p className="labels">Deaths: </p>
                <p>{profileInfo.general.total.deaths}</p>
                <p className="labels">Damage: </p>
                <p>{profileInfo.general.total.damage}</p>
                <p className="labels">Healed Health: </p>
                <p>{profileInfo.general.total.healing}</p>
              </Col>
              <Col>
                <p className="head1">Averages</p>
                <p className="labels">Kills: </p>
                <p>{profileInfo.general.average.eliminations}</p>
                <p className="labels">Deaths: </p>
                <p>{profileInfo.general.average.deaths}</p>
                <p className="labels">Damage: </p>
                <p>{profileInfo.general.average.damage}</p>
                <p className="labels">Healed Health: </p>
                <p>{profileInfo.general.average.healing}</p>
              </Col>
            </Row>
          </Container>
          <div className="divider"></div>
      </div>
    )
  }
};

export default ProfileCard;