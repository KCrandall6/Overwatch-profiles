import React, {useState} from 'react';
import {Card, Button, Modal} from 'react-bootstrap';

const Hero = ({hero}) => {

  const [show, setShow] = useState(false);
  const [heroData, setHeroData] = useState({});
  let summary = '';
  let additionalPics = {
    "first": '',
    "second": '',
    "third": ''
  };

  const handleShow = () => {
    setShow(!show);
    fetch(`https://overfast-api.tekrop.fr/heroes/${hero.key}`)
      .then((res) => res.json())
      .then((res) => setHeroData(res))
  };

  const separate = () => {
    if (heroData.location) {
      summary = heroData.story.summary
      additionalPics.first = heroData.story.chapters[0].picture
      additionalPics.second = heroData.story.chapters[1].picture
    }
  }
  separate();


  return(
    <div onClick={handleShow} >
      <Card className="char-card mb-3 ms-2 me-2" variant="light">
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton onClick={handleShow}>
          <Modal.Title>{hero.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-row">
          <img
            alt='Overwatch Hero'
            src={hero.portrait}
            height='200'
            />
          <div className="d-flex flex-column overflow-auto text-center">
            <p className='modal-title'><b>{hero.name}</b></p>
            <p className="mb-2 text-muted fst-italic text-center">{hero.role}</p>
            <p className="location text-start"><b>Location: </b>{heroData.location}</p>
          </div>
        </Modal.Body>
        <Modal.Body>
          <p><b>Story: </b>{summary}</p>
        </Modal.Body>
        <Modal.Body>
          <img
            alt='Overwatch Hero'
            src={additionalPics.first}
            width='100%'
            />
        </Modal.Body>
        <Modal.Body>
          <img
            alt='Overwatch Hero'
            src={additionalPics.second}
            width='100%'
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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

export default Hero;