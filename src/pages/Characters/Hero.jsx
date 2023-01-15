import React from 'react';
import {Button, Modal} from 'react-bootstrap';

const Hero = ({hero, show, handleClose}) => {

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  return (
    <>
      <Modal show={show} onHide={handleClose} onClick={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{hero.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{hero.role}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Hero;