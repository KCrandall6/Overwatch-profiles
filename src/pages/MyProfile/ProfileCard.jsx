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

  const formatTimePlayed = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };
  console.log('te', profileInfo)

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
            <p className="labels">Total Time Played: </p>
            <p >{formatTimePlayed(profileInfo.general.time_played)}</p>
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
                  {/* <Modal.Body className="text-center mb-0">
          <p className="titles">General Stats</p>
          <p className="head1">Ranked Role Queue</p>
          <Container className='d-flex flex-column text-center mt-3'>
              {roles.map((role) => {
                return (
                  <React.Fragment key={role}>
                    <Row>
                    <Col>
                        <p className='fs-2 mb-1'>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                        <p><em>{compSum?.competitive?.console?.[role]?.division ? `${compSum.competitive.console[role].division} ${compSum.competitive.console[role].tier}` : "unranked"}</em></p>
                      </Col>
                      <Col>
                          {compSum?.competitive?.console?.[role]?.rank_icon ? (
                        <img
                          alt='rank'
                          src={compSum.competitive.console[role].rank_icon}
                          height='50'
                        />
                      ) : (
                        <img
                          alt='unranked'
                          src={unrankedImg}
                          height='50'
                        />
                      )}
                      </Col>
                    </Row>
                  </React.Fragment>
                )
              })}
          </Container>
          <br></br> */}
          {/* <p className="labels">Total Games Played: </p>
          <p >{data.general.games_played}</p> */}
          {/* <p className="labels">Win Rate: </p>
          <p >{data.general.winrate}%</p>
          <p className="labels">Lifetime Kill/Death Rate: </p>
          <p >{data.general.kda}</p>
          <p className="labels">Favorite Role (by time played): </p>
          <p ><em>{topRole.charAt(0).toUpperCase() + topRole.slice(1)}</em></p>
          <div className="divider"></div>
        </Modal.Body>
        <Modal.Body className="show-grid text-center">
          <Container>
            <Row>
              <Col>
                <p className="head1">Totals</p>
                <p className="labels">Kills: </p>
                <p>{data.general.total.eliminations}</p>
                <p className="labels">Deaths: </p>
                <p>{data.general.total.deaths}</p>
                <p className="labels">Damage: </p>
                <p>{data.general.total.damage}</p>
                <p className="labels">Healed Health: </p>
                <p>{data.general.total.healing}</p>
              </Col>
              <Col>
                <p className="head1">Averages</p>
                <p className="labels">Kills: </p>
                <p>{data.general.average.eliminations}</p>
                <p className="labels">Deaths: </p>
                <p>{data.general.average.deaths}</p>
                <p className="labels">Damage: </p>
                <p>{data.general.average.damage}</p>
                <p className="labels">Healed Health: </p>
                <p>{data.general.average.healing}</p>
              </Col>
            </Row>
          </Container>
          <div className="divider"></div>
        </Modal.Body> */}
          <div className="divider"></div>
      </div>
    )
  }
};

export default ProfileCard;