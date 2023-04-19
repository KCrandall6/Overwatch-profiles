import React from 'react';
import { Button } from 'react-bootstrap';

const PatchNotes = () => {
  const openPatchNotes = () => {
    window.open('https://overwatch.blizzard.com/en-us/news/patch-notes/', '_blank');
  };

  const openOWNews = () => {
    window.open('https://overwatch.blizzard.com/en-us/news/', '_blank');
  };

  return (
    <div className='d-flex flex-column align-items-center align-content-center justify-content-center m-5 text-center p-3'>
      <div className='pb-4'>
        <p>Click to see the latest Overwatch patch notes!</p>
        <Button
          className='mb-4'
          size='lg'
          style={{ color: 'black', backgroundColor: '#F99B12', border: 'none' }}
          onClick={openPatchNotes}
        >
          Patch Notes
        </Button>
      </div>
      <div className='pb-4'>
        <p>Click to see the latest Overwatch news!</p>
        <Button
          className='mb-4'
          size='lg'
          style={{ color: 'black', backgroundColor: '#F99B12', border: 'none' }}
          onClick={openOWNews}
        >
          OW News
        </Button>
      </div>
    </div>
  );
};

export default PatchNotes;


