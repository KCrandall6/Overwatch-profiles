import React, { useState, useEffect } from 'react';
import {Dropdown} from 'react-bootstrap';
import Hero from './Hero';

const Characters = () => {

  const [charList, setCharList] = useState([]);
  const [searched, setSearched] = useState(false);

  const [originalCharList, setOriginalCharList] = useState([]);

useEffect(() => {
    if (searched === false) {
        setSearched(true);
        fetch('https://overfast-api.tekrop.fr/heroes')
        .then((res) => res.json())
        .then((res) => {
            setOriginalCharList(res);
            setCharList(res);
        });
    }
}, [searched]);

const sortBy = (type) => {
  originalCharList.sort((a, b) => {
      if (a[type] < b[type]) {
          return -1;
      }
      if (a[type] > b[type]) {
          return 1;
      }
      return 0;
  });
  setOriginalCharList([...originalCharList]);
  setCharList(originalCharList);
}

const filterBy = (type) => {
  const filteredCharList = originalCharList.filter((hero) => hero.role === type);
  setCharList(filteredCharList);
}
  
  return (
    <div>
      <div className="d-flex flex-row justify-content-center m-2">
        <Dropdown className="me-3">
          <Dropdown.Toggle style={{ color:"black", backgroundColor: "#F99B12", border: "none"}} id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sortBy('name')}>Name</Dropdown.Item>
            <Dropdown.Item onClick={() => sortBy('role')}>Role</Dropdown.Item>
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

      {charList.map((hero) => {
        return (
          <div key={hero.name} >
            <Hero hero={hero} />
          </div>
        )
      })}
    </div>
  )
}

export default Characters;