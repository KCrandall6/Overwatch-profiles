import React, { useState, useEffect } from 'react';
import CharacterCard from './Hero';

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
          <div key={hero.name} >
            <CharacterCard hero={hero} />
          </div>
        )
      })}
    </div>
  )
}

export default Characters;