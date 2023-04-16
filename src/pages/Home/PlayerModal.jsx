import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';


const PlayerModal = ({user, show, handleShow, name, data, isFav, onFav, topRole}) => {

  const [avaSrc, setAvaSrc] = useState('');
  const [topHeroes, setTopHeroes] = useState([])

  useEffect(() => {
    const heroesArray = Object.entries(data.heroes);
    heroesArray.sort((a, b) => b[1].time_played - a[1].time_played);
    setTopHeroes(heroesArray.slice(0, 5));

    fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`)
    .then((res) => res.json())
    .then((res) => setAvaSrc(res))
  }, [data, user]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <Modal show={show} onHide={handleShow}>
        <Modal.Header className="d-flex justify-content-between" closeButton>
          <Modal.Title className="me-2">{name}</Modal.Title>
          <Button 
            variant={isFav ? 'warning' : 'outline-warning'}
            onClick={onFav}
            style={{backgroundColor: isFav ? '#ffcd68' : '', color: isFav ? 'black' : ''}}
            >
            &#9734;
          </Button>
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
          <p className="titles">General Stats</p>
          <p className="labels">Total Games Played: </p>
          <p >{data.general.games_played}</p>
          <p className="labels">Win Rate: </p>
          <p >{data.general.winrate}%</p>
          <p className="labels">Kill/Death Rate: </p>
          <p >{data.general.kda}</p>
          <p className="labels">Top Role (by time played): </p>
          <p >{topRole}</p>
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
        </Modal.Body>
        <Modal.Body className="text-center mb-0">
          <p className="titles">Top Heroes</p>
          {topHeroes.map((hero) => {
            const name = capitalizeFirstLetter(hero[0])
            return (
              <div key={hero[0]} className="text-start ps-3">
                <p className="head2">{name}</p>
                <p className="data-nums"><b>Average Kills: </b>{hero[1].average.eliminations}</p>
                <p className="data-nums"><b>Average Damage:</b> {hero[1].average.damage}</p>
                <p className="data-nums"><b>Kill/Death Ratio:</b> {hero[1].kda}</p>
                <p className="data-nums"><b>Win Rate:</b> {hero[1].winrate}</p>
              </div>
            )
          })}
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