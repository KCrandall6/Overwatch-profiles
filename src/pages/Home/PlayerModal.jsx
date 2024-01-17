import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col, Card, Spinner, Dropdown} from 'react-bootstrap';


const PlayerModal = ({user, show, handleShow, name, data, isFav, onFav}) => {

  const [avaSrc, setAvaSrc] = useState('');
  const [topHeroes, setTopHeroes] = useState([]);
  const [heroPics, setHeroPics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      const fetchModalData = async () => {
        const heroesArray = Object.entries(data.heroes);
        heroesArray.sort((a, b) => b[1].time_played - a[1].time_played);
        setTopHeroes(heroesArray.slice(0, 20));

        const res = await fetch('https://overfast-api.tekrop.fr/heroes');
        const heroPicsData = await res.json();
        setHeroPics(heroPicsData);

        const response = await fetch(`https://overfast-api.tekrop.fr/players/${user}/summary`);
        const playerData = await response.json();
        setAvaSrc(playerData);
        setLoading(false);
      };
      fetchModalData();
    }
  }, [data, user, show]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const sortFunctions = {
    name: (a, b) => a[0].localeCompare(b[0]),
    kda: (a, b) => b[1].kda - a[1].kda,
    damage: (a, b) => b[1].average.damage - a[1].average.damage,
    winrate: (a, b) => b[1].winrate - a[1].winrate,
    eliminations: (a, b) => b[1].average.eliminations - a[1].average.eliminations,
    timeplayed: (a, b) => b[1].time_played - a[1].time_played,
  };
  
  const sortBy = (type) => {
    const sortFunction = sortFunctions[type];
    if (sortFunction) {
      const sortedHeroes = [...topHeroes].sort(sortFunction);
      setTopHeroes(sortedHeroes);
    }
  };
  
  const filterBy = (type) => {
      const filteredHeroes = topHeroes.filter((hero) => {
        return heroPics.filter((pic) => {
          return pic.key === hero[0];
        }).some((pic) => {
          return pic.role === type;
        });
      });
      setTopHeroes(filteredHeroes);
  }
  
  const formatTimePlayed = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (show && loading) {
    return <Spinner animation="border" />;
  };

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

          <div className="d-flex flex-row justify-content-center m-2">
        <Dropdown className="me-3">
          <Dropdown.Toggle style={{ color:"black", backgroundColor: "#F99B12", border: "none"}} id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sortBy('name')}>Name</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('kda')}>Kill/Death Ratio</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('damage')}>Damage</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('winrate')}>Win Rate</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('eliminations')}>Kills</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('timeplayed')}>Time Played</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown >
          <Dropdown.Toggle style={{ color:"black", backgroundColor: "#F99B12", border: "none"}} id="dropdown-basic">
            Filter by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => filterBy('support')}>Support</Dropdown.Item>
            <Dropdown.Item onClick={() => filterBy('damage')}>Damage</Dropdown.Item>
            <Dropdown.Item onClick={() => filterBy('tank')}>Tank</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

          <Container className='d-flex flex-column text-center mt-3'>
            {topHeroes.map((hero) => {
              const name = capitalizeFirstLetter(hero[0]);
              const heroPic = heroPics.find(pic => pic.key === hero[0]);
              const role = heroPic && heroPic.role ? capitalizeFirstLetter(heroPic.role) : 'undefined';
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
                      <p className='mb-0 custom-font-size'>time played:</p>
                      <p className='mb-0 fst-italic custom-font-size'> {formatTimePlayed(hero[1].time_played)}</p>
                      </div>
                      <div className='mb-2'>
                        <Row>
                        <p className="fs-2 mb-0"><b><u>{name}</u></b></p>
                        <p className="mb-1"><em>{role}</em></p>
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