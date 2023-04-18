import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Card} from 'react-bootstrap';


const PlayerModal = ({user, show, handleShow, name, data, isFav, onFav}) => {

  const [avaSrc, setAvaSrc] = useState('');
  const [topHeroes, setTopHeroes] = useState([]);
  const [heroPics, setHeroPics] = useState([]);

  useEffect(() => {
    const heroesArray = Object.entries(data.heroes);
    heroesArray.sort((a, b) => b[1].time_played - a[1].time_played);
    setTopHeroes(heroesArray.slice(0, 15));

    fetch('https://overfast-api.tekrop.fr/heroes')
    .then((res) => res.json())
    .then((res) => setHeroPics(res));

    fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`)
    .then((res) => res.json())
    .then((res) => setAvaSrc(res))
  }, [data, user]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log('data', heroPics)


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
        <Modal.Body className="text-center mb-0 p-0">
          <p className="titles mb-0">Top Heroes</p>
          <p><em>-by averages-</em></p>

          <Container className='d-flex flex-column text-center mt-3'>
            {topHeroes.map((hero) => {
              const name = capitalizeFirstLetter(hero[0]);
              const heroPic = heroPics.find(pic => pic.name === name);
              return (
                <React.Fragment key={hero[0]}>
                  <Card className="char-card mb-3 ms-0 me-0" variant="light">
                    <div className='d-flex flex-row align-items-center ms-3'>
                      <div>
                      {heroPic && (
                        <img
                          alt='profile'
                          src={heroPic.portrait}
                          height='100'
                          className='m-1'
                        />
                      )}
                      </div>
                      <div className='mb-2'>
                        <Row>
                        <p className="fs-2 mb-0"><b><u>{name}</u></b></p>
                          <Col>
                          <p className="data-nums"><b>Kills:</b></p>
                          <p className="data-nums"><b>Damage:</b></p>
                          <p className="data-nums"><b>K/D Ratio:</b></p>
                          <p className="data-nums"><b>Win Rate:</b></p>
                          </Col>
                          <Col>
                          <p className="data-nums">{hero[1].average.eliminations}</p>
                          <p className="data-nums">{hero[1].average.damage}</p>
                          <p className="data-nums">{hero[1].kda}</p>
                          <p className="data-nums">{hero[1].winrate}%</p>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </React.Fragment>
              )
            })}
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