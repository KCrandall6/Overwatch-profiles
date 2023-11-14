import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import PlayerModal from './PlayerModal';
import unrankedImg from '../../figures/unranked.png';


const PlayerCard = ({user, data, isFav, onFav}) => {

  const [show, setShow] = useState(false);
  const [topRole, setTopRole] = useState('');
  const [compSum, setCompSum] = useState('');
  const [loading, setLoading] = useState(true);
  const name = user.slice(0, user.lastIndexOf('-'));
  const roles = ['tank', 'damage', 'support'];

  useEffect(() => {
    setTopRole(Object.entries(data.roles).reduce((max, [role, {kda}]) => {
      return kda > max.kda ? {role, kda} : max;
    }, {role: null, kda: -Infinity}).role);

    fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`)
    .then((res) => res.json())
    .then((res) => {
      setCompSum(res);
      setLoading(false);
    })
  }, [user, data.roles]);

  const handleShow = () => {
    setShow(!show);
  };

  if (loading) {
    return <Spinner animation="border" />;
  };

  return (
    <div className="d-flex align-items-center justify-content-center text-start m-2">
      <Card className="user-cards">
        <PlayerModal user={user} show={show} handleShow={handleShow} name={name} data={data} isFav={isFav} onFav={onFav} topRole={topRole} compSum={compSum} roles={roles} unrankedImg={unrankedImg}/>
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
            src={compSum.avatar}
            height='100'
            />
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="fs-1 ps-3 text-break m-auto">{name}</p>
            </div>
          </div>

          <Container className='d-flex flex-column text-center mt-3'>
              {roles.map((role) => {
                return (
                  <React.Fragment key={role}>
                    <Row>
                    {/* This is for console players */}
                    {/* <Col>
                        <p className='fs-2 mb-1'>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                        <p><em>{compSum?.competitive?.console?.[role]?.division ? `${compSum.competitive.console[role].division} ${compSum.competitive.console[role].tier}` : "unranked"}</em></p>
                      </Col>
                      <Col>
                          {compSum?.competitive?.console?.[role]?.rank_icon ? (
                        <img
                          alt='rank'
                          src={compSum.competitive.console[role].rank_icon}
                          height='70'
                        />
                      ) : (
                        <img
                          alt='unranked'
                          src={unrankedImg}
                          height='70'
                        />
                      )}
                      </Col> */}
                      {/* This is for pc players */}
                      <Col>
                        <p className='fs-2 mb-1'>{role.charAt(0).toUpperCase() + role.slice(1)}</p>
                        <p><em>{compSum?.competitive?.pc?.[role]?.division ? `${compSum.competitive.pc[role].division} ${compSum.competitive.pc[role].tier}` : "unranked"}</em></p>
                      </Col>
                      <Col>
                          {compSum?.competitive?.pc?.[role]?.rank_icon ? (
                        <img
                          alt='rank'
                          src={compSum.competitive.pc[role].rank_icon}
                          height='70'
                        />
                      ) : (
                        <img
                          alt='unranked'
                          src={unrankedImg}
                          height='70'
                        />
                      )}
                      </Col>
                    </Row>
                  </React.Fragment>
                )
              })}
          </Container>
            {/* <p><b>Total Games Played: </b>{data.general.games_played}</p>
            <p><b>Win Rate: </b>{data.general.winrate}%</p>
            <p><b>Kill/Death ratio: </b>{data.general.kda}</p>
            <p><b>Top Role (<em>by K/D</em>): </b>{topRole}</p> */}
            
        </Card.Body>
        <Card.Footer>
        <Button onClick={handleShow} variant="secondary">See More</Button>
        </Card.Footer>
      </Card>
    </div>
  )
};

export default PlayerCard;