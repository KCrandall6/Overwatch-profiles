import React, {useState} from 'react';
import {Card} from 'react-bootstrap';

import Hero from './Hero';

const CharacterCard = ({hero}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div onClick={handleShow}>
      <Card className="char-card mt-3 ms-2 me-2" variant="light">
      <Hero hero={hero} show={show} handleClose={handleClose}/>
        <Card.Body className="d-flex flex-row">
          <img
            alt='Overwatch Hero'
            src={hero.portrait}
            height='100'
            />
          <div className="d-flex flex-column ps-5 pt-3">
            <Card.Title className='card-title'>{hero.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted fst-italic">{hero.role}</Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
};

export default CharacterCard;