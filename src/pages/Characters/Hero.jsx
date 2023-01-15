import React from 'react';

const Hero = () => {

  return (
    <div>
      <p>Hero</p>
    </div>
  )
};

export default Hero;

  // .then(() => {
  //   charList.forEach(char => {
  //       fetch(`https://overfast-api.tekrop.fr/heroes/${char}`)
  //       .then(res => res.json())
  //       .then(res => setCharData([...charData, res]))
  //   })
  // })