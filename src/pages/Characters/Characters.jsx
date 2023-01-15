import React, { useState, useEffect } from 'react';
import {Card} from 'react-bootstrap';

const Characters = () => {

  const [charList, setCharList] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searched === false) {
      setSearched(true);
      fetch('https://overfast-api.tekrop.fr/heroes')
      .then((res) => res.json())
      .then((res) => setCharList(res))
    }
  }, [searched]);
  
  return (
    <div>
      {charList.map((hero) => {
        return (
          <Card key={hero.name} className="char-card mt-3 ms-2 me-2" variant="light">
            <Card.Body className="d-flex flex-row">
              <img
                alt='Overwatch Hero'
                src={hero.portrait}
                height='100'
                variant="left"
                className=''
              />
              <div className="d-flex flex-column ps-5 pt-3">
                <Card.Title className='card-title'>{hero.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted fst-italic">{hero.role}</Card.Subtitle>
              </div>
            </Card.Body>
          </Card>
        )
      })}
    </div>
  )
}

export default Characters;