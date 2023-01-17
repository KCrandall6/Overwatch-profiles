import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';


const PlayerModal = ({user, show, handleShow, name, data}) => {

  const [avaSrc, setAvaSrc] = useState('');
  const [topHeroes, setTopHeroes] = useState([])
  const hours = Math.floor(data.general.time_played / 60);
  const remainderMinutes = data.general.time_played % 60;
  const time = `${hours} hours and ${remainderMinutes} minutes`

  useEffect(() => {
    const heroesArray = Object.entries(data.heroes);
    heroesArray.sort((a, b) => b[1].time_played - a[1].time_played);
    setTopHeroes(heroesArray.slice(0, 5));

    fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`)
    .then((res) => res.json())
    .then((res) => setAvaSrc(res))
  }, [data, user]);

  console.log('top heroes', topHeroes)

  return (
    <Modal show={show} onHide={handleShow}>
        <Modal.Header className="d-flex justify-content-between" closeButton>
          <Modal.Title>{name}</Modal.Title>
          <Button className="ms-2" variant="outline-warning">&#9734;</Button>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row">
          <img
          alt="profile"
          src={avaSrc.avatar}
          height="100"
          />
          <div className="d-flex flex-column overflow-auto text-center">
            <p className="fs-1 ps-3 text-break m-auto text-center"><b>{name}</b></p>
          </div>
        </Modal.Body>
        <Modal.Body className="text-center mb-0">
          <p >General Stats</p>
          <p className="mb-0">Total Games Played: </p>
          <p >{data.general.games_played}</p>
          <p className="mb-0">Total Time Played: </p>
          <p >{time}</p>
          <p className="mb-0">Win Rate: </p>
          <p >{data.general.winrate}</p>
          <p className="mb-0">Kill/Death Rate: </p>
          <p >{data.general.kda}</p>
          <div className="divider"></div>
        </Modal.Body>
        <Modal.Body className="show-grid text-center">
          <Container>
            <Row>
              <Col>
                <p >Totals</p>
                <p className="mb-0">Kills: </p>
                <p >{data.general.total.eliminations}</p>
                <p className="mb-0">Deaths: </p>
                <p >{data.general.total.deaths}</p>
                <p className="mb-0">Damage: </p>
                <p >{data.general.total.damage}</p>
                <p className="mb-0">Healed Health: </p>
                <p >{data.general.total.healing}</p>
              </Col>
              <Col>
                <p >Averages</p>
                <p className="mb-0">Kills: </p>
                <p >{data.general.average.eliminations}</p>
                <p className="mb-0">Deaths: </p>
                <p >{data.general.average.deaths}</p>
                <p className="mb-0">Damage: </p>
                <p >{data.general.average.damage}</p>
                <p className="mb-0">Healed Health: </p>
                <p >{data.general.average.healing}</p>
              </Col>
            </Row>
          </Container>
          <div className="divider"></div>
        </Modal.Body>
        <Modal.Body className="text-center mb-0">
          <p >Top Heroes</p>
          {/* {topHeroes.} */}
          <div className="divider"></div>
        </Modal.Body>
        <Modal.Body className="text-center mb-0">
          <p >Tanks</p>
          <Container>
            <Row>
              <Col>
                <p className="mb-0">Total Kills: </p>
                <p >{data.roles.tank.total.eliminations}</p>
                <p className="mb-0">Total Deaths: </p>
                <p >{data.roles.tank.total.deaths}</p>
              </Col>
              <Col>
                <p className="mb-0">Average Kills: </p>
                <p >{data.roles.tank.average.eliminations}</p>
                <p className="mb-0">Average Deaths: </p>
                <p >{data.roles.tank.average.deaths}</p>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
};

export default PlayerModal;